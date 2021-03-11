# Stream
[Stream1.js](stream1.js)

[Stream2.js](stream2.js)

[Stream3.js](stream3.js)
## Estrutura
    const port = 4004;
    const host = 'http://localhost';
    const filepath = 'video.mp4';
    const http = require('http');
    const path = require('path');
    const fs = require('fs');
    http.createServer(
        function(request,response){
            if(request.url !== `/${filepath}`){
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(`<video src="${host}:${port}/${filepath}" width='50%'  controls></video>`);
            }else{
                //logica aqui
            }
        }
    ).listen(port);

### Explicando a estrutura
Essa estrutura acima é a básica para o carregamento de vídeo, *port* é a porta tcp, *host* o ip, *filepath* o caminho do vídeo, no caso você pode apenas colocar um vídeo chamado *video.mp4* na pasta ou alterar isso, o vídeo testado aqui não vai ser colocado no *github* e será adicionado ao *gitignore*. Aqui é importado o módulo *HTTP* `const http = require('http');`, módulo *PATH*, melhor explicado [aqui](#Path), `const path = require('path');` e o módulo para abrir arquivos `const fs = require('fs');`.

## PATH