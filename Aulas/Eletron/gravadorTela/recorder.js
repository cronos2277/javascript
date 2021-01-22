const {desktopCapturer} = require('electron');
const fs = require('fs');


let outputEl = document.querySelector('#output');


const Rec = {

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
        let videoEl = document.querySelector('video');
        this.selectedSource = this.sources.find(source => source.id === sourceId);
        videoEl.poster = this.selectedSource.thumbnail.toDataURL();
        videoEl.src = '';
        videoEl.controls = false;
        videoEl.style.width = "100vw";
        videoEl.style.height = "100vh";
        console.log(videoEl);
    }
}

ScreenManager.listScreens();