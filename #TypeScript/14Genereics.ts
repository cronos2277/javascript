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
/*
    Outro exemplo de generics, o nome deriva-se do fato de que a classe criadora
    eh generica e nao o seu uso. O Array eh uma classe generica, que pode ser
    usada, usando a estrutura de diamante com qualquer tipo de dado, nesse caso um number.
*/
const arraygen1:Array<number> = [0,1,2.2];
console.log(arraygen1);
//Usando o operador union.
const arraygen2:Array<string|number> = ['2',2]; 
//Voce tambem pode usar um tipo customizavel no array generico.
console.log(arraygen2);
type meuTipo = {
    numero:number,
    texto:string
}
const arraygen3:Array<meuTipo> = [{numero:1,texto:"ola mundo"},{numero:2,texto:"novo texto"}];
console.log(arraygen3);