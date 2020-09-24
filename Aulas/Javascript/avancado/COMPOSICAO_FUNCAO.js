/*
    Aqui temos um exemplo do uso do Higher order
*/
function composta(...fns){
    return function(arg){
        return fns.reduce((acc,fn) => {
            return fn(acc);
        },arg)
    }
}

const somar = s => s + s;
const multiplicar = m => m * m;

composta(somar,multiplicar,somar,multiplicar,console.log)(1);