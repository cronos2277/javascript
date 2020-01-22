
class Pai{
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
    constructor(protected var2:string){}
    protected retorneVar1():string{
        return this.var1;
    }

    protected retorneVar2():string{
        return this.var2;
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
    public exibir():void{
        console.log(this.retorneVar1());
        console.log(this.retorneVar2());
    }
}
/*
    Apesar da classe pai exigir parametro, o super do construtor
    da classe Filho passou o parametro que a classe Pai exigia.
    Sendo assim a classe filho nao exige parametro.
*/
const filho:Filho = new Filho();
filho.exibir();