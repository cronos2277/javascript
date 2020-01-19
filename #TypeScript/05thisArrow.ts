//Definindo tipo = definido a arrow
/*
    Essa eh a primeira forma de escrever uma funcao arrow no
    type script, no caso a esquerda voce esta definindo que
    arrow1 apenas ira receber uma funcao que tenha um numero
    como retorno e um numero como saida.
    No corpo da arrow, mesmo que voce tenha um parametro, 
    se faz necessario os parenteses. 
    Isso esta errado: b:number => 2*b;  
    Isso esta certo: (b:number) => 2*b; 
*/
const arrow1:(a:number)=>number = (b:number) => 2*b; 
/*
    Abaixo como o arrow2 nao foi tipificado, ele fica
    do tipo 'any' porem a arrow exige uma entrada de 
    parametro numerica e pode sair qualquer tipo de 
    dado, logico que pela logica isso nao deve acontecer
    porem o ponto aqui eh que o typescript nao esta
    garantido a saida de um dado do tipo number
*/
const arrow2 = (a:number) => 2/a;
/*
    Aqui na arrow ja eh garantido que a saida seja numerica,
    assim como a entrada tambem. O operador `**` seria
    exponenciacao, ou seja a elevado ao cubo no exemplo abaixo.
*/
const arrow3 = (a:number):number => a**3;

/*
    Aqui temos um exemplo complexo, envolvendo uma funcao
    arrow.
    O array 4 aceita uma funcao que exige dois parametros e 
    retorna um booleano, dentre esses dois parametros temos:
    O primeiro exige ser do tipo numero, o tipo numero eh um
    objeto que contem dentro dele um parametro que eh do tipo
    numerico, o segundo eh do tipo any, ou seja pode ser qualquer
    coisa. Essa funcao retorna um booleano.
    Muito bem qualquer funcao arrow eh envolvida em parenteses
    quando usado em typescript, diferente do js puro ao qual
    uma funcao arrow quando se tem um parametro nao precisa disso.
    O operador in retorna  true se a propriedade especificada estiver
    no objeto especificado ou na sua cadeia de protótipo 
    (prototype chain) desde objeto "developer.mozila.org", um exemplo
    outro do uso desse operador seria, vamos imaginar um array:
    let a = [a,b,c], se fizermos as seguintes verificacoes dara verdadeiro
    0 in a, 1 in a, 2 in a, dara verdadeiro. Isso ocorre porque esses
    sao os indices do array, e como no javascript um array eh um objeto,
    esses indices seriam como se fossem atributos, ou seja o operador in
    verifica se determinada variavel, esta contida dentro de um objeto.
    Tambem se faz necessario usar chaves caso a arrow tenha mais de uma 
    linha e tambem necessita informar o retorno caso a arrow tenha as chaves.    
*/
type Numero = {numero:number};
const arrow4:(n:Numero,p:any)=>boolean = (numero:Numero,param:any) => {
    return param in numero;
}
/*
    No caso de uma funcao sem parametros pode ser usado como no
    javascript, porem nao se tem nenhuma garantia a respeito dessa
    funcao abaixo por parte do typescript, uma vez que o retorno nao
    oi definido, assim tambem repare que o tipo do arrow5 tambem esta
    omitido. O operador || faz uma comparacao booleana do primeiro valor,
    ou seja se o primeiro valor for identificado como falso no javascript
    o retorno sera o segundo valor, ou seja o valor depois do operador ||
    nesse caso o retorno seria 1, uma vez que o zero eh igual mas nao identico
    ao zero, a comparacao eh feita como se fosse dois iguais `==` e nao
    tres `===`, logo qualquer valor que seja `!= true`, sera ignorado e 
    sera usado o valor apos o operando, como no caso eh o numero 1.
    Se qualquer um desses valores estivessem no lugar do zero, na funcao
    abaixo o resultado seria o mesmo, e seria retornado o numero 1:
        undefined
        null
        0 (Zero)
        "” (String vazia)
        NaN (Not a Number)
        [] (Array vazio)
*/
const arrow5 = () => 0 || 1;