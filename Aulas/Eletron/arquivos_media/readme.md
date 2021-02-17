# Arquivos
## Renderer

###### Código
    <body>
        <div id="box">
            <h1>Arraste o seu arquivo aqui</h1>
        </div>
        <script>
            const box = document.getElementById('box') || null;
            box.ondragover = () => {return false};
            box.ondragleave = () => {return false};
            box.ondragend = () => {return false};
            box.ondrop = event => {
                event.preventDefault();
                const arrayFiles = Array.from(event.dataTransfer.files);
                arrayFiles.forEach(console.log);
            }
        </script>
    </body>

###### Explicando
Você pode habilitar o arrasto de arquivos para dentro de uma div, conforme o ilustrado acima.

## Native Image
[Documentação](https://www.electronjs.org/docs/api/native-image#m%C3%A9todos-de-inst%C3%A2ncia)

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

Também é possível processar imagens pelo main de uma aplicação *Electron*. Seja carregando uma imagem no disco `let image1 = nativeImage.createFromPath(file);`, ou criando uma usando [DataURL]() conforme visto aqui ``nativeImage.createFromDataURL(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`);``, que cria uma imagem, nesse caso um ponto *5x5* pixels. Para usar-lo deve importar de *Electron* `const {nativeImage} = require('electron');` e lembre-se o  **n** deve ser minusculo, ou seja `nativeImage`.

## Pegando Imagem da webcam
[Documentação](https://developer.mozilla.org/pt-BR/docs/Web/API/MediaDevices)
###### HTML
    <video id="video" width="100%" height="100%" autoplay></video>

###### Javascript

    const video = document.getElementById('video');
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {                            
                video.srcObject = stream;                
                video.play();
            });
        }

Se houver alguma webcam plugada no computador, o código acima irá ligar e exibir dentro da tag com a div `video`. No caso a camera é ligada sem pedir qualquer autorização, no caso qualquer coisa que o navegador precise pedir autorização, com o *Eletron*, isso não se faz necessário.