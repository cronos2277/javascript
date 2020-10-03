const {of, Observable } = require('rxjs');

function terminadoCom(parteFinal){
    return function(source){
        return Observable.create(
            subs => {
                source.subscribe(
                    {
                        next(value){
                            if(value.endsWith(parteFinal)){
                                subs.next(value);
                            }
                        }
                    }
                );
            }
        );
    }
}

of('Ana Silva', 'Maria Silva', 'Pedro Rocha')
.pipe(terminadoCom('Silva'))
.subscribe(console.log);