const {Observable} = require('rxjs');
const entre = (min,max) => new Observable(
    subscription => {
        try{
            if(min > max)[min,max] = [max,min];
            const random = () => parseInt(Math.random() * (max - min) + min);
            subscription.next(random());   
            subscription.next(random());   
            subscription.next(random());   
            subscription.next(random());   
            subscription.next(random());
            subscription.complete();   
        }catch(erro){
            subscription.error(erro);
        }
    }    
);

entre(4,10).subscribe(
    num => console.log(`num = ${num}`),
    console.error,
    () => console.log("Conluido")
);