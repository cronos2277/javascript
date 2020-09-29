function Observavel(){
    return {
        iniciar(callback, tempo = 1000){
            let num = 0;
            const intervalo = setInterval(
                _ => callback(num++),
                tempo
            );
            return{
                parar(){
                    clearInterval(intervalo);
                }
            };
        },        
    }
}

const observavel = Observavel();
const inscricao = observavel.iniciar(console.log,500);

setTimeout(
    _ => inscricao.parar(),
    10000
);


