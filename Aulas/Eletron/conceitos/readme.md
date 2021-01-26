# Main e Render

## Lista
1. [Gestão de Energia](#gestão-de-energia)
## Arquivos
[index.js](index.js)

## Gestão de Energia
### powerMonitor e powerSaveBlocker

    powerMonitor.on('resume', () => callback('Evento ao desbloquear tela'));
    powerMonitor.on('on-ac', () => callback('Dispositivo na tomada'));
    powerMonitor.on('on-battery', () => callback('Dispositivo na bateria'));

Você pode executar callbacks, quando determinados eventos do sistema operacional, como quando voltar de uma suspensão ou hibernação `resume`, quando o dispositivo é plugado na tomada `on-ac` ou quando é desplugado da tomada e alimentado na bateria `on-battery`, inclusive também gerencia eventos de desligamento `shutdown`, dentre outros... Para isso você pode usar o método `on` do objeto singleton `powerMonitor`. [Documentação](https://www.electronjs.org/docs/api/power-monitor).

#### argumentos de powerMonitor.on
O primeiro argumento é uma string informando qual evento será monitorado e o segundo a callback a ser disparada, lembrando que se a callback tiver um argumento, será passado como argumento o gatilho. Esse método deve estar dentro da callback que responde ao evento *ready* para funcionar.

#### callback de app.on('ready')

        app.on('ready',function(e){
            const win = new BrowserWindow({
                center:true,                
                backgroundColor:'yellow',
                //fullscreen:true,
                width:800,
                height:600,           
            });

            win.loadURL(`file://${__dirname}/main.html`);          
            
            powerMonitor.on('resume', () => callback('Evento ao desbloquear tela'));
            powerMonitor.on('on-ac', () => callback('Dispositivo na tomada'));
            powerMonitor.on('on-battery', () => callback('Dispositivo na bateria'));

            powerMonitor.on('suspend', () => {
                callback('Evento ao bloquear tela')

                let block_suspension = powerSaveBlocker.start('prevent-app-suspension');
                let block_display = powerSaveBlocker.start('prevent-display-sleep');

                let interval = setInterval(function(){
                    callback('bloqueio ativado')
                },500,4500);    

                setTimeout(function(){
                    callback('Liberando do bloqueio');
                    if(powerSaveBlocker.isStarted(block_suspension)){
                        powerSaveBlocker.stop(block_suspension);
                    }
            
                    if(powerSaveBlocker.isStarted(block_display)){
                        powerSaveBlocker.stop(block_display)
                    }
            
                    clearInterval(interval);
                },5000);
            });            
        })

#### Usando o powerSaveBlocker
Esse Objeto singleton ajuda a proteger processos de uma eventual suspensão ou desligamento de tela, geralmente o sistema operacional simplesmente o processo, com esse objeto você pode tomar alguma providencia de modo que o processo seja devidamente encerrado, isso é interessante caso a aplicação esteja fazendo um download ou algo que exija algum tempo por exemplo. Esse objeto tem três métodos. [Documentação](https://www.electronjs.org/docs/api/power-save-blocker)

##### método start

    let block_suspension = powerSaveBlocker.start('prevent-app-suspension');
    let block_display = powerSaveBlocker.start('prevent-display-sleep');

O método start recebe como parametro uma string informando qual evento ele deve travar temporariamente, no primeiro caso ele trava a suspensão, permitindo que seja executado determinados processos para agir caso isso ocorra e o segundo o desligamento de tela, esse método retorna um id e é com base nesse id que é liberado a trava, logo esse token deve estar registrado em alguma variável, se tudo ocorrer bem ao suspender ocorreia algo do tipo:

    Evento ao bloquear tela
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    bloqueio ativado
    Liberando do bloqueio
    Evento ao desbloquear tela

##### Método isStarted
Esse método verifica se o bloqueio está sendo executado com base no `id`, que é justamento o valor que o método `start` retorna. Se o bloqueio estiver ocorrendo, o mesmo retorna true, segue um exemplo:

    if(powerSaveBlocker.isStarted(block_suspension)){
        powerSaveBlocker.stop(block_suspension);
    }
            
    if(powerSaveBlocker.isStarted(block_display)){
        powerSaveBlocker.stop(block_display)
    }

##### Método stop
O método stop termina o bloqueio, ou seja é através desse método você encerra o bloqueio, esse método aceita como parametro o *id* que o método `start` gerou. Exemplo:

    let block_suspension = powerSaveBlocker.start('prevent-app-suspension');
    powerSaveBlocker.stop(block_suspension);
    
    let block_display = powerSaveBlocker.start('prevent-display-sleep');
    powerSaveBlocker.stop(block_display)