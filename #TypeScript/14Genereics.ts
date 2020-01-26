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

/*
    Aqui temos um exemplo de generico dentro de classes.
    Nesse diamante abaixo, estamos exigindo para que a classe filha,
    determine os tipos a serem passados aqui, podendo ser um tipo
    primitivo, ou ate mesmo uma classe ou algo criado com o type.
    Essa classe abstrata abaixo exige a passagem de dois tipos 
    dentro do diamamnte e a implementacao do metodo exibir.
*/

abstract class ClasseAbstrata <Numero1,Numero2>{ 
    public abstract exibir (numero1:Numero1, numero2:Numero2):string;
}
/*
    Aqui temos eles postos em pratica. Os valores passado no
    diamante, ou se ja dentro do menor maior <>, foi o tipo
    number, ou seja o mesmos tipos informados aqui serao
    respectivamento substituidos pelas referencias de Numero1
    e Numero2 na classe, como os dois sao number aqui na classe
    concreta eh number, logo o o Numero1 e Numero2 da classe abstrata
    sera number, na implementacao feita aqui.
*/
class ClasseConcreta extends ClasseAbstrata<number,number>{
    /*
        Como o metodo exige 2 parametros definidos da classe
        abstratas como tipo Numero1 e Numero2, aqui sera 
        pego os tipos na ordem definida dentro dos diamantes.
        o primeiro number seria o Number1 e o segundo number,
        seria o Number2, ou seja o metodo ele tem a assinatura
        de dois parametros definidos dentro do diamante e retorna
        String.
    */
    public exibir(numero1:number,numero2:number):string{
        return `O resultado eh ${numero1 + numero2}`;
    }
}

console.log(new ClasseConcreta().exibir(3,4));