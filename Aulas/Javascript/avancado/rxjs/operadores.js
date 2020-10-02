const {noop,map,concatAll, last,first} = require('rxjs/Operators');
const {Observable} = require('rxjs');

const observable$ = new Observable(
    subscribe => {
        try{
            let array = [];
            for(let i=0;i<3;i++){
                array[i] = i;
            }
            subscribe.next(array);
        }catch(error){
            subscribe.error(error)
        }finally{
            subscribe.complete()
        }
    }
);
observable$
.pipe(
    map(e => e), //Aplica uma funcao aos dados, no caso nao faz nada
    concatAll(), //Aqui esta sendo usando para planificar o array que recebe.
)
.subscribe(
    e => console.log(`dado: ${e}`),
    noop, //Esse operador faz com que nada seja executado, ele eh o no operations
    noop
);

observable$.pipe(concatAll(),first()).subscribe(e => console.log(`\nResultado do operador primeiro: ${e}`));
observable$.pipe(concatAll(),last()).subscribe(e => console.log(`\nResultado do operador last: ${e}`));