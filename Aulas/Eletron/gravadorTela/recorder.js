const {desktopCapturer} = require('electron');
const fs = require('fs');


const Rec = {
    recorder: null,
    blobs: [],
    start(){
        if(this.recorder === null && ScreenManager.selectedSource){
            document.querySelector('#output').innerHTML = "Recording";
            navigator.getUserMedia({
                audio:false,
                video:{
                    mandatory:{
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: ScreenManager.selectedSource.id,
                        minWidth:800,
                        maxWidth:1200,
                        minHeight:600,
                        maxHeight:720
                    }
                }
            },this.success, this.error);
        }
    },
    success(stream){        
        const videoEl = document.querySelector('video');
        videoEl.poster = "";               
        try {
            videoEl.srcObject = stream;
        } catch (error) {
            videoEl.src = URL.createObjectURL(stream);
        }
        videoEl.play();        
    },
    error(msg){        
        console.error(msg);
    }
}

const ScreenManager = {
    sources: [],
    selectedSource: null,
    listScreens(){
        try{
            desktopCapturer.getSources({types:['window','screen']}).then(
                async sources =>{
                    let template = '';
                    ScreenManager.sources = sources;
                    sources.forEach(source => {                        
                        template += `
                        <div 
                            onclick="ScreenManager.setScreen('${source.id}')"
                            class="card"
                            >
                                <img src="${source.thumbnail.toDataURL()}" class="card-img-top"/>
                                <div class="card-body">
                                    <h3 class="card-title">${source.name}</h3>
                                </div>
                        </div>
                        `
                    });   
                    document.querySelector('.card-group').innerHTML = template;            
                }
            );
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    },
    setScreen(sourceId){
        const videoEl = document.querySelector('video');
        this.selectedSource = this.sources.find(source => source.id === sourceId);
        videoEl.poster = this.selectedSource.thumbnail.toDataURL();
        videoEl.src = '';
        videoEl.controls = false;
        videoEl.style.paddingLeft = "10vw";
        videoEl.style.paddingRight = "10vw"
        videoEl.style.width = "100vw";
        videoEl.style.height = "100vh";       
    }
}

ScreenManager.listScreens();