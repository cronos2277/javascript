const mongoose = require("mongoose");
const Schema = mongoose.Schema;
productSchema = new Schema({
    "name":String,
    "department":String,
    "price":Number
});
module.exports = mongoose.model("Product",productSchema);