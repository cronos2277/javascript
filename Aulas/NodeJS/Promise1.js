const promessa = new Promise(function(resolve,reject){
    if(Math.random() >= 0.5){
        resolve();
    }else{
        reject();
    }    
});

promessa
.then(() => console.log('Caiu no Try'))
.catch(() => console.log('Caiu no Catch'))
.finally(() => console.log('Programa concluído!'));