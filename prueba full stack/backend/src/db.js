const mongoose = require('mongoose');
require('dotenv').config()

//se comenta cuando creamos el archivo .env donde la almacenamos
//const URI = 'mongodb://localhost/ '
//const URI =("mongodb+srv://admin:admin@cluster0.cmaqz.mongodb.net/test")

//URLDBATLAS para conectar a atlas
//URLDB para local

mongoose.connect(process.env.URLDBATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //se dejan comentadas por que no estan soportadas, despues se utilizan
    //usecreateIndex: true, 
    //useFindAndModify: false,
}).then(db => console.log('base de datos conectada',db.connection.name))
    .catch((error) => console.log(error.message))

module.exports=mongoose