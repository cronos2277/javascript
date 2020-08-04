const params = {
    ip:"localhost",
    port:"27017",
    database:"auth",
    listen:"3030"
}
const mongoose = require("mongoose");
const faker = require("faker");
const PersonModel = require("../models/model");
mongoose.connect(`mongodb://${params.ip}:${params.port}/${params.database}`,{useNewUrlParser:true});

async function add(n){
    try{
        for(let i=0;i<n;i++){
            const person = new PersonModel();
            person.name = faker.name.firstName();
            person.user = faker.internet.userName();
            person.pass = faker.internet.password();            
            await person.save();
        }
    }catch(error){
        console.error(error);
    }
}

add(5).then(_ => {
    console.log("Database with 5 records created with success!");
    mongoose.disconnect();
})