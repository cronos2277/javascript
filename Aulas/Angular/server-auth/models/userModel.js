const mongoose = require("mongoose");
const Schema = mongoose.Schema;
userSchema = new Schema({
    "name":String,
    "user":String,    
    "password":String,
});

module.exports = mongoose.model("User",userSchema);