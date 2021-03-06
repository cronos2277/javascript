const electron = require('electron'), 
{app,BrowserWindow,Menu,Tray, ipcMain, globalShortcut} = electron;

const directories = {
    main: `${__dirname}/app/main/`,
    renderer: `${__dirname}/app/renderer/`
}

let win, tray;
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
        win.loadURL(appUrl);
        win.on('closed', () => {
            win = null;
        });
        globalShortcut.register('CmdOrCtrl+P',() => {
            if(win){
                win.send('screenshot');
            }
        });
        
    }
}

function startApp(){
    createWindowApp();
    tray = new Tray(`${__dirname}/app/assets/img/main_icon.png`);
    const contextMenu = Menu.buildFromTemplate(
        [
            {
                label:'Abrir', click:createWindowApp
            },
            {
                label:'Sair',
                click: () => {app.quit()}
            }
        ]
    );
    tray.setToolTip('IMG Manager');
    tray.setContextMenu(contextMenu);
}

app.on('ready',startApp);
app.on('activate',() => {
    if(app == null){
        createWindowApp();
    }
});

app.on('window-all-closed',() => {

});

ipcMain.on('updateFilesList',() => {
    win.send('updateFilesList')
});

ipcMain.on('saveFile', (event,file) => {
    win.send('saveFile',file);
});