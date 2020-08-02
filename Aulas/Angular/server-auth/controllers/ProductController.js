const ProductModel = require("../models/ProductModel");
module.exports = {
    all:function(request,response){
        ProductModel.find({}).lean().exec(function(error,products){
            if(error) return response.json([]);
            return response.json(products);
        });
    }
}