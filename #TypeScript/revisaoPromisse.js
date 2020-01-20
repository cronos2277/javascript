function Promessa1(data){
    return new Promise((resolve,reject)=>{
        if(data){
            resolve(console.log(data));
            return data;
        }else{
            reject(console.error('Erro data nao eh string'));
        }  
        
    });
}

Promessa1("Meu valor 1").then("meu valor 2").catch('Erro!!!');