const {BrowserWindow,app} = require('electron');
app.on('ready',function(){
    const window = new BrowserWindow({
        width:800,
        height:600,
        center:true,
        autoHideMenuBar:true
    });
    window.loadURL(`https://github.com/cronos2277`);        
    window.webContents.session.on('will-download',callbackDownload);
});

function callbackDownload(event,item,webContents){
    console.log('primeiro argumento');
    console.log(event);
    console.log('segundo argumento')
    console.log(item)
    console.log('terceiro argumento');
    console.log(webContents);
    item.setSavePath(__dirname+'/'+item.getFilename());

    item.on('updated',updated_cb)
    function updated_cb(event,state){
        (state === 'progressing' && !item.isPaused()) && console.log(`Received bytes: ${item.getReceivedBytes()}`);
    }    

    item.on('done',done_cb)
    function done_cb(event,state){
        (state === 'completed') && console.log('Finish!');
    }
}