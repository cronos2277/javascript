const express = require('express');
const router = express.Router();
const Product = require('./product');

router.post('/',(request,response) => {
    let product = new Product({
        name: request.body.name,
        price: request.body.price,
        stock: request.body.stock,
        departments: request.body.departments
    });

    product.save(
        (error,prod) => {
            if(error) response.status(500).send(error);
            else response.status(200).send(prod);
        }
    );
});

router.get("/",(request,response) =>{
    Product.find().exec((error,prods) =>{
        if(error) response.status(500).send(error);
        else response.status(200).send(prods);
    });
});

router.delete("/:id",(request,response) => {
    Product.deleteOne({
        _id:request.params.id
    },(error) => {
        if(error) response.status(500).send(error);
        else response.status(200).send({});
    })
});

router.patch("/:id", (request,response)=>{
    Product.findById(request.params.id,(error,product) =>{
        if(error) response.status(500).send(error);
        else if(!product) response.status(404).send({});
        else {
            product.name = request.body.name;
            product.price = request.body.price;
            product.stock = request.body.stock;
            product.departments = request.body.departments;
            product.save((error,prod)=>{
                if(error) response.status(500).send(error);
                else response.status(200).send(prod);
            });
        }
    });
})
module.exports = router;