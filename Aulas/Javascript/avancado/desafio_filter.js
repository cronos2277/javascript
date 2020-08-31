//Criando um filter customizavel.
Array.prototype.meufilter = function(callback){
    const arr = [];
    for(let i = 0;i<this.length;i++){
        if(callback(this[i],i,this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

const numeros = [0,1,2,3,4,5,6,7,8,9];
const pares = n => n % 2 == 0;
console.log("Filter: ",numeros.filter(pares));
console.log("Meu Filter: ",numeros.meufilter(pares));