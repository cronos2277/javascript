const {from, interval, of} = require('rxjs');

const intervalo = interval(500);
const intervalo_inscricao = intervalo.subscribe(
    e => console.log(`e = ${e}`)     
);

setTimeout(
    () => intervalo_inscricao.unsubscribe(),
    5000
    );

from([
    parseInt(Math.random() * 100),parseInt(Math.random() * 100),
    parseInt(Math.random() * 100),parseInt(Math.random() * 100),
    parseInt(Math.random() * 100),parseInt(Math.random() * 100)
]).subscribe(
    e => console.log(`From ${e}`)
).unsubscribe();

of(1,2,3,4,5,6,7,8,9)
    .subscribe(
        e => console.log(`${e}³ = ${e*e*e}`)
    );