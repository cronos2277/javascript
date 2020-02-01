/*
    Nulo eh um tipo de dado com null, 
    e o never seria um tipo de dado
    que nao tem ponto final, ou seja
    o dado do tipo never, seria um 
    tipo de dado que interromperia
    o fluxo normal da aplicacao, como
    um throw new, por exemplo.
*/ 
//No caso a variavel abaixo, aceita apenas valores nulos
//Inutil se usado assim, mas util se usado com union.
const variavelInutil:null = null;
//Veja essa situacao, esse seria um exemplo mais util ao null,
//voce criaria uma variavel que aceita nulo e um tipo de dado
//que quer e definiria o valor dela padrao como nulo, ao inves
//de undefined que eh o padrao do javascript.
let variavelUtil:number | null = null; //Valor padrao.
variavelUtil = 5; //numero 5 segue o criterio acima.

/*
    Entretanto o never ele deve ser um tipo de dado que deve
    quebrar o fluxo do codigo, como a funcao abaixo, que se
    executado gera um erro na tela,
*/
const Excecao:(msg:string) => void = function(msg:string):void{
    /*
        No javascript para se criar uma Exception, se faz necessario
        apenas criar uma funcao, sendo que essa sera chamada pela
        Throw new <suaFuncao>, e dentro da funcao informar aos atributos
        do this, as seguintes informacoes:

    */
    this.message = msg; //Mensagem a ser exibida.
    this.name = "Excecao Nome"; //Nome da excecao.
}
/*
    Esse eh um excelente exemplo de uma funcao do tipo never,
    uma vez que essa funcao lance um erro na tela, ela nunca
    ira retornar nada, caso essa funcao, retornasse algo,
    ai daria erro, ou ate mesmo se nao retornasse nada.
*/
function gerarErro(e:string):never{ //Retorno do tipo never
    throw new Excecao('Meu Erro!');
}

//Voce pode tambem criar um dado do tipo Never.
//No caso estamos atribuindo a funcao gerarErro aqui.
const outroErro:never = gerarErro("Erro!");