const params = {
    ip:"localhost",
    port:"27017",
    database:"auth",
    listen:"3030"
}
const mongoose = require("mongoose");
const faker = require("faker");
const ProductModel = require("../models/ProductModel");
mongoose.connect(`mongodb://${params.ip}:${params.port}/${params.database}`,{useNewUrlParser:true});

async function add(n){
    try{
        for(let i=0;i<n;i++){
            const product = new ProductModel();
            product.name = faker.commerce.productName();
            product.department = faker.commerce.department();
            product.price = faker.commerce.price();
            await product.save();
        }
    }catch(error){
        console.error(error);
    }
}

add(100).then(_ => {
    console.log("OK!");
    mongoose.disconnect();
})