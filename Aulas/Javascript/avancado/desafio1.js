function somar(x){
    return function somar2(y){
        return function somar3(z){
            return x+y+z;
        }
    }
};
console.log("SOMAR: ",somar(3)(4)(5));

function calcular(x){
    return function calcular2(y){
        return function(fn){
            return fn(x,y);
        }
    }
}
const multiplicacao = (x,y) => x*y;
console.log("CALCULAR: ",calcular(3)(7)(multiplicacao));

const potencia = base => exp => Math.pow(base,exp);
console.log("POTENCIA: ",potencia(2)(3));

