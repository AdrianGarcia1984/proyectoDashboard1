const {Schema, model}= require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { borrarImg } = require('../helpers/borrarImgCrtl');

const productoSchema=new Schema({
nombre:{
    type:String,
    required:true
},
descripcion:{
    type:String
},
precio:{
    type:Number,
    required:true
},
stock:{
    type:Number,
    required:true
},
usuario:{
    type: Schema.Types.ObjectId,
    ref:"Usuario",   
},
img:String,
nameImg:String,
},{
    //timestamps: true,
    versionKey:false, 
});

//imagen producto
productoSchema.methods.setimgUrl = function setimgUrl(filename) {
    const url = "http://localhost:4000/";
   // const url = process.env.URLDBATLAS;

    this.img = url + 'public/' + filename;
    this.nameImg = filename;
}

productoSchema.plugin(mongoosePaginate);
module.exports=model('Producto', productoSchema);