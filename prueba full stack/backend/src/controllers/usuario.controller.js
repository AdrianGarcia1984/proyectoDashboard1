const usuarioCtrl = {};
const usuarioModel = require('../models/usuario.model');
const auth = require('../helpers/Auth.helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const roleModel = require('../models/role.model');
const { deleteImg } = require('../helpers/borrarImgCrtl')


//solo para verificar admin con acceso
usuarioCtrl.listarUsuario = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find({}, { password: 0 }).populate("roles");
        //si necesito enviar para consulta el rolmodel utilizo lo que esta comentado
        const rolModel = await roleModel.find() 
   
        res.json({
            ok: true,
            usuarios,
            rolModel
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//Listar usuario id
usuarioCtrl.listarUsuarioId = async (req, res) => {
    try {
         const { id } = req.params;
         const usuario = await usuarioModel.findById({ _id: id }, { password: 0 }).populate("roles");
        
         if (!usuario) {
             return res.status(404).json({
                 ok: false,
                 message: 'el usuario no existe',
             })
         }
         res.json({
             ok: true,
             usuario
         })
     } catch (error) {
         res.status(500).json({
             ok: false,
             message: error.message
         })
     }
 }

//creando un usuario

usuarioCtrl.registrarUsuario = async (req, res) => {
    try {
        //capturando los datos del frontend
        const { nombre, apellido, email, password,contacto, roles } = req.body;
        //console.log(req.body)
        //verificando si existe el usuario por email
        const usuario = await usuarioModel.find({email});
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: 'el usuario ya existente',
            })
        }
        //creando el usuario en mongo
        const nuevoUsuario = new usuarioModel({
            nombre,
            apellido,
            email,
            contacto,
            //encriptando la contraseña
            password: auth.encryptPassword(password),
            roles,
        })
        if (req.file) {
            const { filename } = req.file;
            nuevoUsuario.setimgUrl(filename);
        }
        //check roles
        if (roles) {
            const foundRole = await roleModel.find({ name: { $in: roles } })
            //console.log(foundRole)
            nuevoUsuario.roles = foundRole.map(role=>role);
        } else {
            const role = await roleModel.findOne({ name: "admin" })
            nuevoUsuario.roles = role;
        };
        //guardando usuario en la BD
        await nuevoUsuario.save();
        //respondiendo al frontend
        res.status(201).json({
            ok: true,
            message: 'bienvenido',
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            _id: nuevoUsuario._id,
            email: nuevoUsuario.email,
            contacto:nuevoUsuario.contacto,
            //creando el token
            token: jwt.sign({ _id: nuevoUsuario._id, name: nuevoUsuario.name }, process.env.TOKENPS),        
            roles: nuevoUsuario.roles,
            img:nuevoUsuario.img,
            nameImg:nuevoUsuario.nameImg
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
};

//login de usuario 

usuarioCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //verificando si existe el usuario por el email 
        const usuario = await usuarioModel.findOne({ email : email }).populate("roles",{ _id: 0 });
        //console.log(user)
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'email o password incorrecto',
            })
        }
        //verificando la contraseña encriptada
        const resp = bcrypt.compareSync(password, usuario.password);
        if (resp) {
            return res.json({
                ok: true,
                message: 'bienvenido',
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                contacto:usuario.contacto,
                roles:usuario.roles,
                token: jwt.sign({ _id: usuario._id, name: usuario.name }, process.env.TOKENPS),               
            })
        }
        res.status(400).json({
            ok: false,
            message: 'error en login de usuario',
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//borrar usuario 

usuarioCtrl.borrarUsuario = async (req, res) => {
    {
        try {
            //capturando los datos del frontend            
            const { id } = req.params;
            //verificando si existe el usuario
            const usuario = await usuarioModel.findById({ _id: id });
           
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    message: 'el usuario no existente',
                })
            }
            if (usuario.nameImg) {
                deleteImg(usuario.nameImg);
            }
            
            //borrando usuario en la BD
            await usuario.deleteOne(); //antes de esta parte se ejecuta un pre en userSchema que borra todos los productos registrados por este usuario
            
            //respondiendo al frontend
            res.status(201).json({
                ok: true,
                message: 'usuario eliminado',
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                message: error.message
            })
        }
    };
}

//actualizar usuario

usuarioCtrl.actualizar=async (req,res)=>{
    try {
        const  {id } = req.params
        //console.log(id);
        const usuario = await usuarioModel.findById({ _id: id });
  
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: 'usuario no encontrado'
            })
        }
        //actualizando roles
        if (req.body.roles) {
            const foundRole = await roleModel.find({ name: { $in: req.body.roles } });            
            usuario.roles = foundRole.map(role=>role);
        } 
        if (req.file) {
            if (usuario.nameImg) {
                deleteImg(usuario.nameImg);
            }
            const { filename } = req.file;
            usuario.setimgUrl(filename);
            await usuario.save();
        }
        const nombre = req.body.nombre || usuario.nombre
        const apellido = req.body.apellido || usuario.apellido
        const email = req.body.email || usuario.email
        const roles =  usuario.roles // ||req.body.roles
        const contacto = req.body.contacto || usuario.contacto
        const userUpdate = {
            nombre,
            apellido,
            email,
            contacto,
            roles,
            //verificar si actualiza avatar
        }      
        await usuario.updateOne(userUpdate);
    
        res.json({
            ok: true,
            message: "usuario actualizado",
            userUpdate
            
        })        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    
    }
}
module.exports = usuarioCtrl;