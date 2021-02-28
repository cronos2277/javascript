const fs = require('fs'),
electron = require('electron'),
{remote,ipcRenderer,desktopCapturer } = electron,
{BrowserWindow} = remote,
fileManager = require('./fileManager'),
fileManagerTemplate = require('./fileManagerTemplate');

var localMediaStream = null;
var cameraWindow = null;
var canvas = document.createElement('canvas');
var video = null;
var ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

var Camera = {
    open(){
        if(!cameraWindow){
            cameraWindow = new BrowserWindow(
                {
                    width:660,
                    height: 540,
                    resizable:false,
                    alwaysOnTop:true,
                    frame:false,
                    transparent:true,
                    webPreferences:{
                        nodeIntegration:true,
                        webSecurity:false,
                        enableRemoteModule: true
                    }
                }
            );
            cameraWindow.loadURL(`${__dirname}/../camera.html`);
            cameraWindow.on('closed',() => {
                cameraWindow = null;
            });  
            //cameraWindow.webContents.openDevTools();          
        }
    },
    close(){
        remote.getCurrentWindow().close();
    },
    start(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            video = document.querySelector('#camera-video');
            navigator.mediaDevices.getUserMedia({video:true,audio:false})
            .then(function(stream){
                localMediaStream = stream;
                try{
                    video.srcObject = stream;
                }catch{
                    video.src = window.URL.createObjectURL(stream);
                }
                video.play();
            });
        }
    },
    snapshot(videoSource = video){
        if(videoSource.src || videoSource.srcObject){
            ctx.drawImage(videoSource,0,0);
            var img = canvas.toDataURL('image/png');
            Camera.saveFile(img);
        }
    },
    screenshot(){
        desktopCapturer.getSources({types:['screen']},(error,sources) =>{
            navigator.webkitGetUserMedia({
                video:{
                    mandatory:{
                        chromeMediaSource:'desktop',
                        chromeMediaSourceId:sources[0].id,
                        minWidth:800,
                        maxWidth:1280,
                        minHeight:600,
                        maxHeight:720
                    }
                }
            },
            (stream) => {
                var videoElement = document.createElement('video');
                try{
                    videoElement.srcObject = stream;
                }catch{
                    videoElement.src = window.URL.createObjectURL(stream);
                }
                videoElement.play();
                setTimeout(()=>{
                    Camera.screenshot(videoElement);
                    stream.getTracks()[0].stop();
                },300);
            },
            (error) => {
                Camera.newFileNotification(null,'Erro ao capturar tela!')
                console.log(error)
            }
            )
        })
    },
    saveFile(img){
        var data = img.replace(/^data:image\/\w+;base64,/,"");
        var buf = new Buffer(data,'base64');
        var date = (new Date()).getTime();
        var filename = `${fileManager.folders.current}/${date}.png`;
        fs.writeFile(filename,buf, (err) => {
            if(!err){
                Camera.newFileNotification(filename,'Nova Imagem');
                console.log('ok')
            }else{
                console.log(err)
                Camera.newFileNotification(filename,'Erro: '+err.message);
            }
        })
    },
    newFileNotification(filePath, msg){
        var notification = new Notification('IMG Manager',{
            body:msg,
            icon:filePath
        });
        notification.onclick = () => {
            fileManagerTemplate.openFile(filePath);
        }
    }
}

module.exports = Camera;

ipcRenderer.on('screenshot',Camera.screenshot);