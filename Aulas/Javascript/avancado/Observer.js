const readline = require('readline');

function evento(pergunta){
    const line = readline.createInterface(
        {
            input:process.stdin,
            output:process.stdout
        });
    return new Promise((resolver,rejeitar) => {
        try{
            line.question(pergunta, function resposta(digitado){
                resolver(digitado);
                line.close();
            });
        }catch(error){
            rejeitar(error);
        }
    });
}

const  observador1 = objeto => console.log("Observador 1", objeto);
const  observador2 = objeto => console.log("Observador 2", objeto);


async function inscricoes(pergunta,observadores){
    try{
        const resposta = await evento(pergunta);
        let continuar = true;              
        while(continuar){
            if(resposta.toLowerCase() === 's' || resposta.toLowerCase() === 'y'){
                (observadores || []).forEach(element => element ({resposta, data: Date.now()}));
                continuar = false;
                inscricoes(pergunta,observadores);                
            }else if(resposta.toLowerCase() === 'n'){
                continuar = false;
                inscricoes(pergunta,observadores);
            }else{
                continuar = false;
            }
        }       
    }catch(error){
        console.error(error);
    }
}

inscricoes("Voce deseja executar o evento? Respostas(S => Sim /N => Nao /X => Sair)",[observador1,observador2]);


