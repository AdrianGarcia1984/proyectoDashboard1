const { Schema, model } = require('mongoose');
const productoModel = require('./producto.model');
const { borrarImg } = require('../helpers/borrarImgCrtl')

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contacto: {
        type: Number,
        // required: true
    },
    img: String,
    nameImg: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Roles",
    }]
}, {
    timestamps: true,
    versionKey: false,
});

//borrado de productos  que creo un usuario
// usuarioSchema.pre("deleteOne", {document: true}, 
// async function(){
//     await productoModel.deleteMany({user:this._id})
// } )

//imagen usuario
usuarioSchema.methods.setimgUrl = function setimgUrl(filename) {
    const url = "http://localhost:4000/";
    this.img = url + 'public/' + filename;
    this.nameImg = filename;
}


module.exports = model('Usuario', usuarioSchema);