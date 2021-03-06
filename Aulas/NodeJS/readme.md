# NPM
1. [Exemplo Básico](#exemplo-básico)

2. [Estrutura Básica](#estrutura-básica)

3. [Dependencies](#dependencies-e-devdependencies)

4. [Versões](#versões) 

5. [Event Emitter](#emitindo-eventos) 

6. [Arquivos](#arquivos)

7. [Promise](#promise)

8. [HTTP](#http)
## Exemplo Básico

    {
        "name": "aulas",
        "version": "1.0.0",
        "description": "Exemplo envolvendo nodejs",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "cronos2277",
        "license": "ISC"
    }

## Estrutura Básica
`name` => o nome do projeto. Usado em alguns projetos, no Eletron por exemplo pode usar esse valor para usar na barra de titulo da janela.

`version` => a versão do projeto.

`description` => descrição do projeto.

`main` => Arquivo de entrada, no caso o arquivo que vai iniciar a aplicação, alguns packages usam isso como base.

`author` => Quem fez o projeto?

`license` => Aqui você informa a licença do projeto.

### scripts
###### exemplo
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
#### Explicando
Aqui fica os scripts, no caso você pode usar qualquer comando a ser usado no terminal, porém se os comandos forem do *MS-DOS* e for executado no linux, não funcionar, assim como o contrário também pode não funcionar, e isso deve ser observado, um exemplo de comando *UNIX* no *MS-DOS*:

    'ls' não é reconhecido como um comando interno
    ou externo, um programa operável ou um arquivo em lotes.
    npm ERR! code ELIFECYCLE
    npm ERR! errno 1
    npm ERR! aulas@1.0.0 ls: `ls -latr`
    npm ERR! Exit status 1
    npm ERR!
    npm ERR! Failed at the aulas@1.0.0 ls script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
    npm WARN Local package.json exists, but node_modules missing, did you mean to install?

    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\crono\AppData\Roaming\npm-cache\_logs\2021-03-01T18_32_55_733Z-debug.log

>No caso existe um pacote chamado *shelljs* que permite a execução de comandos *unix* no *MS-DOS*, assim como o *cross-env* que permite configuração do ambiente.
#### MS-DOS
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "ms-dos": "dir",
        "ls": "ls -latr"
    },

Nesse caso acima são scripts registrados para serem executados usando o `npm run [script]`, sendo o `[script]` o nome dentro das chaves do objeto acima, nesse caso poderia ser `npm run test`, `npm run ms-dos` ou `npm run ls`. Lembrando que um teminar unix pode ter problema para executar esse `npm run ms-dos` assim como esse `npm run ls` deve ser executado no *ms-dos*. Certos comandos não precisam do run no meio, como o *start* por exemplo, no caso se colocassemos o *start* conforme abaixo:

    "scripts": {       
        "start": "echo ola mundo "
    },

bastaria digitar apenas `npm start`, sem o *run*, mas isso acontece para alguns scripts ao qual tem as suas palavras reservadas no node, para qualquer outra palavra, precisa do *run*.

## Dependencies e DevDependencies

        {
            "name": "aulas",
            "version": "1.0.0",
            "description": "Exemplo envolvendo nodejs",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "ms-dos": "dir",
                "ls": "ls -latr"
            },
            "author": "cronos2277",
            "license": "ISC",
            "dependencies": {
                "cross-env": "^7.0.3",
                "shelljs": "^0.8.4"
            },
            "devDependencies": {
                "bootstrap": "^4.6.0"
            }
        }

### Instalando
Para instalar usa-se o `npm i [pacote]` ou o `npm install [pacote]`, dessa forma o pacote é instalado na pasta *node_modules*, sendo que o `[pacote]` deve ser substituído pelo nome do pacote correspondete, em versões mais antigas do nodejs se faz necessário colocar o `--save` para que o mesmo seja registrado no arquivo *package.json*, ficando `npm install [pacote] --save`, o `--save` apenas se faz necessário em versões mais antigas do **Node Packager Manager (NPM)**, nas versões mais nova isso é incluso no json, mesmo que a flag `--save` seja omitida, sendo registrado nessa parte do **JSON**. Para recriar a pasta *node_modules* basta apenas dar um `npm i` ou `npm install` dessa forma toda a pasta *node_modules* será criada.

    "dependencies": {
        "cross-env": "^7.0.3",
        "shelljs": "^0.8.4"
    },

### Instalando como dependência do desenvolvedor
Dependências do dessenvolvedor não é instalado automaticamente quando se da um `npm i`, nesse caso as depêndencias de desenvolvedor não são inclusas, para tal você precisa usar `npm install -D` ou `npm i -D` para que se instale todas as depêndencias de desenvolvedor, para adicionar uma nova dependência como *devDependencies*, basta `npm i -D [pacote]` ou `npm install -D [pacote]`, devendo o `[pacote]` ser substituído pelo nome correspondente do pacote, nas versões antigas era necessário  `npm install [pacote] --save-dev` para que fosse registrado no *package.json*.

    "devDependencies": {
        "bootstrap": "^4.6.0"
    }

### Removendo
Para remover, você pode usar `npm remove [pacote]` ou `npm r [pacote]` para remover pacotes do *package.json* de **dependencies** e ` npm r -D [pacote]` ou ` npm remove -D [pacote]` para remover de *devDependencies*. Lembrando que `[pacote]` deve ser substituído pelo nome correspondente do pacote.
## Versões
`"cross-env": "^7.0.3"` => Permite a atualização no pacote contanto que se mantenha na versão 7. No caso esse pacote poderia evoluir para a versão `7.0.9` ou para `7.9.9` mas não para a versão `8`. Ou seja atualização *major* é o tipo de evolução padrão. Em resumo esses apenas esses dois números pode mudar `0.3`. O que permite a atualização de bugs e atualização menores.

`"cross-env": "~7.0.3"` => Permite a versão minot seja mudado, no caso apenas a parte com o número `.3`, o que permite apenas atualização contra  bugs.

`"cross-env": "7.0.3"` => Versão exata, ou seja, aceita apenas a versão **7.0.3**.

### Outras
`">7.0.3"` => versão maior que 7.0.3.

`"<7.0.3"` => versão menor que 7.0.3.

`">=7.0.3"` => versão maior ou igual que 7.0.3.

`"<=7.0.3"` => versão menor ou igual que 7.0.3.

###### Exemplo
    "dependencies": {
        "cross-env": ">=7.0.3",
        "shelljs": ">0.8.3"
    },
    "devDependencies": {
        "bootstrap": "<=4.6.0"
    }

## Emitindo Eventos
### Basico
[Event Emitter arquivo](./eventEmitter1.js)

    const {EventEmitter} = require('events');
    const emitter = new EventEmitter();

    emitter.on('evento', function(parametro){
        console.log('Evento disparado, com o parametro'+parametro);
    });

    emitter.emit('evento','parametro123');

O pacote `events` vem incluso com o nodejs. Com uma instancia desse objeto você pode programar orientado a eventos, uma das formas de se fazer isso é instanciadno um **EventEmitter** que vem do pacote *events* `const emitter = new EventEmitter();` e então registrar a função associada a ela, usando o método *on*, conforme abaixo:

    emitter.on('evento', function(parametro){
        console.log('Evento disparado, com o parametro'+parametro);
    });

### Chamando o evento com 'emit'
E então para chamar-lo `emitter.emit('evento','parametro123');`, você usa a string registrada no evento para disparar-lo, e no emit o segundo argumento seria o parametro, caso você queira passar algum argumento para a função associado ao evento, nesse caso `parametro123`, o output deve ser esse:

    $ node eventEmitter1
    Evento disparado, com o parametroparametro123

### Removendo um único Evento
[Event Emitter 2 arquivo](eventEmitter2.js)

    const {EventEmitter} = require('events');
    const emitter = new EventEmitter();    
    const callback1 = parametro => console.log('Evento disparado da callback1, com o parametro'+parametro);
    const callback2 = parametro => console.log('Evento disparado da callback2, com o parametro'+parametro);

    emitter.on('evento', callback1);
    emitter.on('evento', callback2);
    emitter.emit('evento','parametro1');
    emitter.emit('evento','parametro2');

    //removendo uma callback do Evento
    emitter.removeListener('evento',callback1);
    emitter.emit('evento','parametro3');

Existe duas formas de excluir um evento e nesse caso é o método `removeListener`, nesse método, o primeiro argumento é o evento e o segundo a função a ser removida. Veja que nesse método você deve especificar qual função de callback deve ser removida, uma vez que conforme visto aqui:

    emitter.on('evento', callback1);
    emitter.on('evento', callback2);

Você pode colocar mais de uma callback nos eventos podendo ter uma relação de um evento podendo ter *N* callbacks, por isso se for usar esse método , você deve informar qual callback deve ser excluída, nesse caso devido a essa exclusão `emitter.removeListener('evento',callback1);` essa outra callback `callback2` não será afetada.

    $ node eventEmitter2
    Evento disparado da callback1, com o parametroparametro1
    Evento disparado da callback2, com o parametroparametro1
    Evento disparado da callback1, com o parametroparametro2
    Evento disparado da callback2, com o parametroparametro2
    Evento disparado da callback2, com o parametroparametro3

Repare que o `parametroparametro3` é executado uma vez, isso porque apenas uma única callback foi removida, a outra permanece intacta.

### Removendo todos os Eventos
[Arquivo para remover todos os eventos](eventEmitter3.js)

    const {EventEmitter} = require('events');
    const emitter = new EventEmitter();    
    const callback1 = parametro => console.log('Evento disparado da callback1, com o parametro'+parametro);
    const callback2 = parametro => console.log('Evento disparado da callback2, com o parametro'+parametro);

    emitter.on('evento', callback1);
    emitter.on('evento', callback2);
    emitter.emit('evento','parametro1');
    emitter.emit('evento','parametro2');

    //removendo todas as callbacks
    emitter.removeAllListeners('evento');
    emitter.emit('evento','parametro3');

Diferente do método acima o método `removeAllListeners`, apaga todos as callbacks associados a esse evento, motivo pelo qual você especifica apenas um argumento, o evento a deixar de emitir, segue um exemplo do output:

    $ node eventEmitter3
    Evento disparado da callback1, com o parametroparametro1
    Evento disparado da callback2, com o parametroparametro1
    Evento disparado da callback1, com o parametroparametro2
    Evento disparado da callback2, com o parametroparametro2

Repare que nesse caso não chegou a executar o `parametroparametro3`, devido ao fato dessa linha ser executada antes `emitter.removeAllListeners('evento')`.

### Once
[Quarto Exemplo](./eventEmitter4.js)
###### Código
    const {EventEmitter} = require('events');

    const emitter = new EventEmitter();

    emitter.once('evento', function(parametro){
        console.log('Evento disparado, com o parametro'+parametro);
    });

    emitter.emit('evento','parametro1');
    emitter.emit('evento','parametro2');

###### Output
    $ node eventEmitter4
    Evento disparado, com o parametroparametro1

#### Explicando
Com o *once* o evento é emitido e já em seguida é feito a remoção dele, repare que essa linha não é executada `emitter.emit('evento','parametro2');` e isso ocorre devido a essa peculiaridade.

### Orientação a Objetos
[Quinto Exemplo](eventEmitter5.js)
###### Código
    const {EventEmitter} = require('events');

    class Evento extends EventEmitter{
        callback1(){
            console.log('Callback 1');
        }

        callback2(){
            console.log('Callback 2');
        }
    }

    const emitter = new Evento();

    emitter.once('callback',emitter.callback1);
    emitter.once('callback',emitter.callback2);

    emitter.emit('callback');

    // Nao sera executado
    emitter.emit('callback');

###### Output

    $ node eventEmitter5
    Callback 1
    Callback 2

#### Explicando
Você pode colocar quantas callbacks quiser no evento, mas com a once, todas só serão executadas uma vez, o que explica a execução única do *emit*, sendo que o mesmo é chamado duas vezes. Você pode também extender da classe **EventEmitter** se quiser algo mais complexo.

## Arquivos
[fileWrite.js](./fileWrite.js)
### writeFile
###### Código
    const {writeFile} = require('fs');

    const texto1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;    

    writeFile('arquivo1.txt',texto1,function(MensagensErro){
        if(MensagensErro){
            console.log(MensagensErro);
        }else{
            console.log('Arquivo1.txt criado');
        }
    });

###### Explicando
Essa função funciona de maneira assíncrona, ou seja a leitura de arquivo usando a função *writeFile* como feito aqui `const {writeFile} = require('fs');`, a função *writeFile* deve ter 3 argumentos, o primeiro o nome do arquivo a ser escrito no *HD* nesse exemplo `arquivo1.txt`, o segundo argumento o conteúdo que esse arquivo deve ter, no caso é armazenado um texto dentro de uma variável e passado como segundo argumento e por fim uma callback. Nessa callback, o primeiro parametro é uma mensagem de erro, no caso se você preferir fazer algum tratamento de erro, é esse argumento passado na callback que você deve considerar, conforme visto aqui:

    function(MensagensErro){
        if(MensagensErro){
            console.log(MensagensErro);
        }else{
            console.log('Arquivo1.txt criado');
        }
    }

### Escrita de arquivos de maneira síncrona

###### Código

    const {writeFileSync} = require('fs');

    const texto2 = `Etiam libero augue, sodales vitae felis nec, mollis efficitur nisi.`;

    writeFileSync('arquivo2.txt',texto2,{encoding:'utf-8'});
    console.log('arquivo2.txt criado!');

###### Explicando
Existe também uma vesão sincrona da função ou método, dependendo de como você importar, que é o *writeFileSync*. Essa função síncrona aceita os dois primeiros argumentos, como a função síncrona, ou seja respectivamente o nome do arquivo a ser escrito e o seu respectivo conteúdo, porém como terceiro argumento, você passa as opções dentro de um objeto, no caso é passado a codificação *UTF-8*. Essa função lança exceções, logo vale a pena colocar-lo dentro de um bloco **TRY**-**Catch**. *Não recomenda-se o uso dessa função síncrona, exceto que tenha um bom motivo para isso. Recomenda-se o uso da versão assíncrona dela, sempreque possível*.

###### Output

    arquivo2.txt criado!
    Arquivo1.txt criado

*Repare que nesse exemplo a função sincrona é primeiro, isso porque a função assincrona, não bloqueia a execução de outras funções.*

### Função Append
[Exemplo envolvendo fileAppend](./fileAppend.js)
###### Código

    const {appendFile,appendFileSync} = require('fs');
    const content1 = parseInt(Math.random() * (10 ** 9))+'\n';
    const content2 = parseInt(Math.random() * (10 ** 9))+'\n';

    appendFile('append1.txt',content1,function(erro){
        if(erro){
            console.log(erro);
        }else{
            console.log(`${content1} adicionado ao append1.txt`);
        }
    });

    appendFileSync('append2.txt',content2,{encoding:'utf-8'});
    console.log(`Adicionado ${content2} ao arquivo append2.txt`);

#### Explicando
a função *appendFile* funciona de maneira semelhante *writeFile*, assim como o *appendFileSync* funciona de maneira semelhante a *writeFileSync*, porém diferente das funções de escrita, essas adicionam conteúdo ao arquivo ao invés de substituir-lo. Em resumo se o arquivo não existe, as funções *append* funcionam exatamente igual a função write, mas se o arquivo existir, a função *write* reescreve o conteúdo, ou seja apaga o que tem e cria um novo e o *append* ao invés de apagar e criar novo, simplesmente concatena informação ao arquivo gerado, essa é a diferença entre eles.

### Função File Read

    const {readFile,readFileSync} = require('fs');
    readFile('append1.txt',function(erro,dados){
        console.log('arquivo: append1.txt');
        if(erro){
            console.log(erro);
        }else{
            console.log(dados.toString());
        }
    });

    try{
        const buffer = readFileSync('append2.txt');
        console.log('arquivo: append2.txt');
        console.log(`Para String: ${buffer.toString()}`);
        console.log(`Para JSON: ${JSON.stringify(buffer.toJSON())}`);    
    }catch(error){
        console.log(error);
    }

#### Explicando
A função ou o método *readFile* e *readFileSync* servem para ter arquivos, sendo a primeira assíncrona e a segunda síncrona.

##### readFile
Esse método aceita de dois a 4 argumentos, na seua forma básica com 2 argumentos, o primeiro é o arquivo a ser lido e o segundo é a callback para gerenciar isso. Essa callback aceita 2 argumentos, o primeiro é o erro caso tenha e a segunda é o dado bruto em forma de Buffer, precisando ser tratado depois. No modo 3 argumentos o primeiro é o arquivo a ser lido, o segundo é a quantidade de bytes que devem ser lidos, isso pode ser interessante para arquivos muito grande, permitindo que seja lido a quantidade de bytes informado e após isso a função é encerrada, sem que seja necessário ler o arquivo na integra e por fim a callback para tratar. A função aceita cinco argumentos, mas geralmente é usado no modo 2 ou de 3 argumentos.

##### Buffer
O buffer é o dado bruto, no caso o conteúdo do arquivo é jogado na memória, para que possa extrair o dado você deve usar o método *toString*, para que seja convertido a um formato de texto, ou usar as devidas funções de tratamento.

##### readFileSync
Essa função é executada de maneira síncrona e o seu uso é desencorajado, no caso essa função na sua forma mais básica aceita como argumento o nome do arquivo a ser lido, e podendo ter ou não como segundo argumento dentro do objeto as opções de leitura, essa função retorna um [Buffer](#buffer). Ela lança erros.

###### Output

    arquivo: append2.txt
    Para String: 301250378

    Para JSON: {"type":"Buffer","data":[51,48,49,50,53,48,51,55,56,10]}
    arquivo: append1.txt
    458636564
    248463050
    22520422

Como você pode ver acima a função síncrona é executada antes porque é bloqueante, e também é possível transformar um *Buffer* para *JSON*.

### Exists e RM

    const {exists,existsSync,rm,rmSync} = require('fs');

    exists('arquivo1.txt',function(existe){
        const msg = message => console.log(message)
        if(existe){
            rm('arquivo1.txt',erro => (erro)?msg(erro):msg('Arquivo1.txt excluido!'));
        }else{
            msg(`arquivo1.txt não existe`);
        }
    });

    if(existsSync('arquivo2.txt')){
        rmSync('arquivo2.txt');
        console.log('arquivo2.txt removido!');
    }else{
        console.log('arquivo2.txt não existe!');
    }

#### exists
Essa função é a versão assincrona, ela verifica se o arquivo existe no disco. O primeiro argumento deve ser o nome ou path e o segundo argumento a *callback* que deve ter pelo menos um argumento, esse argumento é booleano e é através dele que saberemos se o arquivo existe ou não, se não existir esse argumento da callback se torna `false` ao passo que existir o argumento passado passa a ser `true` como argumento da callback passado como segundo argumento.

#### existsSync
É a versão sincrona, você passa como argumento o arquivo e a função retorna um booleano dizendo se o arquivo existe ou não.

#### RM
Essa função remove um arquivo, o primeiro argumento deve ser o arquivo a ser removido. No modo dois argumentos o primeiro é o nome do arquivo a ser removido e o segundo é uma callback que tem como argumento um erro, caso exista, podendo assim tratar. No modo três argumentos o primeiro é o arquivo a ser aberto, o ultimo a callback para tratar erro e o argumento do meio *o segundo* é para colocar as opções.

##### Opções de remoção
Você pode passar para uma função de remoção um conjunto de opções, ao qual incluí `{force:true|false,maxRetries:Number,recursive:true|false,retryDelay:Number}`, ou seja, respectivamente: Se deve forçar exclusão, quantas tentativas de exclusão?, essa exclusão deve ser recursiva?, quanto tempo em milisegundos deve se esperar entre uma tentativa falha e a nova tentativa? 
#### rmSync
Essa é uma função *void*, que exige como argumento o arquivo a ser excluído, sendo opcional um objeto com as opções acima, como segundo argumento.

## Promise
[Promise 1](Promise1.js)

[Promise 2](Promise2.js)

[Promise 3](Promise3.js)
###### Código
        const promessa = new Promise(function(resolve,reject){
            if(Math.random() >= 0.5){
                resolve();
            }else{
                reject();
            }    
        });

    promessa
    .then(() => console.log('Caiu no Try'))
    .catch(() => console.log('Caiu no Catch'))
    .finally(() => console.log('Programa concluído!'));

### Explicando
Esse é o exemplo mais básico envolvendo *Promise*, nesse caso uma *promise* aceita como argumento uma função que aceita *2 callbacks* como argumento conforme visto aqui `const promessa = new Promise(function(resolve,reject){`, dentro dessa função você usa essa função os argumentos para decidir quando a promise deve ser resolvida e assim chamar a *callback* passada como primeiro argumento, ou senão chamar a *callback* passada como segundo argumento, que é para informar a quem está chamando a promise que houve um erro.

    if(Math.random() >= 0.5){
        resolve();
    }else{
        reject();
    }

No caso aqui, aleatoriamente é chamado ou para resolver ou para rejeitar, e essas funções não passam argumentos ao *then* ou ao *catch*, no caso apenas é executada as callbacks.

### Defindo a resolve e o reject

    promessa
    .then(() => console.log('Caiu no Try'))
    .catch(() => console.log('Caiu no Catch'))
    .finally(() => console.log('Programa concluído!'));

No caso toda a lógica fica dentro da *Promise*, assim sendo, se a *Promise* optar por resolver é chamado o conteúdo dentro do *then*, se optar por rejeitar, chama o *catch*. Isso tudo claro, conforme o algoritimo passado na callback que recebe outras duas callbacks passadas aqui como parametros. O finally é chamado independente do que aconteça, sendo resolvida ou rejeitada, a *promise* sempre chama o block *finally*.

### Estruturando Promise dentro de Função

        function Calcular(numeros = []){
            return new Promise(function(resolve,reject){
                if(!numeros) reject(`Não tem números para operar!`);
                const mult = numeros.reduce(function(acumulador,valor){
                    return acumulador *= valor;
                },1);

                const soma = numeros.reduce(function(acc,val){
                    return acc += val;
                },0);

                resolve({mult,soma});
            });
        }

    Calcular([1,2,3,4]).then(console.log);
###### Output
    { mult: 24, soma: 10 }   
#### Explicando
Conforme visto acima, você pode encapsular uma promise dentro de uma função e usar os argumentos passados a ela para desenvolver a lógica de funcionamento da *Promise* que está dentro dela, nesse caso espera-se que o usuário passe um array de números e dentro desse arrays de números é aplicado dois *reduces*, o primeiro que multiplica todos os números e o segundo que soma todos os números e devolve o resultado em forma de um objeto. O importante a ressaltar é que tanto a callback de *resolve*, assim como a de *reject*, ambas devem ser levados em consideração, que essas callbacks apenas passam um valor, e não mais, no caso se você tiver a necessidade de passar ao *reject* ou ao *resolve* mais de um valor, deve-se usar da estruturas de objeto para isso, conforme feito aqui `resolve({mult,soma});`.

Além disso, como se trata de uma função que tem uma promise dentro do seu interior, a forma de chamar o *then* é encadeando a uma função, conforme visto aqui `Calcular([1,2,3,4]).then(console.log);`, ao qual pega um array e vai aplicando dentro de uma promisse e jogando o valor como argumento da função passada, que é o que o resolve faz `resolve({mult,soma});`, porém a função que irá consumir esses dados é essa aqui: `.then(console.log);`.

### Async/Await
###### Código
    (async function ProcessarNumeros(numeros = [], callback){
        const mult = new Promise(function(resolve,reject){
            if(!numeros){
                reject('Array Inválido!');
            }else{
                const result = numeros.reduce(function(acc,val){
                    return acc *= val;
                },1);
                resolve(result);
            }
        });

        const soma = new Promise(function(resolve,reject){
            if(!numeros){
                reject('Array Inválido!');
            }else{
                const result = numeros.reduce(function(acc,val){
                    return acc += val;
                },0);
                resolve(result);
            }
        });

        console.log('Antes do await');
        callback({soma,mult}); 
    
        const somarTudo = await mult;    
        const multTudo = await soma; 
        console.log('\nDepois do await');
        callback({somarTudo,multTudo});
    })([1,2,3,4],console.log);



###### Output
    Antes do await
    { soma: Promise { 10 }, mult: Promise { 24 } }

    Depois do await
    { somarTudo: 24, multTudo: 10 }

#### Explicando
**async** é uma palavra reservada que você coloca em funções *assincronas*, no caso dessa função se trata de uma função auto envocada, mas não precisa ser uma função auto envocada. Funções async, executam os códigos de maneira assincrona e devido a isso você pode necessitar que em determinadas partes, a função se comporte de maneira sincrona e é nesse ponto que entra o *await*, que significa *aguarde*.

    const somarTudo = await mult;    
    const multTudo = await soma; 

Nesse exemplo acima, nenhum código é executado até que essas duas promises seja resolvidas, ou seja você está pedindo para que esses valores sejam resolvidos para só depois continuar, se você analisar o código acima desse, você verá algo como :

    Antes do await
    { soma: Promise { 10 }, mult: Promise { 24 } }

E depois dos *await*, você tem o valor resolvido:

    Depois do await
    { somarTudo: 24, multTudo: 10 }

Através do *await* você impõe que a promise deve ser resolvida antes de continuar, ou seja, dentro das funções *async* você pode deixar as promises sendo executado em paralelo e quando você necessitar pegar o valor dessa promise, você pode dar um *await* e com esse await você poderia pegar o valor destinado ao *resolve* ou ao *reject*, sem precisar dar um *then*, uma vez que o próprio *await* faz isso. Porém para concluir vale a observação: **`await` só pode ser usado em funções `async`**.

## HTTP
###### Código
    const http = require('http');
    const server = http.createServer(function(request,response){
        response.writeHead(200,{'Content-Type':'application/json'});
        const json = JSON.stringify(
            {
                VALOR:"EXEMPLO VALOR",
                NUMERO:parseInt(Math.random() * 1000)
            }
        );        
        response.end(json);    
    });
    server.listen(3001);

No *node JS* existe o módulo **HTTP** ao qual é nativo do NodeJS, ou seja, você tem acesso sem precisar instalar nada. Dentro do pacote HTTP:

    const http = require('http');
### Criando um servidor
Podemos criar um servidor usando o método `createServer`, ao qual aceita como argumento uma callback, devendo ter essa callback 2 argumentos, o *request* e o *response* . Segue abaixo a callback desse exemplo:

    function(request,response){
        response.writeHead(200,{'Content-Type':'application/json'});
        const json = JSON.stringify(
            {
                VALOR:"EXEMPLO VALOR",
                NUMERO:parseInt(Math.random() * 1000)
            }
        );        
        response.end(json);    
    }

O objeto *request* tem todos os dados oriundos do cliente e o objeto *response* tem os dados oriundos do servidor. Esse é o exemplo mais básico de uma resposta ao cliente, no caso estamos devolvendo como resposta um *JSON* para o usuário.

    response.writeHead(200,{'Content-Type':'application/json'});

Aqui estamos dizendo ao servidor que o conteúdo que será enviado ao cliente será uma resposta *JSON*. No caso o primeiro argumento é o código HTTP a ser enviado e o segundo seria o *HEADER* em forma de objeto.

    const json = JSON.stringify(
        {
            VALOR:"EXEMPLO VALOR",
            NUMERO:parseInt(Math.random() * 1000)
        }
    );

Acima estamos criando um *JSON* para enviar ao cliente com o auxílio do método *stringify*.        

    response.end(json);    

Esse código acima é obrigatório, pois é com base nele que o servidor avisa ao cliente que terminou o processamento, o simples esquecimento do método *end* pode fazer com que a requisição não seja processada, ou seja esse método é importante, mas nem sempre ele aceita um argumento, aqui esse argumento é aceito porque o servidor está devolvendo um *JSON*, mas nem sempre é assim.

### Ouvindo

    server.listen(3001);

Uma vez criado um servidor, nós temos que fazer-lo funcionar e para isso usamos o método *listen*, usando desse método passamos como argumento a porta que queremos ouvir, nesse caso o servidor será aberto na porta *3001*. Essa seria a aplicação mais básica desse método, no caso é aberto um servidor na porta passado como primeiro argumento.

#### Devolvendo HTML e informando o servidor

    const http = require('http');
    const server = http.createServer(
        function(request,response){
            response.writeHead(200,{'Content-Type':"text/html"});
            response.write('<h1>Ola Mundo</h1>');        
            response.end();
        }
    ).listen(3002,'localhost');

No caso aqui estamos retornando um html `response.writeHead(200,{'Content-Type':"text/html"});`, e usamos o método *write* para exibir informações ao usuário, nesse caso: `response.write('<h1>Ola Mundo</h1>');`, e como imprimimos tudo que precisávamos usando o método *write*, logo não se faz necessário passar nada para o *end*, mas isso não significa que não devemos chamar-lo e esse processo é feito aqui: `response.end();`. Pense no write e no end como o *echo* do PHP.

##### listen
Porém no modo de dois argumentos, você pode definir a porta no primeiro argumento e o servidor ao qual ele estará escutando, caso você queira especificar isso, conforme é feito aqui `.listen(3002,'localhost');`, lembre-se de colocar a informação de *IP* dentro de uma *string*.

### Exemplos com request

    const http = require('http');
    const server = http.createServer(
        function(request,response){
            console.log('Metodo Usado:',request.method);
            console.log('URL do Cliente:',request.url);
            response.end(JSON.stringify({...request.headers}));
        }
    );

    server.listen(3003);

O primeiro *callback* passado é o request e justamente esse argumento tem alguns atributos que ajudam na identificação no cliente. Repare também que passamos o valor tudo dentro do método *end*, ou seja se tirarmos as funções de exibição no terminal, teríamos:

    response.end(JSON.stringify({...request.headers}));

Ou seja você pode ou não passar os dados de modo a conta gotas usando o método write, ou passar tudo de uma só vez dentro do método *end*.
#### request.method
Inicialmente temos `request.method`, o atributo *method* retorna o método usado pelo cliente, pondendo ser *GET*, *POST*, *PUT*, justamente com esse atributo você pode diferenciar o tipo de requisição e fazer o tratamento, tipo se for *POST* ou *PUT* por exemplo, verificar se o usuário está logado, ao passo que para *GET* não e por ai vai... Vale lembrar que o atributo retorna o método usado, em letras maísculas, ou seja: *GET*,*POST*, etc... Lembre-se disso quando for fazer desvios condicionais usando strings para comparar com ela.

#### request.url
Aqui retorna a *url* relativa que o usuário usou para fazer a requisição, ou seja, se o usuário apenas digitou `http://localhost:3003` nesse exemplo esse método valeria `/`, ao passo que se passasse pela *url* um id=3, tipo: `http://localhost:3003?id=3`, teríamos `/?id=3`, ou seja sempre de maneira relativa. Além disso, é válido lembrar, que apesar do *node* ser javascript, mesmo assim o *node* não pega *hashs* nas urls, isso só é pego pelo javascript no lado do cliente.

#### request.headers
###### Exemplo

    {
        "host":"localhost:3003",
        "connection":"keep-alive",
        "cache-control":"max-age=0",
        "upgrade-insecure-requests":"1",

        "user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",

        "accept":"text/html,application/xhtml+xml,

        application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",

        "sec-gpc":"1",
        "sec-fetch-site":"none",
        "sec-fetch-mode":"navigate",
        "sec-fetch-user":"?1",
        "sec-fetch-dest":"document",
        "accept-encoding":"gzip, deflate, br","accept-language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
        }

Esse atributo pode de dar muitos detalhes sobre o cliente, como o host o navegador e etc...