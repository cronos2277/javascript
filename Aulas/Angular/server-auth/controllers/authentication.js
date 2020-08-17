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
            let user = await Model.findOne({
                user:request.body.user                
            });    
            const hasValue = (request.body.user && request.body.pass && request.body.name);        
            if(!user && hasValue){
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
            }else if(!hasValue){
                response.status(403).json({
                    message: "All fields are required",
                    error: {}
                });
            }else{
                response.status(403).json({
                    message: "User is already registered!",
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
        const user = request.body.user;
        const pass = request.body.pass;
        Model.findOne({user}).lean().exec(
            function(error,user){
                if(error) return response.status(500).json({message: "Internal Server Error",error});
                const auth_error = (pass == '' || pass == null || user.pass != pass);
                if(auth_error) return response.status(403).json({message:"Wrong e-mail or password",error:null});
                /*
                    Habilite isso caso voce esteja usando criptografia do bsync, Aqui eh feito a descriptografia
                    para acessar os dados, caso voce use o sistema acima.
                    if(bcript.compareSync(password,salt)){
                    //Se a senha bater
                }else{
                    //Se nao;
                }
                */                                
                response.status(200).json({message: "Logged!",error:null, user});
            }
        );
    },
    delete: function(request,response){            
        Model.deleteOne({_id: request.params.id},  
            (err) => {
                if(err)
                response.status(500).send({message:"Internal Server Error", error:err});
                else
                response.status(200).send({message:"User was removed!", error:null});
            })
    }
}