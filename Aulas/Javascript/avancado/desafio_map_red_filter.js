const carrinho = [
    {nome:'Caneta', qtde:10, preco:7.99, fragil:true},
    {nome:'Impressora', qtde:1, preco:649.50, fragil:true},
    {nome:'Caderno', qtde:4, preco:27.10,fragil:false},
    {nome:'Lapis', qtde:3, preco:5.82, fragil:false},
    {nome:'Tesoura', qtde:1, preco:19.20, fragil:true},
];

const fragilidade = f => f.fragil; //Selecionando apenas os frageis.
const total = t => t.qtde * t.preco; //multiplicando a qtde pelo preco.
const media = (acc,valor,indice,array) => { //Tirando a media aritimetica.   
    //Logica para o ultimo elemento do array. Usamos toFixed(2) para exibir apenas 2 casas decimais. 
    if(indice == array.length - 1) return ((acc + valor)/array.length).toFixed(2);
    //Enquanto o ultimo elemento nao chega.
    else return (acc + valor);
}
console.log(
    carrinho.filter(fragilidade) //Selecionando os frageis
    .map(total) //Multiplicando o preco pela quantidade dos selecionados.
    .reduce(media,0) //Tirando a media aritimetica desses produtos.
    );
    