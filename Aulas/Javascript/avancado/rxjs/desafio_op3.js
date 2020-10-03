const {from, Observable} = require('rxjs');

function createPipeableOperator(callback){
    return function(source){ 
        return Observable.create(
            subs => {   
                const sub = callback(subs);
                source.subscribe({
                    next:sub.next || (value => subs.next(value)),
                    error:sub.error || (error => subs.error(error)),
                    complete:sub.complete || (() => subs.complete())
                });       
                
            }
        );        
    }
}

function primeiro(){
    return createPipeableOperator(subscriber => ({
        next(valor){
            subscriber.next(valor);
            subscriber.complete();
        }
    }));
}

function ultimo(){
    let dado;
    return createPipeableOperator(subscriber => (        
        {        
            next(valor){
                dado = valor;
            },
            complete(){
                subscriber.next(dado);
            }
        }
    ));
}

function nenhum(){
    return createPipeableOperator(subscriber => (
        {
            next(valor){
                subscriber.complete();
            }
        }
        ));
}

function subsObservable(dados,operador){
    from(dados).pipe(
        operador()
    ).subscribe(
        console.log,
        console.error
    );
}


subsObservable([1,2,3,4,5],primeiro);
subsObservable([1,2,3,4,5],nenhum); //Sera ignorado, nao ira gerar dado
subsObservable([1,2,3,4,5],ultimo);

