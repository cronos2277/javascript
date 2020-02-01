/*
    Com o type do TypeScript, eh possivel criar um novo tipo,
    a sintaxe eh type, depois o nome do tipo e por fim como
    o mesmo. Nesse caso abaixo, todas as variaveis do Tipo1
    devem ter um objeto contendo obrigatoriamente uma string
    chamada nome e um metodo que aceita um parametro string
    sem retornar nada.
*/
type Tipo1 = {
    nome:string;
    metodo:(s:string) => void;
}; 
//Aqui estamos criando a nossa variavel do tipo1.
let variavel1:Tipo1;
//Criando os atributos do Tipo1.
const nome = "Seu Nome";
const metodo = function(e:string):void{
    console.log(e);
}
//Aqui passamos um valor valido para a variavel1 do Tipo1.
variavel1 = {nome,metodo};

/* 
    Aqui nos criamos um novo tipo como uma tupla, ou seja
    apenas um array com exatos 2 elementos, sendo respectivamente
    inteiro e String
*/
type Tipo2 = [number,string];
const variavel2:Tipo2 = [1,"Jose"];
/*
    Aqui temos um exemplo mais complexo, no caso do Tipo3,
    ele tem a estrutura de valores que eh um array que pode
    conter numeros ou boleanos e tem um metodo complexo
    que tem como entrada um valor numerico e um dado do
    Tipo2 como o criado acima.
*/
type Tipo3 = {
        valores:number[] | boolean[], 
        metodoComplexo:(n:number,t:Tipo2) => void;
    }

const valores = [0,2,false,true,5];
const metodoComplexo = function (n:number,t:Tipo2):void{
    console.log(t[n]);
}

var variavel3 = {valores,metodoComplexo};