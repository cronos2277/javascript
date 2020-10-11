/*
    O MargeMap permite mapear dois observables diferente, ou seja
    fazer com que os valores de dois observables sejam combinados,
    no caso combinar todas as letras com numeros, como nesse exemplo
    abaixo, para isso precisamos do margeMap e tambem do operador MAP.
    mergeMap => Aceita uma callback como operador, dentro dessa callback
    voce tem como parametro o valor do next do observable atual e dentro
    da callback voce deve chamar o segundo observable, chamar o pipe
    sem dar subscribe e por fim fazer o valor deles combinarem,
    dessa forma voce faz com que todos os valores do Observable interaja
    com todos os valores do outro observable.
*/
const {from} = require('rxjs')
const {mergeMap,map} = require('rxjs/operators')
const obs1 = from(['A','B','C','D','E']);
const obs2 = from([1,2,3,4,5]);
obs1
.pipe(
    mergeMap(n1 => obs2.pipe(map(n2 => `${n1} => ${n2}`)))    
)
.subscribe(console.log);

/*
Output:
A => 1
A => 2
A => 3
A => 4
A => 5
B => 1
B => 2
B => 3
B => 4
B => 5
C => 1
C => 2
C => 3
C => 4
C => 5
D => 1
D => 2
D => 3
D => 4
D => 5
E => 1
E => 2
E => 3
E => 4
E => 5

[Done] exited with code=0 in 0.241 seconds

*/