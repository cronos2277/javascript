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
