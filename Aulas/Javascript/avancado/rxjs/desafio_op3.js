const {from, Observable} = require('rxjs');

function primeiro(){
    return function(source){
        return Observable.create(
            subs => {
                source.subscribe({
                    next(val){
                        subs.next(val);
                        subs.complete();
                    },
                    complete(){
                        subs.complete();
                    },
                    error(err){
                        subs.error(err);
                    }
                });
            }
        );
    }
}

function createPipeableOperator(callback){
    return function pipeable(source){ 
        return Observable.create(
            subs => {                
                source.subscribe({
                    next(val){
                        subs.next(
                            callback()(val)
                        )
                    },
                    complete(){
                        subs.complete();
                    },
                    error(err){
                        subs.error(err);
                    }
                });
            }
        );        
    }
}



from([1,2,3,4,5,6,7,8,9]).pipe(
   
).subscribe(
    console.log,
    console.error
);

