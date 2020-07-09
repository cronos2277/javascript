const express = require('express');
const router = express.Router();
const Department = require('./department');
router.post("/",function(request,response){
    console.log(request.body);
    const dapartment = new Department({
        name: request.body.name
    });

    dapartment.save((error,data) => {
        if(error) response.status(500).send(error);
        else response.status(200).send(data);
    });
});

router.get("/",function(request,response){
    Department.find().exec(
        (error,departments)=>{
            if(error) response.status(500).send(error);
            else response.status(200).send(departments);
        }
    );
});