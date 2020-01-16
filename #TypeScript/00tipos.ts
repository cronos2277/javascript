let numero: number = 1; //o number no TS eh o tipo numerico.
let decimal: number = 1.8;
let verdadeiro: boolean = true; //Tipo booleano
let qualquer_coisa: any = {}; //Any no TS deixa o tipo dinamico.
qualquer_coisa = "Ola"; //Repare que ele permite alterar o tipo.
let vetores: number[] = [1,2,3]; //Array de tipo unico No TS.
let vetores2: any[] = ['OI',2,true]; //Array de tipos variados
let tupla_exemplo: [number,string,boolean] = [1,"Ola mundo",true]; //Tuplas
enum semana{
    //Enum pode ser criado para criar uma lista fechada.
    domingo, //Como eh primeiro elemento, vale zero
    segunda, //Como eh o segundo elemento vale 1.
    terca = 300, //Voce pode setar um valor inteiro customizavel.
    quarta, //Agora esse como vem depois do 300, por padrao vale 301.
    quinta = 300, //Voce pode repetir valores sem problemas.
    sexta, //Vale 301 tambem, sempre eh o elemento anterior +1 por padrao.
    sabado //Para acessar os valores, use a notacao ponto, semana.sabado;
}
console.log(semana.sabado);
/*
    Mesmo que o codigo nao esteja certo perante o TypeScript 
    o mesmo pode ser compilado caso seja um codigo javascript
    valido. Para mudar isso, voce deve configurar o compilador
    do Typescript.
    O TypeScript funciona em cima do Javascript,
    em uma comparacao grosseira, seria como se o javascript
    fosse uma linguagem de "baixo nivel" e o TS de alto,
    uma vez que o codigo ao final eh convertido para o 
    javascript.
    para definir uma variavel tipada no TypeScript segue-se
    o seguinte padrao.
    [let/var/const] variavel:tipo = valor;
    O Typescript tambem infere tipo as variaveis, por exemplo
    se uma variavel for inicializada com 1, o TS pode entender
    que essa variavel eh do tipo number e caso voce coloque
    um valor que nao seja number ele pode acusar erro.
    Entre os tipos mais basicos, temos:
    number = numero;
    boolean = booleano;
    any = aceita qualquer coisa;
    string = Texto;
    any[] = Array heterogeneos.
    tipo[] = array homogeneo.
    [tipo1,tipo2,tipo3] = tuplas.
    As tuplas sao arrays que devem conter dados do tipo, na quantidade e na sequencia
    estipulada, por exemplo let variavel: [number,string] => Para funcionar o array precisa
    ter exatamente dois elementos, sendo o primeiro numero e o segundo uma String valida
    no javascript, se o primeiro elemento nao foi numero e o segundo nao foi String,
    como nesse caso, o tipo de dado esta incorreto, se houver menos de dois ou mais
    de dois indices no array, tambem esta incorreto, pois deve ter exatamente 2, nesse
    exemplo em especifico e alem disso a sequencia deve ser como a estipulada, exatamente
    number e string e nao string e number, ou seja a tupla define quantos, elementos,
    quais sao e como estao definidos, como uma tupla no banco de dados, que uma vez estruturados
    voce deve seguir a estrutura da tabela ao dar um insert por exemplo.
    
*/ 
