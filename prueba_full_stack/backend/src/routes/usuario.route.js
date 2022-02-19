const {Router}=require ('express');
const usuarioCtrl = require('../controllers/usuario.controller');
const verifyToken=require ('../midlewares/verify.token') 
const route=Router();
const upload=require('../midlewares/imgUpload');



//para pruebas
// route.get('/', usuarioCtrl.listarUsuario);
// route.delete('/borrar/:id',usuarioCtrl.borrarUsuario);
// route.put('/actualizar/:id',upload.single('img')     , usuarioCtrl.actualizar);
// route.post('/registrar',upload.single('img'),usuarioCtrl.registrarUsuario);
// route.post('/login',usuarioCtrl.login);
 
//con jwt y rol check
route.post('/login',usuarioCtrl.login);
route.get('/',verifyToken.verify, verifyToken.grupoUsuarios,usuarioCtrl.listarUsuario);
route.delete('/borrar/:id',verifyToken.verify, verifyToken.grupoUsuarios,usuarioCtrl.borrarUsuario);
route.put('/actualizar/:id',verifyToken.verify, verifyToken.grupoUsuarios,upload.single('img'), usuarioCtrl.actualizar);
route.post('/registrar',upload.single('img'),usuarioCtrl.registrarUsuario);
route.get('/listar/:id',verifyToken.verify, verifyToken.grupoUsuarios,usuarioCtrl.listarUsuarioId)

module.exports=route;