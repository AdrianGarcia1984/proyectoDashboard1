const {Router}=require ('express');
const clienteCtrl = require('../controllers/clientes.controller');
const route=Router();
const verifyToken=require ('../midlewares/verify.token') 




//para pruebas
// route.get('/',clienteCtrl.listarClientes);
// route.post('/registrar',clienteCtrl.registrar);
// route.get('/clienteid/:id',clienteCtrl.listarPorId);
// route.put('/actualizar/:id',clienteCtrl.actualizar);
// route.delete('/borrar/:id',clienteCtrl.borrar);
//con jwt y rol  check
route.get('/',verifyToken.verify,verifyToken.grupoClientes,clienteCtrl.listarClientes);
route.post('/registrar',verifyToken.verify,verifyToken.grupoClientes,clienteCtrl.registrar);
route.get('/clienteid/:id',verifyToken.verify,verifyToken.grupoClientes,clienteCtrl.listarPorId);
route.put('/actualizar/:id',verifyToken.verify,verifyToken.grupoClientes,clienteCtrl.actualizar);
route.delete('/borrar/:id',verifyToken.verify,verifyToken.grupoClientes,clienteCtrl.borrar); 


module.exports=route;