/*
    Aqui estamos usando o currying, no caso quando
    essa estrategia eh usada divide-se a funcao,
    se voce tem dois valores por exemplo, voce
    coloca o primeiro parametro na funcao e o 
    segundo valor voce coloca como parametro da
    funcao que voce retorna da primeira funcao.
    Esse tipo de funcao voce faz mais de uma invocacao,
    caso tenha mais de um parametro. Exemplo:
    esse tipo de funcao se invoca assim: minhafuncao('param1')('param2');
    ao inves de invocar assim minhafuncao('param1','param2);
    No caso desse tipo de funcao: "minhafuncao('param1')('param2');"
    voce pode parcelar o processamento, fazendo o primeiro processamento
    dessa forma: let x = minhafuncao('param1') e ai quando for
    necessario voce pode solicitar o segundo processamento x('param2'),
    alem disso esse tipo de funcao permite o reuso.
    Ou seja com essa estrategia permite mais reuso de funcao e
    uma execucao mais inteligente
*/
function somalazy(valor1){ //Aqui esta o primeiro argumento
    const fim = Date.now() + 1000;
    while(Date.now() < fim){}
    return function(valor2) { //Aqui esta o segundo argumento
        return valor1 + valor2
    };
}

//Executa tudo de uma vez.
function somaeagle(valor1,valor2){
    const fim = Date.now() + 1000;
    while(Date.now() < fim){}
    return valor1 + valor2;
}

console.time("#Eagle");
somaeagle(1,1);
somaeagle(2,2);
console.timeEnd("#Eagle");

console.time("#Lazy");
const lazy = somalazy(1);
lazy(1);
lazy(2);
console.timeEnd("#Lazy");