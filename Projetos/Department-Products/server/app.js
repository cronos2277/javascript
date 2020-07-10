const credentials = {
    listen:3027,
    mongo_ip:"localhost",
    mongo_tcp:27017,
    mongo_database:"http_app",
    departments_url: "/departments",
    products_url: "/products",
    getMongoDBString(){
    //Padrao de url para ser colocada no metodo connect do mongoose: mongodb://IP:TCP/BD
        return `mongodb://${this.mongo_ip}:${this.mongo_tcp}/${this.mongo_database}`; 
    }
}

console.log(credentials.getMongoDBString());

const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const department_controller = require('./department_controller');
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cors);
mongoose.connect(credentials.getMongoDBString(),{useNewUrlParser:true});
app.use(credentials.departments_url,department_controller);
//app.use(credentials.products_url,product_controller);
app.listen(credentials.listen);
