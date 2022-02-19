const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const createRole=require('./libs/inicialRole')

//despues de crear el database, se anexa el siguiente comando
require('./db')

const app=express();

//creando los roles
app.get(createRole.create());
app.get(createRole.userAdmin());

//configurando o asignando un puerto para nuestro servidor
app.set('Port', process.env.PORT);

//el morgan nos sirve para saber que tipo de peticiones estar recibiendo nuestro servidor

app.use(morgan('dev'));

//express json nos sirve para convertir los datos a objetos json y leerlos

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//el cors nos sirve para permitir conexiones desde cualquier cliente

app.use(cors({origin:'*'}));

//rutas o vistas

app.use('/usuario', require('./routes/usuario.route'))
app.use('/producto', require('./routes/producto.route'))
app.use('/cliente', require('./routes/cliente.route'))
app.use('/pedido', require('./routes/pedido.route'))


//iniciando nuestro servidor

app.listen(app.get('Port'),()=>{
    console.log('servidor corriendo en el puerto ', app.get('Port'))
});