# Main e Render

## Lista
1. [Gestão de Energia](#gestão-de-energia)
2. [Comunicação Main e Render](#comunicação-entre-processos-main-e-render)
3. [Eventos](#Eventos-explicados)
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

## Comunicação entre processos Main e Render
O Main é a parte que faz a comunicação com o sistema operacional, o Render é  a parte que faz contato com o cliente. Graças ao IPC essas duas partes podem se comunicar, sendo o ipcMain o objeto que faz o caminho entre o Main e o render e o ipcRender que faz o caminho inverso, ambos tem uma estrutura muito semelhante, mas funcionam em lados diferentes da aplicação e ambos requerem que esteja habilitado a integração  com o node para funcionar `webPreferences:{nodeIntegration: true}`.
### ipcRenderer
#### HTML -> Render | Emitindo
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conceitos</title>
        <script>
            var { ipcRenderer } = require('electron');
            ipcRenderer.on('evento_render1', (arg1,arg2) => {console.log(arg1);console.log(arg2)});
        </script>
    </head>
    <body>
        <h1>Olá Mundo</h1>
        <hr>
        <button onclick="ipcRenderer.send('evento_main1',123)">Emitir no console do Eletron</button>
    </body>
    </html>

Inicialmente você deve chamar o objeto que vai emitir um evento para o main responder, no caso é esse `var { ipcRenderer } = require('electron');`, logo quando o cliente clica no botão **Emitir no console do Eletron** esse evento é impresso no console e isso de deve a função associada ao evento *onclick*, que no caso é esse `ipcRenderer.send('evento_main1',123)`, ou seja ao clicar no botão o método *send* do *ipcRenderer* envia uma notificação ao *listener* `'evento_main1'`, que está ouvindo no Main, que nesse caso é o arquivo [index.js](index.js). [Documentação](https://www.electronjs.org/docs/api/ipc-renderer). o *ipcRenderer* também pode ouvir eventos através do método `on` ou `once` sendo que o primeiro ativa o listener e o deixa ativado até que o mesmo seja solicitado para se desativar, ao passo que o `once` já desabilita após a execução, nesse caso o listener fica ouvindo sempre que recebe um evento emitido em `'evento_render1'`, conforme definido aqui `ipcRenderer.on('evento_render1', (arg1,arg2) => {console.log(arg1);console.log(arg2)});`, sendo o primeiro argumento o `EventEmitter` que disparou o evento e o segundo os argumentos passado ao usuário. Resumindo, nesse trecho estamos criando um listener `ipcRenderer.on('evento_render1', (arg1,arg2) => {console.log(arg1);console.log(arg2)});`, ao passo que nesse trecho criamos um emissor de evento `ipcRenderer.send('evento_main1',123)`, que no caso faz o caminho contrário ao listener do `on`, tendo assim uma comunicação de 2 vias entre o Render e o Main.
#### index.js -> Main | Escutando

    ipcMain.on('evento_main1',function(arg1,arg2){    
        console.log('Evento Main 1 Disparado',arg1);
        console.log('Valor passado pelo emit: ',arg2);
        arg1.sender.send('evento_render1', 'Enviando mensagem ao console da aplicacao');
    });

Nesse código acima temos o *listener*  do [render acima](#html---render--emitindo), quando o evento for disparado pelo clique do usuário, esse método `on` do `ipcMain` vai responder a emissão do evento e chamar a callback. É Valido ressaltar que que a callback passado para esse listener aceita argumentos, o primeiro argumento é um objeto ao qual contém uma função chamada *preventDefault* e um atributo chamado *sender* ao qual contém um [IPC Main](https://www.electronjs.org/docs/api/ipc-main). Porém esse método também emite um evento que será captado por `ipcRenderer.on('evento_render1', (arg1,arg2) => {console.log(arg1);console.log(arg2)});`, no caso a forma de emitir esse evento a lógica correspondente a isso é `arg1.sender.send('evento_render1', 'Enviando mensagem ao console da aplicacao');`, ou seja o primeiro argumento da callback é um `EventEmitter` ao qual contém o atributo `sender` e esse objeto tem um método `send()` que permite fazer a comunicação com o Render, enviando dois argumentos, o primeiro o próprio `EventEmiter` e o segundo o valor `'Enviando mensagem ao console da aplicacao'`.

#### Exemplo com Once e removeAllListeners
O método once funciona de maneira semelhante ao `on`, porém depois de executado ja é feito a remoção do listener.
##### ipcMain
    ipcMain.once('desiscrever_main',function(arg1){
        ipcMain.removeAllListeners('evento_main1');
        arg1.sender.send('desiscrever_render');
    });

esse método `removeAllListeners` ele remove todas as callbacks associadas a esse listener, no caso é possível adicionar mais de um listener ao evento e com esse método você pode remover todas as funções associadas a esse listener em uma tacada só, porem se for o caso você pode usar o método `.removeListener`, ao qual exige como argumento, sendo o primeiro o nome do listener e o segundo a callback a ser removida, logo nesse caso se faz necessário renomear uma função ou colocar ela dentro de uma variável, caso você queira remover uma função em específica do listener. [Documentação IPCMain remove listener](https://www.electronjs.org/docs/api/ipc-main#ipcmainremovelistenerchannel-listener), [IPCRender remove listener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener).

##### ipcRender
    ipcRenderer.once(
        'desiscrever_render',
        arg1 => {
            ipcRenderer.removeAllListeners('evento_render1');
            console.log('desiscrito')
        }
    );

###### onclick
    ipcRenderer.send('desiscrever_main');

#### Habilitando esse suporte no objeto BrowserWindow

    const win = new BrowserWindow({           
        webPreferences: {
            nodeIntegration: true
        }
    }); 

Porém para que tudo funcione apartir do eletron na versão 5, se faz necessário ativar o `nodeIntegration: true`, sendo que por padrão esse valor é falso.    

### Remote
Esse objeto permite com que você acesse recursos do `Main` no render, mas para isso o `enableRemoteModule` também precisa ser habilitado, assim como o `nodeIntegration` esse segundo para evitar maiores dores de cabeça. [Segue a documentação](https://www.electronjs.org/docs/api/remote)

    const win = new BrowserWindow({        
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }     
    });

Segue a estrutura do objeto remote:

    {
        createFunctionWithReturnValue: ƒ createFunctionWithReturnValue(e)
        getBuiltin: ƒ getBuiltin(e)
        getCurrentWebContents: ƒ getCurrentWebContents()
        getCurrentWindow: ƒ getCurrentWindow()
        getGlobal: ƒ getGlobal(e)
        require: e=> {…}
        BaseWindow: (...)
        BrowserView: (...)
        BrowserWindow: (...)
        ImageView: (...)
        Menu: (...)
        MenuItem: (...)
        MessageChannelMain: (...)
        Notification: (...)
        TouchBar: (...)
        Tray: (...)
        View: (...)
        WebContentsView: (...)
        app: (...)
        autoUpdater: (...)
        clipboard: (...)
        contentTracing: (...)
        crashReporter: (...)
        desktopCapturer: (...)
        dialog: (...)
        globalShortcut: (...)
        inAppPurchase: (...)
        ipcMain: (...)
        nativeImage: (...)
        nativeTheme: (...)
        net: (...)
        netLog: (...)
        powerMonitor: (...)
        powerSaveBlocker: (...)
        process: (...)
        protocol: (...)
        screen: (...)
        session: (...)
        shell: (...)
        systemPreferences: (...)
        webContents: (...)
        __esModule: true
        get BaseWindow: ()=>t.getBuiltin(e)
        get BrowserView: ()=>t.getBuiltin(e)
        get BrowserWindow: ()=>t.getBuiltin(e)
        get ImageView: ()=>t.getBuiltin(e)
        get Menu: ()=>t.getBuiltin(e)
        get MenuItem: ()=>t.getBuiltin(e)
        get MessageChannelMain: ()=>t.getBuiltin(e)
        get Notification: ()=>t.getBuiltin(e)
        get TouchBar: ()=>t.getBuiltin(e)
        get Tray: ()=>t.getBuiltin(e)
        get View: ()=>t.getBuiltin(e)
        get WebContentsView: ()=>t.getBuiltin(e)
        get app: ()=>t.getBuiltin(e)
        get autoUpdater: ()=>t.getBuiltin(e)
        get clipboard: ()=>t.getBuiltin(e)
        get contentTracing: ()=>t.getBuiltin(e)
        get crashReporter: ()=>t.getBuiltin(e)
        get desktopCapturer: ()=>t.getBuiltin(e)
        get dialog: ()=>t.getBuiltin(e)
        get globalShortcut: ()=>t.getBuiltin(e)
        get inAppPurchase: ()=>t.getBuiltin(e)
        get ipcMain: ()=>t.getBuiltin(e)
        get nativeImage: ()=>t.getBuiltin(e)
        get nativeTheme: ()=>t.getBuiltin(e)
        get net: ()=>t.getBuiltin(e)
        get netLog: ()=>t.getBuiltin(e)
        get powerMonitor: ()=>t.getBuiltin(e)
        get powerSaveBlocker: ()=>t.getBuiltin(e)
        get process: ()=>t.getGlobal("process")
        get protocol: ()=>t.getBuiltin(e)
        get screen: ()=>t.getBuiltin(e)
        get session: ()=>t.getBuiltin(e)
        get shell: ()=>t.getBuiltin(e)
        get systemPreferences: ()=>t.getBuiltin(e)
        get webContents: ()=>t.getBuiltin(e)
        getBuiltin: ƒ,
        getCurrentWindow: ƒ,
        getCurrentWebContents: ƒ,
        getGlobal: ƒ,
        createFunctionWithReturnValue: ƒ, 
    }

Como é possível perceber dentro do remote temos `BrowserWindow`, `dialog`, `ipcMain`, `desktopCapturer`, ou seja é perfeitamente possível ter acesso a um `Main` apartir do Render. Por exemplo, se quisermos usar o remote precisamos importar usando `const { remote } = require('electron');` e para instanciar `const janela = new remote.BrowserWindow`, ou seja você instancia como um objeto de remote, no caso o remote é um atributo que contém diversas classes do Main, como o `BroserWindow`.

#### Exemplo com o BrowserWindow

    const { remote } = require('electron');
        function getWin()
        {
            const janela = new remote.BrowserWindow(
                {
                    width:400,
                    height:300,
                    center:true
                }
            );
            console.log(remote);
            janela.loadURL('https://github.com/cronos2277');
        };

#### Botão para ativar a função
    <button onclick="getWin()">Abrir nova janela</button>

#### Explicando
Por fim se você quiser instanciar qualquer objeto do Main, você importa o `remote` e dentro do remove você pega a classe que precisa para chamar o o objeto apartir do Render.

## Eventos Explicados
Abaixo os principais eventos que podem ser disparados por usuários. [Documentação](https://www.electronjs.org/docs/api/app)
### Exemplo de código

    const {app} = require('electron');
    app.on('window-all-closed',function(){
        console.log("evento 'window-all-closed' disparado");
        if(process.platform !== 'darwin'){
            app.quit();
        }
    });

    app.on('before-quit', () => console.log("Evento 'before-quit' disparado."));
    app.on('will-quit', () => console.log("Evento 'will-quit' disparado."));
    app.on('quit', () => console.log("Evento 'quit' disparado."));
    app.on('browser-window-blur', () => console.log("Evento 'browser-window-blur' disparado."));
    app.on('browser-window-focus', () => console.log("Evento 'browser-window-focus' disparado."));
    app.on('browser-window-created', () => console.log("Evento 'browser-window-created' disparado."));

### Explicando códigos
`ready` *=>* **Executado quando o Electron finaliza a sua inicialização.**

`window-all-closed` *=>* **Emitido quando todas as janelas da aplicação forem fechadas.**

`before-quit` *=>* **Emitido antes da aplicação começar a fechar suas janelas.**

`will-quit` *=>* **Emitido quando todas as janelas foram fechadas e a aplicação será encerrada. Lembre-se de saber diferenciar janelas e a aplicação em si.**

`quit` *=>* **Emitido quando a aplicação está sendo encerrada.**

`browser-window-blur` *=>* **Emitido quando uma janela da aplicação perde o foco. A função executada recebe como primeiro parâmetro o evento e como segundo, a janela que perdeu foco.**

`browser-window-focus` *=>* **Emitido quando uma janela da aplicação ganha foco. A função executada recebe como primeiro parâmetro o evento e como segundo, a janela que ganhou foco.**

`browser-window-created` *=>* **Emitido quando uma nova janela, instância de browserWindow, é criada.**

### Métodos do objeto app

`app.quit()` => Fecha a janela.

`app.exit([Codigo numerico])` => Substituir `[Código numerico]` pelo número correspondente, também encerra a aplicação, mas informando um código de erro, ou sem informar código de erro se o valor passado for zero.

`relaunch()` => Reabre a aplicação quando a atual instância ainda existe. Esse método não faz a aplicação ser fechada, então você deve chamar “quit()” ou “exit()” após executá-lo.

`focus()` => Atraí o foco para essa janela.

#### HTML
    <button onclick="ipcRenderer.send('evento','quit()');">Função quit</button>
    <!-- Essa função exit abaixo vai disparar um erro, repare que no cosole vai aparecer: Exit status 1 -->
    <button onclick="ipcRenderer.send('evento','exit(1)');">Função exit</button>
    <button onclick="ipcRenderer.send('evento','relaunch()');">Função relauch</button>    
    <button onclick="ipcRenderer.send('evento','focus()');">Função focus</button>

#### Javascript
    ipcMain.on('evento',function(event,param){
        console.log(`evento ${param} ativado.`);    
        eval(`app.${param}`);        
    });

#### Explicando
No caso o botão dispara um evento e nesse evento passa a função que quer executar `ipcRenderer.send('evento','quit()');"`, do outro lado temos o *eval* que trata uma string passada como um código javascript e interpolando a string de modo que a função se torne um método de *app* a execução ocorre `eval(`app.${param}`);`, dessa forma todo argumento passado `param` é executado como um método de *app*. *Em ambientes de produção isso não é recomendado, devido a possibilidade de code injection.*