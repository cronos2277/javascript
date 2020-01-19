/*
    Operador Spread. Spread eh um operador que espalha valores,
    repare no array completo, o array completo eh um array
    que tem valores dos 3 outros arrays e mais do proprio array.
    O spread eh uma forma de voce passar varios valores. 
    se voce fizesse isso e nao usasse o spread:
    let completo:number[] = [inicio,4,meio,8,fim];
    teriamos o number tendo 3 arrays, o array inicio, o valor 4
    depois o array meio, depois o numero 8 e por fim o array fim.
    ficando dessa forma, caso voce nao use o operador spread.
    [[1,2,3],4,[5,6,7],8,[9,10,11]], porem quando voce coloca os
    3 pontos na frente do array, o valor ele espalha, ficando exatamente
    como o exibido no console.log(), sendo assim:
    [1,2,3,4,5,6,7,8,9,10,11]
*/
const inicio:number[] = [1,2,3]; //Esse array ficara no comeco.
const meio:number[] = [5,6,7]; //Esse array ficara no meio.
const fim:number[] = [9,10,11]; //Esse outro array ficara ao fim do array.
/*
    o inicio gracas ao operador spread eh espalhado no inicio do array,
    adicionando os valores do inicio, [1,2,3] ao inicio do array.
    apos o numero 4, eh espalhado o array meio [5,6,7] entre o numero 4 e o numero 8,
    e por fim eh adicionado o array [9,10,11] fim ao final do array. 
*/
let completo:number[] = [...inicio,4,...meio,8,...fim];
console.log(completo);
/*
    Voce pode passar um array como multiplos valores usando o spread, 
    esse console.log abaixo seria o equivalente a:
    console.log(Math.max(completo[1],completo[2],completo[3],
        completo[4],completo[5],completo[6],completo[7],completo[8],
        completo[9],completo[10],completo[11]));
*/ 
console.log(Math.max(...completo));
console.log('continuando...');
/*
    Com relacao a ...param, temos que esse aqui eh 
    operador rest, sendo o spread quando separa
    e rest quando junta, tudo dependendo do contexto,
    no caso aqui eh o rest, no caso a funcao isRest
    ele recebe infinitos parametros do tipo any, atraves
    do argumento param na funcao. Voce tambem pode separar
    o primeiro parametro dos outros, no caso o primeiro,
    eh sempre o primeiro parametro informado, e o param
    seriam os demais. O param no contexto dessa funcao,
    seria da segunda ate a ultima funcao, independente
    de quantos argumentos tenha, caso seja so um, apenas
    o primeiro parametro teria valores.
    Entao assim sendo a diferencao entre rest e spread
    se diferencia de acordo com o contexto, porem ambos
    usam 3 pontos, no caso desse rest abaixo, todos os
    parametros do segundo ate o ultimo sao unidos em um array
    formando assim um rest.
*/
const isRest:(valor:any) => void = (primeiro:any,...param:any) => {
    console.log(primeiro);
    console.log(param);    
};
let comparacoes:any[] = [0,1,[],[1],{},'',null,undefined];
isRest(comparacoes);
