const {app,BrowserWindow,dialog} = require('electron');

app.on('ready', function(){
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
            autoHideMenuBar:true,       
            webPreferences:{
                webviewTag:true, //Precisa estar como true para funcionar o webwiew
                nodeIntegration: true,
                nodeIntegrationInWorker: true
            }                 
        }
    );     
        
    dialog.showOpenDialog(        
            janela,
            {
                title:'Abrir Janela',
                buttonLabel:"Abra",
                defaultPath:'/'
            }        
    );

    dialog.showSaveDialog(
        janela,
        {
            title:'Salvar Janela',
            buttonLabel:"Salve",
            defaultPath:'/'
        }
    );

    dialog.showMessageBox(
        janela,
        {
            type:'question',
            buttons:['Certo','cancelar'],
            title:'Pegunta',
            message:'Exemplo de mensagem a ser informado!'
        }
    );
    
    dialog.showErrorBox('Titulo','exemplo de mensagem de erro');

    app.on('closed', () => janela = null);    
    janela.loadURL(`file://${__dirname}/index.html`);   
    let child = new BrowserWindow({
        width:400,
        heigth:300,
        frame:false,
        transparent:true,
        parent:janela        
    });
    child.loadURL(`file://${__dirname}/child.html`);    
    
});

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