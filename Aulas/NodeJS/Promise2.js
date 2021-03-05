function Calcular(numeros = []){
    return new Promise(function(resolve,reject){
        if(!numeros) reject(`Não tem números para operar!`);
        const mult = numeros.reduce(function(acumulador,valor){
            return acumulador *= valor;
        },1);

        const soma = numeros.reduce(function(acc,val){
            return acc += val;
        },0);

        resolve({mult,soma});
    });
}

Calcular([1,2,3,4]).then(console.log);