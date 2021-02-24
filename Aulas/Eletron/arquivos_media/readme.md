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

## Clipboard
    console.log(`
        Texto no clipboard: ${clipboard.readText()}\n
        Imagem no clipboard:${clipboard.readImage()}\n
        read html:${clipboard.readHTML()}\n
    `);

### Importando
    const {clipboard} = require('electron');
### Métodos
[Documentação sobre clipboard](https://www.electronjs.org/docs/api/clipboard) Com o objeto *clipboard* você pode pegar qualquer item da áre de transferência, cuidado ao usar isso, pois o acesso é feito acessando diretamente a memória, pegando os valores que estão lá, sendo interessante caso você queira habilitar o *CTRL+C* e *CTRL+V* para o usuário final, podendo através dos métodos destinguir tags html, imagem e texto na área de transferência.

`readText()` => **Retorna uma String com o conteúdo da Área de Transferência em formato texto.**

`writeText(text)` => **Insere uma String na Área de Transferência em formato texto.**

`readHTML()` => **Retorna uma String com o conteúdo da Área de Transferência em formato de marcação.**

`writeHTML(markup)` => **Insere uma String na Área de Transferência em formato de marcação.**

`readImage()` => **Retorna uma nativeImage com o conteúdo da Área de Transferência.**

`writeImage(image)` => **Insere uma imagem na Área de Transferência.**

`clear()` => **Limpa todo o conteúdo da Área de Transferência.**

`write(data)` => **Insere os dados na Área de Transferência.**

## Terminal
[Documentação sobre shell](https://www.electronjs.org/docs/api/shell) com o objeto *shell* você pode enviar comandos a o *navegador*, ou ao *explorer* ou até mesmo abrir um arquivo. Pode ser útil caso você queira abrir um arquivo externo, o método *openExternal* é util tanto para abrir um diretório no explorer, assim como uma página no navegador, útil se você quiser enviar o cliente para um diretório ou para alguma ajuda online ou página de suporte, no caso o método verifica a *string* e abre de acordo com o protocolo, no caso se é pagina da web abre com o navegador ou se é diretório abre com algum gerenciador de arquivo. Lembre-se que no windows você precisa usar duas `\\` quando for informar diretório, uma vez que o javascript pode entender como uma expressão, e o mesmo exige que o diretório informado seja absoluto. Também tem o openPath para diretórios relativos.
###### Exemplo
    shell.openExternal('C:\\'); 
    shell.openExternal('https://github.com/cronos2277')
    shell.openPath('package.json')
###### Importando
    const {shell} = require('electron');
### Lista de métodos
`showItemInFolder(fullPath)` => **Exibe o arquivo em um gerenciador de arquivos. Se possível, seleciona o arquivo.**

`openItem(fullPath)` => **Abre um arquivo.**

`openExternal(url)` => **Abre a URL passada de acordo com o protocolo passado.**

`moveItemToTrash(fullPath)` => **Move o arquivo passado para a lixeira.**

`beep()` => **Toca um som de beep.**