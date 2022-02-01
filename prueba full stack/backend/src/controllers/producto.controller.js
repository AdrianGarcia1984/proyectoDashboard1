productoCtrl = {};
const productoModel = require('../models/producto.model')
const usuarioModel = require('../models/usuario.model')
const { deleteImg } = require('../helpers/borrarImgCrtl')


//listar productos: todos con acceso por que solo es listar
productoCtrl.listaProducto = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
            || 10;
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit,
             page,
             populate:[
                {
                    path:"roles",
                    path: "usuario", select: "nombre"
                }
            ],
        };
        
        const productos = await productoModel.paginate({}, options)        
        res.json({
            ok: true,
            productos,
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//listar producto por id: para editar solo seller y admin
productoCtrl.listarProductoId = async (req, res) => {
   try {
        const { id } = req.params;
        const producto = await productoModel.findById({ _id: id }).populate('usuario',{password:0});
        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'el producto no existe',
            })
        }
        res.json({
            ok: true,
            producto
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//adicionar productos: solo los seller y los admin con acceso 
productoCtrl.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, usuario, precio, stock } = req.body;
        console.log(req.body);
        //console.log(usuario);
        const userFind= await usuarioModel.findOne({_id:usuario})
        console.log(userFind);
        const newProduct = new productoModel({
            nombre,
            descripcion,
            usuario,
            precio,
            stock,
        });
        if (req.file) {
            const { filename } = req.file;
            newProduct.setimgUrl(filename);
        }
        await newProduct.save();
        res.status(201).json({ ok: true, 
            message: "producto creado correctamente",
             newProduct
             });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
};

//borrar productos: solo los seller y los admin con acceso 
productoCtrl.borrarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoModel.findById({ _id: id });
        //console.log(producto);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'el producto no existe',
            })
        }
        if (producto.nameImg) {
            deleteImg(producto.nameImg);
        }
        await producto.deleteOne();
        res.json({
            ok: true,
            message: 'producto eliminado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

};

//actualizar productos: solo los seller y los admin con acceso 
productoCtrl.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const productos = await productoModel.findById({ _id: id });
       //console.log(id)
        //console.log(productos)
        if (!productos) {
            return res.json({ ok: false, message: "producto no encontrado" })
        }
        if (req.file) {
            console.log(productos.nameImg);
            if (productos.nameImg) {
                deleteImg(productos.nameImg);
            }
            const { filename } = req.file;
            productos.setimgUrl(filename);
            await productos.save();
        }
        
        const nombre = req.body.nombre || productos.nombre
        const descripcion = req.body.descripcion || productos.descripcion
        const precio = req.body.precio || productos.precio
        const stock = req.body.stock || productos.stock
        const usuario = productos.usuario||req.body.usuario 
        
        const updatedProduct = {
            nombre,
            descripcion,
            precio,
            stock,
            usuario,

        }
        await productos.updateOne(updatedProduct);
        res.json({ ok: true, message: 'producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
        })
    }

};

//listar productos usuario: seller y admin con acceso 
productoCtrl.listarProductoUsuario = async (req, res) => {
    try {
        const id = req.userid;
        //const {id}=req.params
        const productos = await productoModel.find({ user: id }).populate('usuario', { password: 0 });
        //console.log(id)
        if (!productos) {
            return res.status(404).json({
                ok: false,
                message: 'el usuario no tiene productos.',
            })
        }
        res.json({
            ok: true,
            message: 'productos por usuario',
            productos
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
};  

module.exports = productoCtrl;