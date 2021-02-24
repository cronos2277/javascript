const {app, BrowserWindow,nativeImage,clipboard,shell} = require('electron');

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
        let image1 = nativeImage.createFromPath(file);        
        console.log('Imagem 1\n',
            {
                'Tamanho':image1.getSize(),
                'Aspect Ratio':image1.getAspectRatio(),
                'Scale Factors':image1.getScaleFactors()
            }
        );
        let image2 = nativeImage.createFromDataURL(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`);   
        console.log('Imagem 2\n',
            {
                'Tamanho':image2.getSize(),
                'Aspect Ratio':image2.getAspectRatio(),
                'Scale Factors':image2.getScaleFactors()
            }
        );
    }catch(e){
        console.log(e.message);
    }    
    
    console.log(`
        Texto no clipboard: ${clipboard.readText()}\n
        Imagem no clipboard:${clipboard.readImage()}\n
        read html:${clipboard.readHTML()}\n
    `);

    shell.openExternal('C:\\'); 
    shell.openExternal('https://github.com/cronos2277')
    shell.openPath('package.json')
});

