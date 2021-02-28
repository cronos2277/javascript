const electron = require('electron'), 
{app,BrowserWindow,Menu,Tray} = electron;

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
        //win.webContents.openDevTools();
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