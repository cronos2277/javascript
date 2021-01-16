# Janela
## Objeto BrowserWindow
### Código
    let janela = new BrowserWindow(
        {
            minWidth:300,
            minHeight:'240',            
            width:800,
            heigth:600,
            maxWidth:'1024',
            maxHeight:'768',
            x:0,
            y:0,
            resizable:true,
            movable:true,
            minimizable:true,
            maximizable:true,
            closable: true,
            fullscreenable:true,
            focusable:true,
            alwaysOnTop:true,
            fullScreen:true,
            autoHideMenuBar:true
        }
    );
### Explicando os atributo
`width e height` **number** *Definem a largura e altura da janela.*

`x e y` **number** *Definem a posição da janela.*

`minWidth e minHeight` **number** *Definem a largura e altura mínima que o usuário pode redimensionar a janela.*

`maxWidth e maxHeight` **number** *Definem a largura e altura máxima que o usuário pode redimensionar a janela.*

`resizable` **boolean** *Indica se o usuário pode redimensionar a janela.*

`movable` **boolean** *Indica se o usuário pode mover a janela.*

`minimizable e maximizable` **boolean** *Indica se o usuário pode minimizar ou maximizar a janela.*

`closable` **boolean** *Indica se o usuário pode fechar a janela.*

`fullscreenable` **boolean** *Indica se o usuário pode deixar a aplicação em modo de tela cheia.*

`focusable` **boolean** *Indica se a janela pode receber foco.*

`alwaysOnTop` **boolean** *Indica quando a janela deve ficar sempre acima das demais.*

`fullScreen` **boolean** *Indica se a aplicação deve estar em tela cheia.*

`autoHideMenuBar` **boolean** *Indica se a barra de menu da aplicação deve ser ocultada automaticamente até o usuário pressionar a tecla “Alt”.*

### Criando uma Janela filha

    let child = new BrowserWindow({
        width:400,
        heigth:300,
        frame:false,
        transparent:true,
        parent:janela        
    });
    child.loadURL(`file://${__dirname}/child.html`);

Toda a janela filha tem um `parent` que no caso é uma outra janela, no caso [esse parent aqui](#código), ou seja quando a janela pai for fechada, essa será fechada. O atrobuto `frame = false` desabilita menus, e os botões de minimizar, maximinizar e fechar, além disso existe o atributo `transparent` como *true*, faz com que a janela fica transparente.

## app principais Eventos

    app.on('will-finish-launching', (arg) => {
        console.log('Evento: will-finish-launching');
        console.log(arg);    
    });

    app.on('window-all-closed', () => {
        console.log('Evento window-all-closed:');    
        app.quit();
    });

    app.on('browser-window-blur', () => console.log('Evento: browser-window-blur'));
    app.on('browser-window-focus',() => console.log('Evento: browser-window-focus'));
    app.on('browser-window-created', () => console.log('Evento: browser-window-created'));

### Evento: 'will-finish-launching'
>Emitido quando a aplicação termina inicialização básica. No Windows e Linux o evento will-finish-launching é o mesmo que o evento ready; no macOS, este evento representa a notificação applicationWillFinishLaunching de NSApplication. Você normalmente poderia escutar os eventos de open-file e open-url aqui e iniciar o crash reporter e auto atualização. Na maioria dos casos, você deve fazer tudo no manipulador do evento ready.

### Evento: 'window-all-closed'
>Emitido quando todas as janelas foram fechadas. Se você não escutar esse evento e todas as janelas forem fechadas, o comportamento padrão é fechar a aplicação. No entanto, se você estiver escutando, você controla se a aplicação fecha ou não. Se o usuário pressionou Cmd + Q ou o desenvolvedor chamou app.quit(), o Electron irá primeiro tentar fechar todas as janelas e então emitir o evento will-quit e neste caso, window-all-closed não será emitido.

### Evento: 'browser-window-blur'
>Emitido quando uma browserWindow é desfocada.

### Evento: 'browser-window-focus'
>Emitido quando browserWindow é focado.

### Evento: 'browser-window-created'
>Emitido quando um novo browserWindow é criado.

### Argumentos das callbacks
Todas as callbacks do `app.on` pode receber um argumento dentro dessa callback, esse argumento é um objeto que contém um atributo `sender` que contém o app que disparou o eventom além disso existe um outro atributo chamado `preventDefault` que inibe o comportamento padrão do *app*.

