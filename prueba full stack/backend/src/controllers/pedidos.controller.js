const pedidoCtrl = {};
const pedidoModel = require('../models/pedido.model');
const productoModel = require('../models/producto.model');
const usuarioModel = require('../models/usuario.model');
var moment = require('moment-timezone');
const res = require('express/lib/response');
// var now=moment().tz("America/Bogota").format( "DD-MMM-YYYY T: HH:mm:ss");
// console.log(now)

//listar pedidos
pedidoCtrl.listarPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoModel.find()
        res.json({
            ok: true,
            pedidos,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//crear un pedido
pedidoCtrl.crearPedido = async (req, res) => {
    try {
        const { producto, total, usuario, cliente, cantidad, valor, estado } = req.body;
        //consultando el producto para verificar su existencia
        const productoCheck = await productoModel.findOne({ _id: producto })
        const pedidos = await pedidoModel.find()
        console.log(pedidos)
        if (cantidad < productoCheck.stock) {
            const newPedido = new pedidoModel({
                producto,
                total,
                usuario,
                cliente,
                cantidad,
                valor,
                estado
            });
            //restando en total de productos
            productoCheck.stock = productoCheck.stock - cantidad
            //console.log(productoCheck.stock)
            await productoCheck.save()
            //creando numeracion de factura
            const factura = (1 + pedidos.length)
            newPedido.factura = factura
            await newPedido.save();
            console.log(newPedido)
            res.status(201).json({
                ok: true,
                message: "pedido creado correctamente",
                newPedido
            });
        } else {
            res.status(201).json({
                ok: false,
                message: "el pedido excede la cantidad en bodega",

            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}

//editar pedido
pedidoCtrl.editar = async (req, res) => {
    try {
        const { id } = req.params
        const pedido = await pedidoModel.findById({ _id: id })
        const { producto, estado } = req.body;
        const productoCheck = await productoModel.findOne({ _id: producto })
        //controlando que no se puedan modificar los pedidos cancelados o terminados
        if (pedido.estado === 'terminado' || pedido.estado === 'cancelado') {
            res.json({
                ok: false,
                message: "el pedido ya ha sido terminado/cancelado, por lo cual no se puede modificar",
            })
        } else {//controlando que cuando se cancela un pedido se devuelvan las cantidades al stock inicial
            if (estado === "cancelado") {
                productoCheck.stock = productoCheck.stock + pedido.cantidad
                pedido.estado = estado
                //await productoCheck.save()
                //await pedido.save()
            } else {
                const { total } = req.body.total || pedido.total
                const { cantidad } = req.body.cantidad || pedido.cantidad
                const { valor } = req.body.valor || pedido.valor

                const pedidoUpdate = {
                    total,
                    cantidad,
                    valor,
                }
                if (estado === 'terminado') {
                    pedidoUpdate.estado = estado
                } else {
                    pedidoUpdate.estado = pedido.estado
                }
                await pedido.updateOne(pedidoUpdate);
            }
            console.log(pedido)
            res.status(201).json({
                ok: true,
                message: "pedido editado correctamente",
                pedidoUpdate
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
//listar pedido por id para consulta
pedidoCtrl.listarPedidoId = async (req, res) => {
    try {
        const {id} = req.params
        const pedido = await pedidoModel.findById({ _id: id })
        if (!pedido) {
            return res.status(404).json({
                ok: false,
                message: 'el pedido no existe en la base de datos',
            })
        }
        res.status().json({
            ok: true,
            pedido
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

pedidoCtrl.mejoresClientes = async (req, res) => {
    try {
        const clientes = await pedidoModel.aggregate([
            { $match: { estado: "terminado" } },
            {
                $group: {
                    _id: "$cliente",
                    total: { $sum: "$total" },
                }
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cliente'
                }
            },
            {
                $sort: { total: -1 }
            }, {
                $limit: 5,
            }
        ]);
        res.status(201).json({
            ok: true,
            message: "mejores clientes",
            clientes
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

};

pedidoCtrl.mejoresVendedores = async (req, res) => {
    try {
        const vendedores = await pedidoModel.aggregate([
            { $match: { estado: 'terminado' } },
            {
                $group: {
                    _id: "$usuario",
                    total: { $sum: '$total' }
                }
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'vendedor'
                }
            },
            {
                $limit: 5,
            },
            {
                $sort: { total: -1 }
            }
        ])
        res.status(201).json({
            ok: true,
            message: "mejores vendedores",
            vendedores
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }


}

pedidoCtrl.eliminar = async (req,res)=>{
    try {
        const {id} = req.params
        const pedido = await pedidoModel.findById({_id:id})
        if(!pedido){
            res.json({
                ok: false,
                message: "el pedido no existe",
            })
        }else{
            await pedido.delete({_id:id})
            res.status(201).json({
                ok: true,
                message: "el pedido ha sido eliminado de la base de datos",                
            });
        }        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = pedidoCtrl;