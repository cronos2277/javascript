const { app, BrowserWindow } = require('electron');

function callback(){    
    win = new BrowserWindow({width: 800, height: 600,  
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });
    win.on('closed', ()=>{win = null;});
    const paginaHtml = `file://${__dirname}/index.html`;
    win.loadURL(paginaHtml);
    win.webContents.openDevTools();
}

app.on('ready', callback);

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if(app == null){
        callback();
    }
});