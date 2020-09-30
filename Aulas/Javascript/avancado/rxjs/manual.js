const {Observable} = require("rxjs");

const observable1 = new Observable(
    subject => {
        subject.next("Acao 11");
        subject.next("Acao 12");
        subject.next("Acao 13");
        if(Math.random() > 0.5){
            subject.complete();
        }else{
            subject.error("Erro Controlado 1.");
        }
    }
);

observable1.subscribe(
    console.log,
    console.error,
    () => console.warn("Concluido com sucesso 1!")
);

//Forma alternativa de se trabalhar com Observable

const observable2 = Observable.create(
    subject => {
        subject.next("Acao 21");
        subject.next("Acao 22");
        subject.next("Acao 23");
        if(Math.random() > 0.5){
            subject.complete();
        }else{
            subject.error("Erro Controlado 2.");
        }
    }
);

observable2.subscribe({
    next(valor){
        console.log(valor)
    },
    error(erro){
        console.error(erro)
    },
    complete(){
        console.warn("Concluido com sucesso 2!")
    }
})