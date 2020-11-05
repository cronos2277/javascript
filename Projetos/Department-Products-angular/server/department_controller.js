const express = require('express');
const router = express.Router();
const Department = require('./department');
const Product = require('./product');

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

router.delete('/:id',async(request, response) => {
    try{
        let id = request.params.id;
        let prods = await Product.find({departments:id}).exec();
        if(prods.length > 0){
            response.status(500).send({
                msg:"Could not remove this department! You may have to fix its dependencies before."
            });
        }else{
            await Department.deleteOne({_id:id});
            response.status(200).send({});
        }   
    }catch(error){
        response.status(500).send({msg:"Internal Error",error});
    }
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