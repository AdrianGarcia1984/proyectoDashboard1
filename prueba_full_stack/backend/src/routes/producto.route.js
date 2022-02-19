const {Router}=require ('express');
//const usuarioCtrl = require('../controllers/usuario.controller');
const productoCtrl = require('../controllers/producto.controller');
const route=Router();
const verifyToken=require ('../midlewares/verify.token') 
const upload=require('../midlewares/imgUpload');


//para pruebas

// route.get('/listarproducto',productoCtrl.listaProducto);
// route.get('/listarproductoid/:id', productoCtrl.listarProductoId);
// route.get('/productousuario/:id',productoCtrl.listarProductoUsuario)
// route.post('/crearproducto',upload.single('img'),productoCtrl.crearProducto);
// route.delete('/borrar/:id',productoCtrl.borrarProducto);
// route.put('/actualizar/:id',upload.single('img') , productoCtrl.actualizarProducto);

//con jwt y rol check

route.get('/listarproducto',verifyToken.verify,verifyToken.grupoProductos,productoCtrl.listaProducto);
route.get('/listarproductoid/:id',verifyToken.verify,verifyToken.grupoProductos, productoCtrl.listarProductoId);
route.get('/productousuario/:id',verifyToken.verify,verifyToken.grupoProductos,productoCtrl.listarProductoUsuario)
route.post('/crearproducto',verifyToken.verify,verifyToken.grupoProductos,upload.single('img'),productoCtrl.crearProducto);
route.delete('/borrar/:id',verifyToken.verify,verifyToken.grupoProductos,productoCtrl.borrarProducto);
route.put('/actualizar/:id',verifyToken.verify,verifyToken.grupoProductos,upload.single('img') , productoCtrl.actualizarProducto);


module.exports=route;