const {Router}=require ('express');
const pedidoCtrl = require('../controllers/pedidos.controller');
const verifyToken = require('../midlewares/verify.token');
const route=Router();


//para pruebas
// route.get('/',pedidoCtrl.listarPedidos);
// route.post('/crear',pedidoCtrl.crearPedido);
// route.put('/editar/:id',pedidoCtrl.editar);
// route.get('/pedido/:id',pedidoCtrl.listarPedidoId);
// route.get('/vendedor',pedidoCtrl.mejoresVendedores);
// route.get('/cliente',pedidoCtrl.mejoresClientes);
// route.delete('/eliminar/:id',pedidoCtrl.eliminar);
//route.post('/crear',pedidoCtrl.crearPedido);
//con jwt y rol check

route.get('/',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.listarPedidos);
route.post('/crear',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.crearPedido);
route.put('/editar/:id',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.editar);
route.get('/pedido/:id',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.listarPedidoId);
route.get('/vendedor',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.mejoresVendedores);
route.get('/cliente',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.mejoresClientes);
route.delete('/eliminar/:id',verifyToken.verify,verifyToken.grupoPedidos,pedidoCtrl.eliminar);




module.exports=route;