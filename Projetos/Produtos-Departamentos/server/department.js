const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const department = new Schema({
    name:String    
},{
    versionKey:false //remove o __v da tupla no mongo.
});

module.exports = mongoose.model("Department",department);