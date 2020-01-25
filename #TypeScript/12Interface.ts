/*
    A forma abaixo seria o primeiro exemplo de um uso
    de interface. Nesse caso voce esta pedindo que o
    argumento passado na funcao interface1, seja um 
    objeto que contenha um valor do tipo string chamado attr.    
 */ 

    const attr1:string = "Exemplo de uso de interface 1";
    const objeto1Interface1:{attr1:string} = {attr1};
    /*
        Nessa funcao abaixo, exige-se que o objeto passado
        tenha um atributo chamado "attr1". A sintaxe eh
        nomeDeObjetoComoParametro:{atributo:tipo}.
    */
    function interface1(para1:{attr1:string}):void{
        console.log(para1.attr1);
    }
    //aqui estamos chamado a funcao que exige interface acima.
    interface1(objeto1Interface1);


/*
    Outra forma de uso de interface como no exemplo abaixo.
*/
interface Interface2 {
    //atributo obrigatorio.
    attra1:string
    //Quando tem o interrogacao, apos o nome do atributo, significa opcional.
    attra2?:string
    //Aqui significa, o atributo eh obrigatorio, deve ser do tipo string e tem o nome dinamico.
    //Na pratica ele se torna o atributo, qualquer string, menos attra1 e attra2. Ou seja 
    //Qualquer atributo string que apareca no objeto e nao tenha nome attra1 ou attra2, entra aqui.
    [attra3: string]:any; //Atributo com nome dinamico o nome.
}
const attra1:string = "atributo1";
const qualquerCoisa1:string = "Atributo com nome variavel";
/*
    Repare que esse objeto tem 2 atributos strings, o primeiro eh o attra1, e o segundo
    sera atribuido ao attra3 podendo esse mesmo atributo ter qualquer nome.
*/
const Objeto1Interface2:{attra1:string,qualquerCoisa1:string} = {attra1,qualquerCoisa1};
function fInterface2(param: Interface2){
    console.log(param.attra1);
/* 
    Qualquer atributo do tipo string que tenha um nome diferente de attra1, sera atribuido
    a [attr3], uma vez que o mesmo tem o nome dinamico, em outras palavras, independente
    do nome, o atributo string que nao tem o nome definido da interface, vai entrar como
    uma [attra3]. Porem se o atributo com esse nome nao existir no  passado objeto, ai da undefined
*/    
    console.log(param.qualquerCoisa1); //No caso aqui ele eh referenciado como qq.
}
fInterface2(Objeto1Interface2);
const attra2="agora com o atributo opcional";
const Objeto2Interface2:{attra1:string,attra2:string,qualquerCoisa1:string} = {attra1,attra2,qualquerCoisa1};
function fInterface22(param:Interface2){
    console.log(param.attra1);
    //Diferente do objeto acima esse tem o valor opcional.
    console.log(param.attra2); 
/* 
    Qualquer atributo do tipo string que tenha um nome diferente de attra1, sera atribuido
    a [attr3], uma vez que o mesmo tem o nome dinamico, em outras palavras, independente
    do nome, o atributo string que nao tem o nome definido da interface, vai entrar como
    uma [attra3]. Porem se o atributo com esse nome nao existir no  passado objeto, ai da undefined
*/ 
    //No caso aqui ele eh referenciado como stringDinamica.
    console.log(param.stringDinamica);
}

/*
    Terceira forma de se criar uma interface,
    aqui nessa interface temos um atributo que no caso
    se referencia a qualquer string encontrada.
    e um metodo abstrado, ou seja o objeto que usar esse tipo,
    ou a classe que implementar essa interface, deve ter
    um metodo exibirTexto.
*/
interface Interface3{
    [qualquerString:string]:any
    exibirTexto(x: Interface3):void
}

const Objeto3Interface3:Interface3 = {
    q:"Valor de q", //Esse valor corresponde ao qualquer string.
    //Aqui abaixo estamos implementando o metodo exibir texto
    exibirTexto:function(interfac:Interface3){
        console.log(interfac.q);
    }
};
Objeto3Interface3.exibirTexto(Objeto3Interface3);