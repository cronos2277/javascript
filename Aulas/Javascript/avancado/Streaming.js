function streaming(array){
    return{
        iniciar(fn,tempo = 500,comecarPor = 0){
            const intervalo = setInterval(
                () => {
                    if(array.length > comecarPor){
                        fn(array[comecarPor++]),
                        tempo
                    }else{
                        clearInterval(intervalo);
                    }
                },tempo                
            )            
        }        
    }
}

streaming([0,1,2,3,4,5,6,7,8,9,10]).iniciar(e => console.log(`${e}² = ${e*e}`));