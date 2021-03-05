(async function ProcessarNumeros(numeros = [], callback){
    const mult = new Promise(function(resolve,reject){
        if(!numeros){
            reject('Array Inválido!');
        }else{
            const result = numeros.reduce(function(acc,val){
                return acc *= val;
            },1);
            resolve(result);
        }
    });
    const soma = new Promise(function(resolve,reject){
        if(!numeros){
            reject('Array Inválido!');
        }else{
            const result = numeros.reduce(function(acc,val){
                return acc += val;
            },0);
            resolve(result);
        }
    });

    console.log('Antes do await');
    callback({soma,mult}); 
    
    const somarTudo = await mult;    
    const multTudo = await soma; 
    console.log('\nDepois do await');
    callback({somarTudo,multTudo});
})([1,2,3,4],console.log);

