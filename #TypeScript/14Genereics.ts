/*
    O Generico eh uma forma de voce atribuir tipo no momento
    em que voce for usa-lo. Por exemplo a funcao abaixo,
    o generico ele vai assumir um tipo de acordo com o tipo
    passado, como essa funcao retorna um generico que foi
    usado como argumento, dependendo do argumento que voce
    passa, isso vai definir o tipo do retorno, exatamente
    nesse exemplo, tudo depende de como o generico eh estruturado
    Uma funcao generica deve conter um diamente na hora da sua
    assinatura, como no exemplo abaixo, temos no nome da 
    funcao <GENERICO>. Voce pode usar o generico como argumento,
    e pode usar como um tipo de retorno.
*/

function generica<GENERICO>(variavel:GENERICO):GENERICO {
    return variavel;
}
//Repare que aqui a funcao generica trabalha como se fosse uma string.
//Repare que a funcao generica tem os mesmos metodos aqui que uma string literal.
console.log(generica("ola mundo").charAt(2));
console.log("ola mundo".charAt(2));
//Repare que aqui a funcao generica trabalha como se fosse um numero.
//Repare que a funcao generica tem os mesmos metodos aqui que um numero literal.
console.log(generica(1.989485984).toFixed(2));
console.log(1.989485984.toFixed(2));
//Aqui como se fosse um booleano.
//Repare que a funcao generica tem os mesmos metodos aqui que um booleano literal.
console.log(true.valueOf);
