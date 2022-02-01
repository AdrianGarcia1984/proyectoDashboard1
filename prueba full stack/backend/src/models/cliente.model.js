const {Schema, model}= require('mongoose');

const clienteSchema=new Schema({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    empresa:{
        type:String,
        required:true
    },
    contacto:{
        type:Number,        
    },
    correo:{
        type:String,
        required:true
    },
},{
    timestamps: true,
    versionKey:false, 

});

module.exports=model('Cliente', clienteSchema);