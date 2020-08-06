const Model = require('../models/model');
const bcript = require('bcryptjs');
/* 
    Tire isso daqui se pensar em usar isso em ambiente de producao, 
nao se deve colocar a senha aqui nesse escopo, coloque em um arquivo
externo adicionado tambem a lista do gitignore e com um valor diferente
do padrao. 
*/
const salt = 10 

module.exports = {
    register: async function(request,response){
        try{
            let user = Model.findOne({
                email:request.body.email
            });
            if(!user){
                const user = new Model(request.body);
                /*
                    Voce pode usar criptografia caso queira que a senha seja encriptada,
                    faca isso se for usar o codigo em ambiente de producao, habilitando
                    o codigo abaixo.
                */
                //user.password = bcript.hashSync(request.body.password,salt);
                await user.save();
                /* 
                    Voce deve ativar isso para nao enviar ao front a senha do usuario,
                isso aqui eh algo didatico, logo a senha eh enviado depois de cadastrado,
                mas em ambiente de producao nao faca isso!
                */
                //delete user.password;
                response.status(200).json(user);
            }else{
                response.status(403).json({
                    message: "User is already registered",
                    error: {}
                });
            }
        }catch(error){
            response.status(500).json({
                message: 'Error while saving the user',
                error
            });
        }
    },
    login:function(request,response){

    }
}