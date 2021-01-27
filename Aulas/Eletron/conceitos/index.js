const {BrowserWindow,app,powerSaveBlocker,powerMonitor} = require('electron');
const {ipcMain} = require('electron');

function callback(msg){
    console.log(msg);
}
app.on('ready',function(e){
    const win = new BrowserWindow({
        center:true,                
        backgroundColor:'yellow',
        //fullscreen:true,
        width:800,
        height:600,      
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }     
    });
    win.loadURL(`file://${__dirname}/main.html`);                
    //win.webContents.openDevTools();

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


ipcMain.on('evento_main1',function(arg1,arg2){    
    console.log('Evento Main 1 Disparado',arg1);
    console.log('Valor passado pelo emit: ',arg2);    
    arg1.sender.send('evento_render1', 'Enviando mensagem ao console da aplicacao');
});

ipcMain.once('desiscrever_main',function(arg1){
    ipcMain.removeAllListeners('evento_main1');
    arg1.sender.send('desiscrever_render');
});


