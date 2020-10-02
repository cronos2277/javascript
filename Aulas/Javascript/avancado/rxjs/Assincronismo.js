const { from, asyncScheduler,queueScheduler,asapScheduler } = require('rxjs');
const {observeOn} = require('rxjs/operators');

console.time("#tempo");
console.log("Iniciando...");
const observer$ = from([0,1,2,3]);
observer$.pipe(    
    observeOn(asyncScheduler)    
).subscribe(
    console.log,
    console.error,
    () => console.log('asyncScheduler assincrono concluido\n\n')
);

observer$
.pipe(
    observeOn(queueScheduler)
).subscribe(
    console.log,
    console.error,
    () => console.log("queueScheduler assincrono concluido\n\n")
);

observer$
.pipe(
    observeOn(asapScheduler	)
).subscribe(
    console.log,
    console.error,
    () => console.log("asapScheduler assincrono concluido\n\n")
);
console.log("Finalizando...")
console.timeEnd("#tempo");