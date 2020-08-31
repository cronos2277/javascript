const carrinho = [
    {nome:'Caneta', qtde:10, preco:7.99},
    {nome:'Impressora', qtde:0, preco:649.50},
    {nome:'Caderno', qtde:4, preco:27.10},
    {nome:'Lapis', qtde:3, preco:5.82},
    {nome:'Tesoura', qtde:1, preco:19.20},
];

const total = produto => produto.qtde * produto.preco;
const some = (acumulador,valor) => valor + acumulador;
console.log("Total com o reduce: ",carrinho.map(total).reduce(some,0));

//Criando reducer customizavel.
Array.prototype.meureducer = function(callback,acc=null){    
    let arr = callback(acc,this[0],0,this);
    for(let i=1;i<this.length;i++){
        arr = callback(arr,this[i],i,this);
    }
    return arr;
}

console.log("Total com o meureduce: ",carrinho.map(total).meureducer(some,0));