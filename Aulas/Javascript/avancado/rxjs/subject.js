const {Observable, Subject} = require('rxjs');

function getObservable(){
    return new Observable(
        function(subscribe){
            subscribe.next(Math.random());
            subscribe.complete();
        }
    );
}

const obs1 = getObservable();
obs1.subscribe(e => console.log(`Obs1 = ${e}`));
const obs2 = getObservable();
obs2.subscribe(e => console.log(`Obs2 = ${e}`));

//Exemplo com Subject
const subject = new Subject(); 
const numero = Math.random();
subject.subscribe({
    next: callback => callback(numero)
});        

subject.next(e => console.log(`sub1 = ${e}`));
subject.next(e => console.log(`sub2 = ${e}`));
    





