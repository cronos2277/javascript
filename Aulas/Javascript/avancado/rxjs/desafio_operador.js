const {from, Observable} = require('rxjs');

//Criando um operador que pegue o ultimo elemento de um Observable
function ultimo(){
    return function(source){
        return Observable.create(
            subscriber => {
                let valor_ultimo;
                source.subscribe(
                    {
                        next(value){                             
                            valor_ultimo = value;
                        },

                        complete(){
                            if(valor_ultimo !== undefined){
                                subscriber.next(valor_ultimo)
                            }
                            subscriber.complete();
                        }
                    }
                )
            }
        )
    }
}

from([1,2,3,4,5])
.pipe(
    ultimo()
    )
.subscribe(
    console.log,
    console.error,
    () => console.log("Concluído!")
    );