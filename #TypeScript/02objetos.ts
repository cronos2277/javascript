/*
    Abaixo esta sendo declarado um objeto
    no Typescript, como o objeto eh uma
    constante, o mesmo precisa ter o seu
    valor declarado na hora, no caso
    o objeto1 ele apenas recebe um outro
    objeto que tenha um atributo nome e
    do tipo String.
*/
const nome: string = "Joao";
const objeto1:{nome:string} = {nome};

/*
    No exemplo abaixo estamos definindo um objeto
    que exige um metodo1, que deve ter esse nome e 
    tambem deve ser uma funcao que recebe 2 parametros
    numerico e retorna um numero, e outro que deve estar junto
    como o metodo1, eh o parametro chamado resposta, 
    esse segundo devendo se chamar resposta e devendo 
    ser obrigatoriamente uma string. Alem de terem
    o exato mesmo nome e tipo, eles devem estar dentro
    de chaves, apenas esse tipo de objeto o objeto2 aceita
*/
const metodo1:(a:number,b:number)=>number = (a,b) => a+b;
const resposta:string = "resposta";
let objeto2:{metodo1:(x:number,y:number) => number,
            resposta:string
};
//Aqui ocorre a atribuicao, a ordem nao importa, apenas importa:
//O nome dos metodos e atributos, devem ser iguais a quando foi
//definido o objeto e por fim o tipo. no caso o objeto2 apenas pode
//receber um objeto que contenha a resposta, e o metodo1 juntos,
//dentro de um outro objeto, como exigido acima.
objeto2 = {resposta,metodo1};
