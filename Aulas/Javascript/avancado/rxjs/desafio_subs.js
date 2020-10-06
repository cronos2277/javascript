/*
    Desafio Itens:
    1) Esperar 3 Segundos.
    2) gerar Numeros a cada 500ms
    3) Dar unsubscribe depois de 10 segundos
*/

const {Subject} = require('rxjs');

function getSubs(){
    const inicio = 3000;
    const fim = 10000;
    const ciclo = 500;

    console.time('#Rodando');
    const subs = new Subject();
    let count = 0;
    let intervalo =  null;    

    subs.subscribe(
        e => console.log(`Numero ${e} gerado no tempo ${(e * ciclo/1000).toFixed(3) }s`),
        console.error,
        () => console.log("Concluído")
    );
    
    setTimeout(() => {
        console.time("#Comecando");
        intervalo = setInterval(
            () => subs.next(count++)
        ,ciclo);
    },inicio);

    setTimeout(
        () => {
                clearInterval(intervalo);
                subs.unsubscribe();
                console.timeEnd("#Comecando");
                console.timeEnd('#Rodando');
        },fim
    );
}

getSubs();