/*
    Aqui temos um exemplo de como funciona as classes no javascript,
    Todos os atributos da classe Exemplo1 sao publicos.
*/
class Exemplo1{    
     //Voce pode usar o atributo public
    public atributo1:number;
     //Voce tambem pode passar um valor padrao
    public atributo2:number = 2;
    //Se nao colocado uma visibilidade, por padrao fica como publico.
    atributo3:number;
    //Mesmo sem definido uma visibilidade voce pode colocar um valor.
    atributo4:number = 4;
    /*
        Voce pode tambem criar um novo atributo dentro do construtor,
        aqui no caso eh criado um atributo chamado atributo5, tendo
        como valor padrao o valor de 5, caso nenhum valor seja passado.
    */
    constructor(public atributo5:number = 5){
        /*
            Quando voce nao define no corpo da classe,
            voce necessita estipular um valor dentro
            do construtor. Se voce omitir as linhas
            abaixo, ira acusar erro, pois os atributos
            devem ser inicializados no construtor ou
            devem ser setado valores na hora da declaracao.
        */
        this.atributo1 = 1; 
        this.atributo3 = 3;
    }
}
const exemplo1:Exemplo1 = new Exemplo1();
console.log(exemplo1.atributo1); 
console.log(exemplo1.atributo2);
console.log(exemplo1.atributo3);
console.log(exemplo1.atributo4);
//Aqui eh o valor padrao do atributo5
console.log(exemplo1.atributo5); 
//No caso como aqui eh passado um valor no construtor
//o valor 5 que eh correspondente ao atributo 5, eh alterado
const exemplo1a:Exemplo1 = new Exemplo1(6);
console.log(exemplo1a.atributo5); 

class Exemplo2{
    str1:string = "valor padrao 1";
    str2:string = "valor padrao 2";    
    /*
        Aqui temos um exemplo de como escrever um metodo
        no TypeScript. Quando o visualizador de acesso eh
        omitido, por padrao se assume o public, alem disso
        se faz necessario especificar um retorno.
    */
    metodo1():string{
        return this.str1;
    }
    /*
        Aqui temos um exemplo de como funciona a questao do
        escopo das variaveis. Sempre que for refenciado uma
        variavel da classe, deve-se usar o this na frente,
        do contrario a variavel sera procurada apenas no escopo
        local. OU seja se voce colocar uma variavel do tipo b,
        sem o this na frente dentro de um metodo, caso a variavel
        nao exista dentro do metodo, o mesmo nao sera procurado
        em escopo mais amplo e dara erro, ou seja dentro de classe
        o this do javascript funciona como o this de qualquer uma
        linguagem orientada a objeto.
    */
    public metodo2(str2:string):string{
        return "str2 da classe: "+this.str2+", str2 interno: "+str2;
    }
}
const exemplo2:Exemplo2 = new Exemplo2();
console.log(exemplo2.metodo1());
console.log(exemplo2.metodo2('argumento passado'));
/*
    Aqui no exemplo abaixo, nos temos um exemplo do private,
    o private sao atributos ou metodos de classe, ou seja
    eles so podem ser acessado na propria classe, assim como
    em uma linguagem orientada a objeto.
    O private nao existe no javascript puro, logo isso eh 
    um recurso do Typescript.
*/
class Exemplo3{
    //O Private precisa ser explicitado, do contrario sera publica. 
    private atributoPrivado1:number = 1;
    private atributoPrivado2:number;
    constructor(param:number){
        this.atributoPrivado2 = param;
    }
    //Voce pode tambem colocar um metodo como privado.
    private metodo():string{
        return `o atributo privado 1 = ${this.atributoPrivado1}, o atributo privado 2 = ${this.atributoPrivado2}`;
    }
    public resultado():string{
        return this.metodo();
    }
}
const meuExemplo3:Exemplo3 = new Exemplo3(2);
console.log(meuExemplo3.resultado());