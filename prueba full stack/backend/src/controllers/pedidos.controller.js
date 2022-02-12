const pedidoCtrl = {};
const pedidoModel = require('../models/pedido.model');
const productoModel = require('../models/producto.model');
const usuarioModel = require('../models/usuario.model');


//listar pedidos
pedidoCtrl.listarPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoModel.find().populate({ path: "usuario" }).populate({ path: "cliente" }).populate("producto");
        //console.log(pedidos);
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
        const { producto, total, usuario, cliente, cantidad, estado } = req.body;
        //consultando el producto para verificar su existencia
        const productoCheck = await productoModel.findOne({ _id: producto._id })
        if (cantidad < productoCheck.stock) {
            console.log(true);
            const newPedido = new pedidoModel({
                producto,
                total,
                usuario,
                cliente,
                cantidad,
                estado,
            });
            const pedidos = await pedidoModel.find()
            //restando en total de productos
            productoCheck.stock = productoCheck.stock - cantidad
            await productoCheck.save()
            //creando numeracion de factura            
            const factura = (1 + pedidos.length)
            console.log(factura);
            newPedido.factura = factura
            console.log(newPedido);
            await newPedido.save();
            res.status(201).json({
                ok: true,
                message: "pedido creado correctamente",
                newPedido
            });
        } else {
            throw new Error(
                res.status(201).json({
                    ok: false,
                    message: (error.message, "el pedido excede la cantidad en bodega")
                })
            );

        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: (error.message, 'error desde crear pedido')
        })
    }
}

//editar pedido
pedidoCtrl.editar = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params
        const pedido = await pedidoModel.findById({ _id: id })
        const { producto, estado } = req.body;
        //console.log(req.body);
        const productoCheck = await productoModel.findOne({ _id: pedido.producto[0]._id })
        //console.log(pedido);
        //controlando que no se puedan modificar los pedidos cancelados o terminados
        if (pedido.estado === 'confirmado' || pedido.estado === 'cancelado') {
            return res.status(500).json({
                ok: false,
                message: "el pedido ya ha sido terminado/cancelado, por lo cual no se puede modificar",
            })
        } //controlando que cuando se cancela un pedido se devuelvan las cantidades al stock inicial
        if (estado === "cancelado") {
            productoCheck.stock = productoCheck.stock + pedido.cantidad
            pedido.estado = estado
            await productoCheck.save()
            await pedido.save()
        } else {
            //console.log(pedido);
            console.log(estado);
            const total = pedido.total || req.body.total
            const cantidad = req.body.cantidad || pedido.cantidad
            // const cantidad = req.body.cantidad || pedido.cantidad
            console.log(cantidad);

            const pedidoUpdate = {
                cantidad,
                total,
                estado,
            }
            console.log(pedidoUpdate);
            //console.log(pedidoUpdate);
            if (estado === 'confirmado') {

                pedidoUpdate.estado = estado

            } //else {
            //     pedidoUpdate.estado = pedido.estado
            // }
            console.log(pedidoUpdate);
            await pedido.updateOne(pedidoUpdate);
        }

        res.status(201).json({
            ok: true,
            message: "pedido editado correctamente",
            pedido
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: (error.message, 'error desde editar')
        })
    }
}
//listar pedido por id para consulta
pedidoCtrl.listarPedidoId = async (req, res) => {
    try {
        const { id } = req.params
        const pedido = await pedidoModel.findById({ _id: id })
        if (!pedido) {
            return res.status(404).json({
                ok: false,
                message: 'el pedido no existe en la base de datos',
            })
        }
        console.log("pedido");
        res.status(200).json({
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
            { $match: { estado: "confirmado" } },
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
            { $match: { estado: 'confirmado' } },
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
        console.log(vendedores);
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

pedidoCtrl.eliminar = async (req, res) => {
    try {
        const { id } = req.params
        const pedido = await pedidoModel.findById({ _id: id })
        const productoCheck = await productoModel.findOne({ _id: pedido.producto[0]._id })
        if (!pedido) {
            return res.json({
                ok: false,
                message: "el pedido no existe",
            })
        }
        productoCheck.stock = productoCheck.stock + pedido.cantidad
        await productoCheck.save()
        await pedido.delete({ _id: id })
        res.status(201).json({
            ok: true,
            message: "el pedido ha sido eliminado de la base de datos",
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = pedidoCtrl;