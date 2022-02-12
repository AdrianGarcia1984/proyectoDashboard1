const clienteCtrl = {};
const clienteModel = require('../models/cliente.model');


//listar todos los clientes
clienteCtrl.listarClientes = async (req, res) => {
    //console.log("desde listar");
    try {
        const clientes = await clienteModel.find()
        res.json({
            ok: true,
            clientes,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//registrar nuevo cliente
clienteCtrl.registrar = async (req, res) => {
    try {
        //capturo los datos
        //console.log(req.body);
        const { nombre, apellido, empresa, contacto, correo, } = req.body;
        //console.log(correo);
        const cliente = await clienteModel.find({correo});
        //console.log(cliente);
        //console.log(cliente.length);
        if (cliente.length!==0) {
            return res.status(404).json({
                ok: false,
                message: 'el cliente ya esta registrado',
            })
        }
            //guardo en el back con mongo
            const nuevoCliente = new clienteModel({
                nombre,
                apellido,
                empresa,
                contacto,
                correo,
            });
            await nuevoCliente.save();
            res.status(201).json({
                ok: true,
                message: 'cliente registrado',
                nombre: nuevoCliente.nombre,
                apellido: nuevoCliente.apellido,
                _id: nuevoCliente._id,
                empresa: nuevoCliente.empresa,
                correo: nuevoCliente.correo,
                contacto: nuevoCliente.contacto,
            })
        

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
           
        })
    }
}

clienteCtrl.listarPorId = async (req, res) => {
    try {
        const {id} = req.params;
        //console.log(id);
        const cliente = await clienteModel.findById({_id:id});
        //console.log(cliente);
        if (!cliente){
            return res.status(404).json({
                ok: false,
                message: 'el cliente no existe en la base de datos',
            })
        }
        res.status(201).json({
            ok:true,
            cliente
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

clienteCtrl.actualizar = async (req,res)=>{
    try {
            const {id} = req.params
            const cliente = clienteModel.findById({_id:id});
            //console.log(cliente);
            if (!cliente){
                return res.status(404).json({
                    ok: false,
                    message: 'el cliente no existente',
                })
            }
            const nombre = req.body.nombre||cliente.nombre;
            const apellido = req.body.apellido||cliente.apellido;
            const empresa = req.body.empresa||cliente.empresa;
            const contacto = req.body.contacto||cliente.contacto;
            const correo = req.body.correo||cliente.correo;
            const clienteUpdate = {
                nombre,
                apellido,
                empresa,
                contacto,
                correo,
            }
            await cliente.updateOne(clienteUpdate)

            res.json({
                ok: true,
                message: "cliente actualizado",
                clienteUpdate
                
            })  

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

clienteCtrl.borrar = async (req,res)=>{
    try {
        const {id} = req.params;
        //console.log(id);
        const cliente = await clienteModel.findById({_id:id});
        //console.log(cliente);
        if (!cliente){
            return res.status(404).json({
                ok: false,
                message: 'el cliente no existe en la base de datos',
            })
        }
        await clienteModel.findByIdAndDelete({_id:id});
        res.json({
            ok: true,
            message: "cliente eliminado correctamente",            
        })  

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

module.exports = clienteCtrl;

