/*
    FLAT
    O metodo flat promove o achatamento de um array, 
    ou seja se tiver um array interno, o metodo
    tira os dados de dentro do array e coloca como dados,
    ou coloca valores de dentro de arrays internos no
    mesmo nivel que os dados.
    Para isso voce precisa definir o nivel de achatamento,
    que pode colocar os elementos N nivel acima, caso
    seja estipulado um numero, ou voce pode colocar 
    infinity casovoce queira achatar todo e qualquer
    array independente da profundidade.
*/
const array1 = [1,[2],[[3]],[[4]],[5],6];
//Output em um nivel: [ 1, 2, [ 3 ], [ 4 ], 5, 6 ]
console.log(array1.flat(1)); //Voce pode definir um nivel
//Output Profundo: [ 1, 2, 3, 4, 5, 6 ]
console.log(array1.flat(Infinity)); //Se voce quiser fazer algo profundo.
/*
    FLATMAP
    O flat map achata um array e aplica uma determinada funcao nos dados
    achatados. Nesse caso o array eh achatado de uma maneira profunda e
    depois de achatado, eh aplicado uma funcao em cima dos dados achatados.
    funcaoFlatMap = e => e*2
    Output: [ 2, 4, 6, 8, 10, 12 ]

*/
funcaoFlatMap = e => e*2;
console.log(array1.flatMap(funcaoFlatMap));