class Produto{
    constructor(public nome:string, public preco:number, public desconto:number = 0){

    }
}
const produto1:Produto = new Produto("Computador",1500);
const produto2:Produto = new Produto("Notebook",3000,20);
