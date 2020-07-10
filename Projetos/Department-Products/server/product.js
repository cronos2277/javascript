const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = new Schema({
    name:String,
    price: Number,
    stock: Number,
    departaments: [{ //Aqui estamos criando uma FK.
        type:mongoose.Schema.Types.ObjectId, //Tipo dessa FK.
        ref:"Department" //Qual colecao ela se refere, no caso eh ao "Department" do mongoose.model exportado.
    }]
},{
    versionKey:false //remove o __v da tupla no mongo.
});

module.exports = mongoose.model("Product",product);