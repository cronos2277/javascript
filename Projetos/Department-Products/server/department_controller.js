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

router.delete('/:id',(request, response) => {
    let id = request.params.id;
    Department.deleteOne({_id:id},(err)=>{
        if(err) response.status(500).send(err);
        else response.status(200).send({});
    })
});

router.patch('/:id',(request,response) => {
    Department.findById(request.params.id, (err, dep) =>{
        if(err) response.status(500).send(err);
        else if(!dep) response.status(404).send({});
        else {
            dep.name = request.body.name;
            dep.save()
            .then((d) => response.status(200).send(d))
            .catch((e) => response.status(500).send(e));
        }
    });
})

module.exports = router;