const {app,BrowserWindow} = require('electron');
app.on('ready',function(){
    const win = new BrowserWindow(
        {
            weight:800,
            height:600,
            autoHideMenuBar:true,
            webPreferences:{
                webviewTag:true,
                nodeIntegration: true,
                nodeIntegrationInWorker: true
            }        
        }
    );
    const paginaHtml = `file://${__dirname}/index.html`;
    win.loadURL(paginaHtml);
   //win.webContents.openDevTools();
});