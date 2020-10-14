//funcao identidade, retorna o proprio elemento.
const id = id => id;
console.log(id('ID'));

//o self tranforma se auto invoca.
const self = self => self(self);
console.log(self(id)('ID no self'));

//retorna o primeiro elemento
const primeiro = st => _ => st;
console.log(primeiro(1)(2));

//retorna o ultimo elemento
const ultimo = _ => nd => nd
console.log(ultimo(1)(2));

//inverte o primeiro com o segundo parametro.
const troca = a => b => `invertendo... primeiro: ${ultimo(a)(b)}, ultimo: ${primeiro(a)(b)}`;
console.log(troca(3)(4));

//Imprimindo resultado
const output = f => console.log((f).inspect());

//Improvisando um True, sempre que true chama essa funcao
const T = primeiro; //T sempre retornara o primeiro elemento do carrying
T.inspect = () => "Verdadeiro";

//Improvisando um falso, sempre que falso chama essa funcao
const F = ultimo; //F retornara o ultimo elemento passado no carrying
F.inspect = () => "Falso";

//Emulando um operador NOT, no caso inverte.
/*
    No caso se voce entrar com a funcao T no NOT,
    ele vai retornar o primeiro parametro desse
    currying: a => a(F)(T), uma vez que o T eh a 
    funcao primeiro e o retorno da funcao primeiro
    eh a funcao ultimo, caso usamos o NOT.
    Agora caso voce passe o False, como o false e
    a funcao ultimo, sera retornado a funcao ultima
    desse carrying:  a => a(F)(T);
    Dessa forma invertemos o primeiro com o ultimo.
*/
const NOT = a => a(F)(T);

output(NOT(T)); // Output: Falso

//Criando o equivalente ao operador AND.
/*
    Aqui temos o equivalente ao operador and,
    no caso se passarmos a funcao primeira T,
    duas vezes o mesmo retorna T. Isso ocorre
    porque a funcao primeira retorna o primeiro
    elemento, que eh a funcao primeira, agora
    se o primeiro elemento for a funcao primeira T
    e a segunda a funcao ultima F, sera retornado
    a funcao ultima F, pois eh parametro da funcao
    primeira no primeiro currying, sendo que a funcao
    primeira sempre retorna o primeiro parametro currying,
    se o primeiro do carrying for a funcao primeira T,
    retorna a primeira T, se for a ultima F, retorna a ultima F,
    agora se a funcao passada no primeiro carrying do and for
    a ultima F, sempre sera retornado a ultima F, uma vez que
    temos o F como segundo parametro e nao um dos argumentos.
*/
const AND = a => b => a(b)(F);
output(AND(T)(T)) //Output: Verdadeiro

//Criando o equivalente ao operador OR
/*
    Aqui temos um exemplo de operador or,
    se passarmos a funcao primeira T,
    sempre sera retornado a funcao primeira T,
    isso voce pode ver com o T sendo o primeiro
    parametro do carrying, agora se for passado
    a funcao ultima F, na sequencia a primeira T,
    sera retornada a primeira T, uma vez que esse
    eh o segundo parametro e esse segundo parametro
    eh retornado ali, com a presenca do argumento
    query b, agora se for passado dois parametros
    ultima F, logo retornara o ultimo F, uma vez 
    que a funcao ultima F retornara o ultimo elemento
    que eh a ultima F. Repare que eh o exato oposto da AND.
*/
const OR = a => b => a(T)(b);
output(OR(F)(F)); //Output: Falso

//Criando um ou exclusivo
/*
    No caso o ou exclusivo opera da seginte forma,
    se voce passar a funcao primeira T como primeiro
    argumento, ele vai retornar a funcao do segundo currying
    processado com o NOT, se for a ultima como ultimo parametro
    ele retorna a negacao que eh o primeira T, se nao ele retorna
    a negacao do primeira T, que seria o ultima F.
    Se passado a funcao ultima F como primeiro parametro, ele
    vai retornar o segundo parametro do currying sem processamento
    do not, no caso, se o segundo argumento for primeira T, ele
    retorna a primeira T, se for o ultima F, retornara o ultimo F.
*/
const XOR = a => b => a(NOT(b))(b);
output(XOR(T)(T)); //Output: Falso

//Criando Bi-condicional
/*
    No caso aqui temos uma bi-condicional, nesse caso
    se passarmos o primeiro T, ele retorna o segundo
    parametro do Currying, se for primeiro T, como segundo,
    argumento, retorna o primeiro T, se o segundo parametro
    for Primeiro T tambem, retorna o primeiro T, se nao
    retorna o ultimo F.Agora se passarmos como primeiro
    parametro o ultimo F, logo o segundo argumento sera
    invertido, nesse caso o ultimo F no primeiro com
    o primeiro T no segundo argumento, sera retornado
    primeiro T processado pela funcao NOT, que no caso
    eh o ultimo F, caso os dois sejam ultimo F, nesse
    caso sera executado o segundo parametro com a funcao
    NOT, retornando assim o primeiro T. No caso o XNOR
    eh o oposto do XOR.
*/
const XNOR = a => b => a(b)(NOT(b))
output(XNOR(F)(F)) //Output: Verdadeiro