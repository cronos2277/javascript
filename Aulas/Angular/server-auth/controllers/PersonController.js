const PersonModel = require("../models/PersonModel");
module.exports = {
    all:function(request,response){
        PersonModel.find({}).lean().exec(function(error,people){
            if(error) return response.json([]);
            return response.json(people);
        });
    }
}