class MeuProduto{
    desconto:number = 0;
    constructor(public nome:string, public preco:number){

    }
    public precoComDesconto(numero:number):string{
        if(numero > 0 && numero < 100){
            this.desconto = numero;
            numero /= 100;                        
            this.preco -= this.preco * numero;            
        }        
        return this.resumo();
    }
    resumo():string{
        return `${this.nome} custa R$${this.preco} (${this.desconto}% OFF)`;
    }
}
const produto3:MeuProduto = new MeuProduto("Computador",1500);
console.log(produto3.precoComDesconto(10));
const produto4:MeuProduto = new MeuProduto("Notebook",3000);
console.log(produto4.precoComDesconto(10)); 
