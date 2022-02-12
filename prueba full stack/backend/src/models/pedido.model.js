const {Schema, model}= require('mongoose');
var moment = require('moment-timezone');
//var now=moment().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
//console.log(now)

const pedidoSchema=new Schema({
    producto:[{
        type: Schema.Types.ObjectId,
        ref:"Producto",
    }],
    factura:{
        type:String,
        //required:true,
        //unique:true
    },
    fecha:{
        type:Date,
        default:moment().tz("America/Bogota").format("YYYY-MM-DD")
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:"Usuario",
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref:"Cliente",
    },
    total:{
        type:Number,
        required:true,
        trim:true
    },
    cantidad:Number,
    //precio:Number,
    estado:{
        type:String,
        enum:[
            'cancelado',
            'confirmado',
            'pendiente'
        ]      
    }
},{
    timestamps: true,
});

module.exports=model('Pedido', pedidoSchema);