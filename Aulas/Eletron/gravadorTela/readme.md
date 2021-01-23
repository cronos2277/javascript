# Usando o Electron para gravar Tela
[Interface](index.html)

[main.js](main.js)

[recorder.js](recorder.js)

## Exibindo as telas de captura ao usuário

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

Esse objeto `desktopCapturer` vem de `const {desktopCapturer} = require('electron');`, [segue a documentação](https://www.electronjs.org/docs/api/desktop-capturer)

### desktopCapturer.getSources Argumentos:
Os agumentos abaixo devem ser passados dentro de um objeto, por exemplo: 

        desktopCapturer.getSources(
            {
                types:['window','screen']
            }
        );

>types String[] - Um array de Strings que lista os tipos de área de trabalho a serem capturadas, tipos disponíveis são screen e window, conforme ilustrado no exemplo acima, que usa os dois valores possíveis. Screen => todo o monitor, Window => captura uma janela.

>thumbnailSize Size (optional) - O tamanho para o qual a miniatura da fonte de mídia deve ser dimensionada.O padrão é 150 x 150. Defina a largura ou altura como 0 quando não precisar das miniaturas.Isso economizará o tempo de processamento necessário para capturar o conteúdo de cada janela e tela.

>fetchWindowIcons Boolean (optional) - Defina como true para ativar a busca de ícones da janela.O valor padrão é falso.Quando false, a propriedade appIcon das fontes retorna null.Mesmo se uma fonte tiver a tela de tipo.

### desktopCapturer.getSources retorno:
>Returns `Promise<DesktopCapturerSource[]>` - Resolve com uma matriz de objetos `DesktopCapturerSource`, cada `DesktopCapturerSource` representa uma tela ou uma janela individual que pode ser capturada. Ou seja isso é uma promise, devido a isso temos um .then()

    .then(
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

#### Argumento da promise
Como visto essa promise aceita um argumento como visto aqui `async sources`. No caso esse argumento é um array contendo uma lista de tudo o que foi capturado, devido a essa configuração `types:['window','screen']`, temos no meio dessa lista todos os monitores listados, assim como todos as janelas abertas, ambos compartilhando do mesmo array, dando um **console.log**  no argumento com o nome de `sources` temos:

    Array(5)
    0: {name: "Entire Screen", id: "screen:0:0", thumbnail: NativeImage, display_id: "2528732444", appIcon: null}
    1: {name: "Picture-in-picture", id: "window:330064:0", thumbnail: NativeImage, display_id: "", appIcon: null}
    2: {name: "Gravador de Tela", id: "window:198976:1", thumbnail: NativeImage, display_id: "", appIcon: null}
    3: {name: "recorder.js - Eletron - Visual Studio Code", id: "window:131172:0", thumbnail: NativeImage, display_id: "", appIcon: null}
    4: {name: "desktopCapturer | Electron - Brave", id: "window:67856:0", thumbnail: NativeImage, display_id: "", appIcon: null}
    length: 5
    __proto__: Array(0)

###### Atributos relevantes
*name* => o título da janela, sendo o entire Screen o monitor e tudo o que está sendo exibido no monitor.

*id* => Um identificador sendo: `"screen:0:0"` o monitor inteiro, esse padrão é para nomear monitores e esse padrão `"window:330064:0"` para janelas, você pode escolher, conforme explicado acima se você quer pegar apenas janelas de programas ou tudo que está sendo exibido no monitor, ou ambos, nesse caso ambos estão disponíveis.

Como se trata de um array todos os métodos de arrays são aplicáveis aqui, segue os métodos aplicáveis a esse argumento:
##### Array
    concat: ƒ concat()
    constructor: ƒ Array()
    copyWithin: ƒ copyWithin()
    entries: ƒ entries()
    every: ƒ every()
    fill: ƒ fill()
    filter: ƒ filter()
    find: ƒ find()
    findIndex: ƒ findIndex()
    flat: ƒ flat()
    flatMap: ƒ flatMap()
    forEach: ƒ forEach()
    includes: ƒ includes()
    indexOf: ƒ indexOf()
    join: ƒ join()
    keys: ƒ keys()
    lastIndexOf: ƒ lastIndexOf()
    length: 0
    map: ƒ map()
    pop: ƒ pop()
    push: ƒ push()
    reduce: ƒ reduce()
    reduceRight: ƒ reduceRight()
    reverse: ƒ reverse()
    shift: ƒ shift()
    slice: ƒ slice()
    some: ƒ some()
    sort: ƒ sort()
    splice: ƒ splice()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    unshift: ƒ unshift()
    values: ƒ values()
    Symbol(Symbol.iterator): ƒ values()
    Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}

#### Analisando cada elemento do Array
    Object
        appIcon: null
        display_id: "2528732444"
        id: "screen:0:0"
        name: "Entire Screen"
        thumbnail: NativeImage {

            addRepresentation: ƒ addRepresentation()
            crop: ƒ crop()
            getAspectRatio: ƒ getAspectRatio()
            getBitmap: ƒ getBitmap()
            getNativeHandle: ƒ getNativeHandle()
            getScaleFactors: ƒ getScaleFactors()
            getSize: ƒ getSize()
            isEmpty: ƒ isEmpty()
            isMacTemplateImage: (...)
            isTemplateImage: ƒ isTemplateImage()
            resize: ƒ resize()
            setTemplateImage: ƒ setTemplateImage()
            toBitmap: ƒ toBitmap()
            toDataURL: ƒ toDataURL()
            toJPEG: ƒ toJPEG()
            toPNG: ƒ toPNG()
            get isMacTemplateImage: ƒ ()
            set isMacTemplateImage: ƒ ()        

        }
        
###### Atributo
Dessa lista acima os mais relevantes são `name`, `id` e o `thumbnail` que tem os métodos úteis para que você possa exibir ao cliente os programas abertos e os monitores disponíveis para streamar. Dentro do `thumbnail` temos um método `thumbnail.toDataURL()`, esse **toDataURL** converte para a URL, permitindo que se crie uma referência a essa tela e através dessa referência você acessa a janela ou o monitor que você quer stremar, conforme visto aqui `<img src="${source.thumbnail.toDataURL()}" class="card-img-top"/>`, você pode usar esse retorno para associar ao *src* de uma tag *img*.

#### Jogando na Tag Video para o cliente ver
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

##### Essa função não é pura
Repare que `this.selectedSource` precisa estar setado e isso é feito aqui:

     async sources =>{
            let template = '';
            ScreenManager.sources = sources;
            sources.forEach(source => {   
                ...

No caso essa função recebe como argumento `sourceId` e com base nisso é recuperado todo o conteúdo da tela com base nesse id e esse é feito aqui `this.selectedSource = this.sources.find(source => source.id === sourceId);`, aonde é comparado o *sourceId* recebido como argumento com o *sourceId* da lista de janelas e monitores.

##### Quando essa função é chamada?
No caso essa função responde a esse trecho `onclick="ScreenManager.setScreen('${source.id}')"` que vem do:

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

### Observação
*A captura do conteúdo da tela requer o consentimento do usuário no macOS 10.15 Catalina ou superior, que pode ser detectado por `[systemPreferences.getMediaAccessStatus]`.*

## Mostrando ao usuário o que está sendo gravado
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
    ...

Se o `recorder` for nulo e se tiver uma fonte no `ScreenManager.selectedSource`, algo definido nessa linha de código `ScreenManager.sources = sources;`

#### navigator.getUserMedia
[Documentação](https://developer.mozilla.org/pt-BR/docs/Web/API/Navigator/getUserMedia), no caso essa função recebe três argumentos, o primeiro, um objeto contendo propriedades de audio e video, conforme ilustrado abaixo:
    
    {
        audio:false,
        video:
        {
            mandatory:{
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: ScreenManager.selectedSource.id,
                minWidth:800,
                maxWidth:1200,
                minHeight:600,
                maxHeight:720
            }
        }
    }

Sendo duas callbacks a primeira caso tenha sucesso `this.success` e a segunda se houver erro `this.error`, segue abaixo a callback de sucesso:

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

Caso o método `getUserMedia` tenha exito a função acima será chamada, no caso essa é a nova forma de você passar a URL do que foi gravado ao cliente `videoEl.srcObject = stream;` e a segunda que é a forma legada para versões do electron mais antigos `videoEl.src = URL.createObjectURL(stream);`, depois é dado um play `videoEl.play(); ` e executado, nesse ponto o usuário consegue assistir em tempo real o que é gravado pelo software de captura.

#### Gravando em arquivos
Nesse método abaixo é feito toda a lógica para o salvamento de arquivos.

    stop(){
        if(Rec.recorder.state !== null){
            Rec.recorder.onstop = function(){
                const videoEl = document.querySelector('video');
                videoEl.src = '';
                Rec.toArrayBuffer(
                    new Blob(Rec.blobs,{type:'video/webm'}),
                    function(arrayBuffer){
                        const buffer = Rec.toBuffer(arrayBuffer);
                        const fileName = 'file.webm';
                        const output = document.getElementById('output');
                        fs.writeFile(fileName,buffer,function(err){
                            if(err){
                                output.innerHTML = 'Error';
                                console.error(err);
                            }else{
                                output.innerHTML = 'Saved video: '+fileName;
                                const videoEl = document.querySelector('video');
                                videoEl.src = fileName;
                                videoEl.play();
                                videoEl.controls = true;
                            }
                        });
                    }
                );
                Rec.recorder = null;
            };
            Rec.recorder.stop();
        }
    },

Tem mais duas funções como `toArrayBuffer` e `toBuffer`, Sobre o Objeto *Blob* em javascript:

##### File System
> O módulo fs permite interagir com o sistema de arquivos de uma forma modelada nas funções POSIX padrão.
> Para usar este módulo:
> `const fs = require ('fs');`
> Todas as operações do sistema de arquivos têm formulários síncronos, de retorno de chamada e baseados em promessa.
[Documentação](https://nodejs.org/api/fs.html)
###### Blob
>Um objeto Blob representa um objeto do tipo arquivo, com  dados brutos imutáveis. Blobs representam dados que não estão necessariamente em um formato JavaScript nativo. A interface File é baseada no Blob, herdando funcionalidade blob e expandindo-o para suportar arquivos no sistema do usuário.

>Para construir um Blob a partir de outro objeto ou dado não-blob , utilize o construtor Blob(). Para criar um blob que contém um subconjunto de dados de outro blob, use o método slice(). Para obter um objeto Blob de um arquivo no sistema de arquivos do usuário, veja a documentação File. 

Mais informações, [documentação sobre objetos Blob](https://developer.mozilla.org/pt-BR/docs/Web/API/Blob)

##### toArrayBuffer

    toArrayBuffer(blob,callback){
        let fileReader = new FileReader();
        fileReader.onload = function(){
            let arrayBuffer = this.result;
            callback(arrayBuffer);
        }        
        fileReader.readAsArrayBuffer(blob);
    },

###### FileReader
>O objeto FileReader permite aplicações web ler assincronamente o conteúdo dos arquivos (ou buffers de dados puros) do computador do usuário, utilizando o objeto File ou Blob para especificar o arquivo ou os dados a serem lidos.
>Objetos File podem ser obtidos a partir de um objeto FileList retornado como resultado da seleção de um usuário utilizando um elemento <input>, a partir de uma operação de drag and drop DataTransfer, ou a partir de um mozGetAsFile() da api HTMLCanvasElement.

[Segue a documentação](https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader)
##### toBuffer

    toBuffer(arrayBuffer){
        let buffer = new Buffer(arrayBuffer.byteLength);
        let arr = new Uint8Array(arrayBuffer);
        for(let i=0;i<arr.byteLength;i++){
            buffer[i] = arr[i];
        }
        return buffer;
    }

##### Buffer

>O JavaScript puro é compatível com Unicode, mas não para dados binários.Ao lidar com fluxos TCP ou sistema de arquivos, é necessário lidar com fluxos de octetos.Node fornece classe Buffer que fornece instâncias para armazenar dados brutos semelhantes a uma matriz de inteiros, mas corresponde a uma alocação de memória bruta fora do heap V8. A classe de buffer é uma classe global que pode ser acessada em um aplicativo sem importar o módulo de buffer. Criando Buffers O Node Buffer pode ser construído de várias maneiras.
> Método 1: A seguir está a sintaxe para criar um Buffer não iniciado de 10 octetos - `var buf = new Buffer (10);`
> Método 2: A seguir está a sintaxe para criar um Buffer a partir de uma determinada matriz - `var buf = new Buffer ([10, 20, 30, 40, 50]);`
> Método 3: A seguir está a sintaxe para criar um Buffer a partir de uma determinada string e, opcionalmente, tipo de codificação - `var buf = new Buffer (" Simply Easy Learning "," utf-8 ");` Embora "utf8" seja a codificação padrão, você pode usar qualquer uma das seguintes codificações "ascii", "utf8", "utf16le", "ucs2", "base64" ou "hex".

[documentação](https://www.tutorialspoint.com/nodejs/nodejs_buffers.htm)

###### Uint8Array
A matriz digitada Uint8Array representa uma matriz de inteiros não assinados de 8 bits.O conteúdo é inicializado em 0. Depois de estabelecido, você pode fazer referência a elementos na matriz usando os métodos do objeto ou usando a sintaxe de índice de matriz padrão (ou seja, usando a notação de colchetes). [Documentação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)