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
[PathEx.js](pathEx.js)

Monta o Path de acordo com o sistema operacional. `__dirname` retorna o diretório absoluto corrente de acordo com o sistema operacional, assim como o `__filename` retorna o caminho absoluto do arquivo, ao qual está executando o atual código.

###### Exemplo
    const path = require('path');
    const paths = {
        resolve: path.resolve(__dirname,__filename),
        basename: path.basename(__filename,'.js'),
        dirname: path.dirname(__filename),
        extname: path.extname(__filename),
        isAbsolute:path.isAbsolute(`${__dirname}/${__filename}`),    
        sep: path.sep,
        delimiter:path.delimiter,
    }

    console.log(`Windows: ${path.win32.resolve(__dirname,__filename)}`);
    console.log(`Posix: ${path.posix.resolve(__dirname,__filename)}`);

    //Resolvendo Path em sistemas Unix
    console.log('\n');
    let linuxPaths = `./stream1.js:./stream2.js:./stream3.js`;
    linuxPaths = linuxPaths.split(path.posix.delimiter);
    linuxPaths[0] = path.normalize(linuxPaths[0]);
    linuxPaths[1] = path.normalize(linuxPaths[1]);
    linuxPaths[2] = path.normalize(linuxPaths[2]);
    console.log(linuxPaths);

    //Resolvendo Path no windows
    console.log('\n');
    let winPaths = `/;${__dirname}/../../;${__filename}/../`;
    winPaths = winPaths.split(path.win32.delimiter)
    winPaths[0] = path.normalize(winPaths[0]);
    winPaths[1] = path.normalize(winPaths[1]);
    winPaths[2] = path.normalize(winPaths[2]);
    console.log(winPaths);
    console.log('\n');
    console.log(paths);


### Usando
    const path = require('path');

Dessa forma importamos o *PATH* para uso, não precisa instalar nada, pois se trata de uma biblioteca padrão do *nodejs*.
### Resolve

    path.resolve(__dirname,__filename),

O método resolve monta o caminho absoluto até o arquivo. No primeiro parametro você informa o diretório aonde o arquivo está e o segundo o arquivo e extensão ao qual você pretende abrir.
### Basename

    path.basename(__filename,'.js')

Esse método aplica uma mascara ao path informado, no caso é tirado o `.js` do *path*.

### dirname
    path.basename(__filename,'.js')

Informa o caminho absoluto do arquivo informado.

### Atributo SEP
    path.sep

Aqui informa qual é o separador de diretórios usado, pode ser `/` ou `\` dependendo do sistema operacional.

### extname
    path.extname(__filename)

Informa a extensão do arquivo.

### isAbsolute
    path.isAbsolute(`${__dirname}/${__filename}`)

Informa se o path informado é absoluto `true` ou `false` se for relativo.

### Criando PATH exclusivo para windows ou unix
#### path.win32.[metodo do path]()
    path.win32.resolve(__dirname,__filename)

Aqui retorna um *path* válido no windows, se executado no linux por exemplo, teríamos algo como: `\home\cronos2277\GitHub\javascript\Aulas\NodeJS\stream\pathEx.js`, ou seja se usado com o atributo win32 todo o *Path* é convertido para o padrão windows.

### path.posix.[metodo do path]()
    path.posix.resolve(__dirname,__filename)

Aqui retorna um *path* válido em sistemas unix, que seria algo como `/home/cronos2277/GitHub/javascript/Aulas/NodeJS/stream/pathEx.js`, ou seja usando a barra padrão do linux.

### Delimitadores
Existe três formas de lidar com delimitadores: 

    `path.win32.delimiter` => pega delimitadores do windows, no caso o `;`.

    `path.posix.delimiter` => pega delimitadores do unix, no caso o `:`

    `path.delimiter` => pega o delimitador com base no sistema operacional que está rodando, por exemplo `;` para windows e `:` para unix.

Um delimitador é interessante para usar em funções como split ou join, por exemplo, como em um dos exemplos abaixo:

    let linuxPaths = `./stream1.js:./stream2.js:./stream3.js`;
    linuxPaths = linuxPaths.split(path.posix.delimiter);

ou

    let winPaths = `/;${__dirname}/../../;${__filename}/../`;
    winPaths = winPaths.split(path.win32.delimiter)

Ou seja se você for pegar diretórios com base no PATH do sistema, essa solução acima pode ser interessante, colocando como cada elemento do array as PATHS do sistemas.

### Normalize
Esse método resolve diretórios quando se encontra pontos e barras, por exemplo

    let winPaths = `/;${__dirname}/../../;${__filename}/../`;
    winPaths = winPaths.split(path.win32.delimiter)
    winPaths[0] = path.normalize(winPaths[0]);
    winPaths[1] = path.normalize(winPaths[1]);
    winPaths[2] = path.normalize(winPaths[2]);

`/` **vira** `/`.

`${__dirname}/../../;` **vira** `/home/cronos2277/GitHub/javascript/Aulas/`.

`${__filename}/../` **vira** `/home/cronos2277/GitHub/javascript/Aulas/NodeJS/stream/`.

#### Observação
**Lembrando que esses arquivos estão no diretório `/home/cronos2277/GitHub/javascript/Aulas/NodeJS/stream/`. E lembre-se que os pontos e barras devem estar após o path e não antes, ou seja, isso é resolvido `${__dirname}/../../;` já isso não `/../../${__dirname};`, fique atento a esses detalhes.**

#### Outro exemplo
###### Código
    let linuxPaths = `./stream1.js:./stream2.js:./stream3.js`;
    linuxPaths = linuxPaths.split(path.posix.delimiter);
    linuxPaths[0] = path.normalize(linuxPaths[0]);
    linuxPaths[1] = path.normalize(linuxPaths[1]);
    linuxPaths[2] = path.normalize(linuxPaths[2]);

###### Output
    [ 'stream1.js', 'stream2.js', 'stream3.js' ]
