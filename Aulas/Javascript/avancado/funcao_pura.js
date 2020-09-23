/*
    Eh uma funcao pura, pois nao altera e nao tem o seu funcionamento
    comprometido por variaveis de escopo mais externo ao da funcao.
    Alem disso tem valores determinados a funcao sempre terminara
    devolvendo a soma de dois valores.
*/

const pura = (a,b) => a + b;
console.log("Funcao pura: ", pura(2,2));
/*
    A funcao cumprimento eh impura porque ela recebe dados externos, no caso
    o PI, para uma funcao ser pura:
    1 - Nao deve ser influenciada por variaveis de escopo externos.
    2 - Nao deve influenciar valores de escopo externo.
    3 - Deve haver retorno de valores deterministicos, qualquer valor 
    que pode dar erro por exemplo nao se enquadra, como dados oriundo
    de uma conexão com banco de dados, arquivos e Ajax por exemplo, 
    uma vez que não é possível determinar com total precisão o tipo
    de dado, podendo dar um catch na aplicacao.
*/
const comprimento = raio => 2 * Math.PI * raio;
console.log("Comprimento de 314:",comprimento(314));

let x = 3;
const impura = () => console.log(++x); //Nao é pura pois altera a variavel de um escopo mais externo
impura();