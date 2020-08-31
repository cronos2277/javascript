const carrinho = [
    {nome:'Caneta', qtde:10, preco:7.99},
    {nome:'Impressora', qtde:0, preco:649.50},
    {nome:'Caderno', qtde:4, preco:27.10},
    {nome:'Lapis', qtde:3, preco:5.82},
    {nome:'Tesoura', qtde:1, preco:19.20},
];

const nome = n => n.nome;
const total = n => n.qtde * n.preco;

console.log("Produtos map:",carrinho.map(nome));
console.log("Total map: ",carrinho.map(total));
console.log('\n','agora com o meu map','\n')
//Criando um map custom e adicionando ao prototype do array
Array.prototype.meumap = function(callback){
    const arr = [];
    for(i=0;i<this.length;i++){
        arr.push(callback(this[i],i,this));
    }
    return arr;
}

//Usando o array meumap, registrado no prototype do array.
console.log("Produtos meumap:",carrinho.meumap(nome));
console.log("Total meumap: ",carrinho.meumap(total));