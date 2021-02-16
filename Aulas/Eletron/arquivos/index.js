const {app, BrowserWindow,NativeImage} = require('electron');

app.on('ready',function(){
    
    const win = new BrowserWindow({
        width:1024,
        height:768,    
        center:true, 
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }   
    });    
    
    win.loadFile(`${__dirname}/main.html`);
    win.webContents.openDevTools();
    try{
        const file = `${__dirname}/ex1.png`;
        console.log(file);
        let image1 = NativeImage.createFromPath(file);        
    }catch(e){
        console.log(e.message);
    }    
});

