# Stream
[Stream1.js](stream1.js)

[Stream2.js](stream2.js)

[Stream3.js](stream3.js)

**OBSERVAÇÃO, VOCÊ PRECISA COLOCAR UM VÍDEO CHAMADO "video.mp4" NESSE DIRETÓRIO PARA QUE OS ARQUIVOS STREAM ACIMA FUNCIONEM.**
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

## Pegando Bytes
###### Request.range
    {
        host: 'localhost:4004',
        connection: 'keep-alive',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36',
        'accept-encoding': 'identity;q=1, *;q=0',
        accept: '*/*',
        'sec-gpc': '1',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-dest': 'video',
        referer: 'http://localhost:4004/',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        range: 'bytes=0-'
    }

### Sobre o atributo Range
#### Descrição
>O cabeçalho de requisição HTTP Range indica a parte do documento que o servidor deve retornar. Várias partes podem ser requisitadas com um cabeçalho Range de uma vez, e o servidor pode mandar de volta estes intervalos em um documento de múltiplas partes. Se o servidor manda de volta os intervalos, ele usa o 206 Partial Content para resposta. Se os intervalos são inválidos, o servidor retorna o erro 416 Range Not Satisfiable. O servidor também pode ignorar o cabeçalho Range e enviar o documento inteiro com um código de status 200.

#### Exemplo
    Range: <unit>=<range-start>-
    Range: <unit>=<range-start>-<range-end>
    Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>
    Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>, <range-start>-<range-end>
    Range: <unit>=-<suffix-length>

`unit` => **A unidade no qual os intervalos são especificados. É geralmente em bytes.**

`range-start` => **Um inteiro na dada unidade indicando o começo da requisição de intervalo.**

`range-end` => **Um inteiro na dada unidade indicando o fim da requisição de intervalo. Este valor é opcional e, se omitido, o fim do documento é utilizado como fim do intervalo.**

`suffix-length` => **Um inteiro na dada unidade indicando o número de unidades ao fim do arquivo para retornar.**

#### Na pratica
    Range: bytes=200-1000, 2000-6576, 19000-

### Método createReadStream do File System
>A função `fs.creadstream ()` permite que você abra um fluxo legível de uma maneira muito simples.Tudo o que você precisa fazer é passar o caminho do arquivo para começar a transmitir. Acontece que a resposta (bem como o pedido) objetos são fluxos.Portanto, usaremos esse fato para criar um servidor HTTP que transmite os arquivos para o cliente.Como o código é simples o suficiente, é bem fácil ler através dele e comentar por que cada linha é necessária.

    var http = require('http');
    var fs = require('fs');

    http.createServer(function(req, res) {
    // O nome do arquivo é simples o diretório local e as tachas no URL solicitado
    var filename = __dirname+req.url;

    // Esta linha abre o arquivo como um fluxo legível
    var readStream = fs.createReadStream(filename);

    // Isso vai esperar até sabermos que o fluxo legível é realmente válido antes da tubulação
    readStream.on('open', function () {
        // Isso apenas canaliza o fluxo de leitura para o objeto de resposta (o que vai para o cliente)
        readStream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
        res.end(err);
    });
    }).listen(8080);