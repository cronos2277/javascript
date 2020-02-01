/*
    Aqui temos um exemplo de destructing ou seja desestruturacao
    No caso de arrays os dados sao desesturados em ordem, pulando
    um elemento quando aparece uma duas virgulas entre um e outro.
    quando o array ou o objeto esta a direita, ocorre uma atribuicao,
    mas quando esta a esquerda ocorre a desestruturacao.
*/
//Aqui esta a direita do igual o array, ou seja estamos atribuindo valor
let array1:number[] = [1,2,3,4];
/*
    Aqui ocorre o a destruturacao, na pratica temos:
    let primeiro = array1[0];
    let terceiro = array1[2];
    let quarto = array1[3];
    Repare que o segundo elemento eh pulado e isso ocorre,
    justamente por causa da dupla virgula entre o primeiro
    e o terceiro elemento.
*/
let [primeiro,,terceiro] = array1; 
console.log(primeiro,terceiro);
//Aqui estamos ignorando o primeiro elemento e pegando o segundo
let [,segundo] = array1;
console.log(segundo);


/*
    Podemos fazer isso tambem com objetos, ou seja a destruturacao nao se 
    limita a arrays. Aqui temos 3 exemplos de como fazer uma destruracao.
    O mais simples dos seria o primeiro, o elemento1 equivale ao atributo
    de mesmo nome, nesse caso, sera criado uma variavel com o nome de
    elemento1 com o mesmo nome, essa seria a maneira mais simples de se
    destruturar um objeto.
    Dai temos o segundo exemplo, nesse exemplo, eh criado uma variavel
    com o nome de `s` contendo os dados de elemento2, essa eh a sintaxe
    para criar um nome diferente do atributo dentro do objeto.
    {atributo_do_objeto:nome_da_nova_variavel}
    O terceiro exemplo eh para desestrurar um atributo de dentro de um 
    objeto envolto de outro objeto. Nesse caso a variavel sub que esta
    sendo criado seria o equivalente a sub = obj1.elemento3.subelemento
    A sintaxe para isso seria {obj:{subObjeto:nome_do_subObjeto}}
*/
const obj1 = {
    elemento1: "elemento1",
    elemento2: "elemento2",
    elemento3: {subelemento: "Elemento com sub-elemento"}
}
let {elemento1,elemento2: s,elemento3: {subelemento: sub}} = obj1;