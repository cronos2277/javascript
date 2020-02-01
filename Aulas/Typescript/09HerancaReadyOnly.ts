/* Assim que voce cria uma classe abstrata. */
abstract class Avo{
    //Uma classe abstrata permite que voce crie metodos abstratos.
    abstract exibir():void;
    //E dessa forma se cria um atributo estatico privado
    private static attrDeClasse:string = "Valor da classe estatica";
    //Metodo estatico publica se cria dessa forma.
    public static pegarEstatico():string{
        return Avo.attrDeClasse;
    }
    /* 
        Quando tem o atributo readonly, significa que o valor em questao
        sempre tera apenas o primeiro valor estipulado a ela, ou seja
        apenas eh possivel atribuir algo para ele uma vez.
    */
    public readonly somenteLeitura:string;
    constructor(somenteLeituraVariavel:string = "Valor Padrao da variavel apenas leitura"){
        this.somenteLeitura = somenteLeituraVariavel;
    } 
}


class Pai extends Avo{
    /*
        O protected funciona como nas outras linguagens 
        de programacao, ou seja apenas a propria classe
        e as classes filhas tem acesso.
        Repare que essa classe tem um atributo privado,
        um atributo protegido e 2 metodos protegidos.
        No caso o construtor exige que seja informado
        um parametro na hora da instanciacao, porem 
        como o atributo eh protegido, entao apenas
        a classe filha poderia passar algum argumento,
        ou seja colocar um parametro dentro do construtor
        poderia ser uma forma de evitar que a mesma
        seja instanciada caso tenham um parametro obrigatorio
        e privado no construtor por exemplo.
    */
    private var1:string = "Exemplo de atributo privado";
    constructor(protected var2:string){
        super(); //Sempre que a classe tiver um pai, precisa chamar o construtor.
    }
    protected retorneVar1():string{        
        return this.var1;
        
    }

    protected retorneVar2():string{
        return this.var2;
    }
    //Esse eh o metodo que a classe Avo Obriga que seja implementado.
    public exibir():void{
        console.log(this.retorneVar1());
        console.log(this.retorneVar2());
    }
}

class Filho extends Pai{
    /*
        Classe filho, toda a classe filho no javascript
        deve chamar a classe pai, caso voce queira usar
        o construtor. O construtor sempre deve chamar a
        classe pai, caso o mesmo seja criado dentro da 
        classe em questao, veja que a classe pai exige um
        parametro, porem quando voce chama a classe filho
        a mesma passa o parametro a classe pai e cria
        um objeto filho.
    */
    constructor(){
        super("Exemplo de outro atributo");
    }
    
}
/*
    Apesar da classe pai exigir parametro, o super do construtor
    da classe Filho passou o parametro que a classe Pai exigia.
    Sendo assim a classe filho nao exige parametro.
*/
const filho:Filho = new Filho();
filho.exibir();

//Aqui eh acessado o metodo estatico da classe avo.
console.log(Avo.pegarEstatico());
//aqui eh acessado uma variavel classe Avo.
console.log(filho.somenteLeitura);