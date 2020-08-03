const mongoose = require("mongoose");
const Schema = mongoose.Schema;
personSchema = new Schema({
    "name":String,
    "user":String,
    "pass":String    
});
module.exports = mongoose.model("User",personSchema);