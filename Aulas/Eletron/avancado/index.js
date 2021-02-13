const {app, BrowserWindow, Notification} = require('electron');
var win;
app.on('ready',function(){

    win = new BrowserWindow({
        width:800,
        height:600,    
        center:true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }     
    }); 
    
    const notification = {
        title: 'Basic Notification',
        body: 'Notification from the Main process'
    }
    new Notification(notification).show()
    
});