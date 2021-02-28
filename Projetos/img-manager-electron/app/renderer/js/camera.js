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
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }
    },
    snapshot(videoSource = video){

    },
    saveFile(){

    }
}

module.exports = Camera;