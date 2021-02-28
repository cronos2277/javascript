const electron = require('electron'), 
{app,BrowserWindow} = electron;

const directories = {
    main: `${__dirname}/app/main/`,
    renderer: `${__dirname}/app/renderer/`
}

let win;
const appUrl = `file://${directories.renderer}/index.html`;
function createWindowApp(){
    if(!win){
        win = new BrowserWindow(
            {
                width:800,
                height:600,
                autoHideMenuBar:true,
                webPreferences:{
                    nodeIntegration:true,
                    webSecurity:false,
                    enableRemoteModule: true
                }
            });
        //win.loadFile(appUrl)    
        win.loadURL(appUrl);
        win.on('closed', () => {
            win = null;
        });
        win.webContents.openDevTools();
    }
}

function startApp(){
    createWindowApp();
}

app.on('ready',startApp);
app.on('activate',() => {
    if(app == null){
        createWindowApp();
    }
});