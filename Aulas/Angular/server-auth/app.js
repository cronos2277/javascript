
const params = {
    ip:"localhost",
    port:"27017",
    database:"auth",
    listen:"3030"
}

const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(`mongodb://${params.ip}:${params.port}/${params.database}`,{useNewUrlParser:true});

app.use(function(request, response, next){
    response.status(404).send("Not Found");
});
app.listen(params.listen);