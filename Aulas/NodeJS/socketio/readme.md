# Socket.IO
[Documentação](https://socket.io/docs/v3/)

[Servidor](#no-lado-servidor)

[Cliente](#cliente)

[Roteamento](#roteamento)
## Instalando
    npm i socket.io

Segue o exemplo: [package.json](package.json)

## No lado Servidor

    const socket = require('socket.io')(4001,
    {
        cors: {
            origin: "http://127.0.0.1:5500",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: true
        },
        }
    );

por padrão poderia ser assim `const socket = require('socket.io')([PORTA_TCP])`, porém dessa forma padrão você nâo habilita o *cors* e dependendo do caso você não consegue acessar esse recurso, sendo `[PORTA_TCP]` a devida porta *TCP* informada, ou  `const socket = require('socket.io')([PORTA_TCP],[objeto])`, sendo esse objeto as opções para que o servidor seja criado.

### CORS
[Documentação](https://socket.io/docs/v3/handling-cors/)

    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
        credentials: true
    },

`origin` => Qual requisição deve ser aceito, ou seja qual é a url que pode enviar uma requisição nessa url. Nesse caso apenas será aceito apenas requisições vindo de *localhost* e da porta *5500*. Você poderia usar **"*"**, caso queira que seja aceita requisição de qualquer lugar, ficando `origin: "*"`, porem se quiser colocar o `origin: "*"`, [veja isso aqui](#cors-livre-para-todo-mundo).

`methods` => Dentro do array deve ser informado os métodos http, que deveram ser aceitos, nesse caso é o *GET* e o *POST*.

`allowedHeaders` => Headers permitidos, nesse caso o content-type devido ao cors.

`credentials` => Se aceita credenciais.

### Eventos 'connect' e 'connection'

    socket.on('connect',[callback]);

    socket.on('connection',[callback]);

>O evento connect é sinônimo do connection, eles são gerados quando um cliente se conecta ao socket. Primeiro é gerado o evento connect em seguida o connection. Desta forma, você pode utilizar qualquer um para verificar quando há uma conexão com o socket.


Toda a lógica deve estar dentro de *connect* ou *connection*, conforme é demonstrado abaixo:
[Arquivo server1.js](server1.js)

    const socket = require('socket.io')(4001,
    {
        cors: {
            origin: "http://127.0.0.1:5500",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: true
        },
        }
    );

    socket.on('connect',function(arg){
        console.log('Antes');
        arg.on('evento',function(data){
            console.log(data + 'Antes');
        });
    });

    socket.on('connection',function(arg){
        console.log('Depois');

        arg.on('evento',function(data){
            console.log(data + 'Depois');
        });
    });

e então dentro na *callback* passada por evento, a mesma recebe um argumento que é o socket, contendo os dados da requisição enviada pelo cliente, [conforme visto aqui](#eventos-connect-e-connection).

### Eventos ouvido pelo cliente

    socket.on('connection',function(arg){        

        //AQUI
        arg.on('evento',function(data){
            console.log(data + 'Depois');
        });

    });

O argumento da callback passado é um objeto que pode ouvir eventos, nesse caso, estamos registrando um listener para *evento*, conforme ilustrado abaixo:

    ...
    //AQUI
        arg.on('evento',function(data){
            console.log(data + 'Depois');
        });
    ...

No caso quando o cliente enviar um evento chamado `evento`, será essa callback que irá receber e o valor enviado pelo cliente emissor é passado como argumento apra a função de listener.

### Resposta pelo Servidor
[Server2.js](server2.js)

    const io = require('socket.io')(4001,{
        cors: {
            origin: "http://127.0.0.1:5500",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: true
        }
    });

    io.on('connect',function(socket){
        socket.on('evento',function(data){
            console.log(`recebido ${data} do cliente`);
            socket.emit('server',`resposta do servidor pelo "emit" as ${Date()}`);
            socket.broadcast.emit('server',`resposta do servidor pelo "broadcast.emit" as ${Date()}`);        
            io.sockets.emit('server',`resposta do servidor pelo "io.sockets.emit" as ${Date()}`);        
        });
    });

No caso a parte que interessa:

    socket.emit('server',`resposta do servidor pelo "emit" as ${Date()}`);
    socket.broadcast.emit('server',`resposta do servidor pelo "broadcast.emit" as ${Date()}`);        
    io.sockets.emit('server',`resposta do servidor pelo "io.sockets.emit" as ${Date()}`);   

Lembrando que o *io* vem daqui `const io = require('socket.io')(4001,{`, e o *socket* vem daqui `io.on('connect',function(socket){`, ou seja o *io* é o socket mais abrangente, ao passo que o *socket* é o menos abrangente, ao passo que o socket é um argumento da callback informada como argumento do listener do *connect* ou *connection*.

`socket.emit('[evento]',[conteudo])` => o método *emit* do argumento da callback do listener da **connect** ou **connection**, envia uma resposta apenas ao cliente que enviou a requisição, por exemplo se o *cliente1* enviou uma mensagem e o servidor respondeu com esse *emit*, logo apenas o cliente1, que nesse exemplo originou o contato recebe a mensagem, o cliente2, e etc não. Esse método é interessante para dar o feedback ao cliente originário da mensagem, algo como: *mensagem enviada* ou *erro* ou algo assim.

`socket.broadcast.emit('[evento]',[conteudo])` => Esse método dentro do objeto broadcast, atributo do argumento passado a callback que atende a requisição *connection* ou *connect*, envia a mensagem a todos, exceto ao cliente originário da requição, por exemplo em uma conexão com servidor, cliente 1 e cliente 2, e o cliente 1 envia, se o servidor usar esse método, apenas o cliente 2 recebe a mensagem do servidor. Esse método é interessante como forma de contato, tipo o *cliente tal* comunicou a todos essa mensagem, e como o *cliente tal* enviou a mensagem, não faz sentido ele mesmo ouvir a própria mensagem, ou seja esse método envia a todos, menos ao cliente que chamou a requisição.

`io.sockets.emit('[evento]',[conteudo])` => Esse método do socket importado do socket mais abrangente, que  é aquele declarado na primeira linha, o emit do seu atributo *sockets*, envia a todos os clientes conectado ao servidor.

**Obs o `[evento]` corresponde ao evento que o cliente está ouvindo, e o `[conteúdo]` é a mensagem que você quer enviar ao cliente**.

## Cliente
[Cliente](client.html)

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.socket.io/socket.io-3.0.5.js"></script>

        <title>Cliente</title>
    </head>
    <body>
        <div>
            <textarea id="texto"></textarea>
            <button id='enviar'>Enviar</button>
        </div>
        <hr>
        <div id='server'>

        </div>
        <script>
            const socket = io('http://localhost:4001');
            document.getElementById('enviar').onclick = function(){            
                socket.emit('evento',document.getElementById('texto').value);  
                document.getElementById('texto').value = null;          
            }
            socket.on('server',function(data){
                console.log(data)
                const p = document.createElement('p');
                p.innerHTML = data;
                document.getElementById('server').append(p);
            });
        </script>
    </body>
    </html>

No lado do cliente você deve inicialmente importar o javascript `<script src="https://cdn.socket.io/socket.io-3.0.5.js"></script>`, após isso a função *io* pode ser usada `const socket = io('http://localhost:4001');`. Como essa página é a cliente, pode ser aberta mais de uma instância dessa página e cada instancia é identificado como um cliente destinto pelo servidor, desse código duas partes se destacam: `socket.emit('evento',document.getElementById('texto').value);`, aqui o *evento* é emitido para o endereço `'http://localhost:4001'`, conforme definido aqui `const socket = io('http://localhost:4001');`, lá no servidor deve ter um listener para ouvir esse evento que é emitido aqui. [Veja aonde está esse listener no servidor](#eventos-ouvido-pelo-cliente). Sendo o outro:

    socket.on('server',function(data){
        console.log(data)
        const p = document.createElement('p');
        p.innerHTML = data;
        document.getElementById('server').append(p);
    });

Esse listener é ativado quando o sevidor envia ao cliente o evento *server*, ao qual é [definido aqui, no lado do servidor](#resposta-pelo-servidor). O data é o conteúdo enviado pelo servidor.

## Roteamento
[server3.js](server3.js)
###### Código
    const io = require('socket.io')(4001,{
    cors:{
        origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: false
    }
    });

    io.on('connect',function(socket){
        socket.on('evento',function(msg){
            socket.emit('server',`recebido ${msg}`);
        });    
        
    });

    io.of('/rota',function(socket){
        console.log('rota acessada');
        socket.emit('server','"/rota" acessado');
    });

    io.use(function(socket,next){
        console.log('Interceptado');
        next();
    });

    io.of('/check')
    .on('connect',function(socket){
        socket.emit('server','conectado a rota check');
    })
    .use(function(socket,next){
        if(Math.random() > 0.49){
            socket.emit('server','tudo certo');
            next();
        }else{
            console.log('erro aleatório');
            socket.emit('server','erro aleatório');
            next(new Error('Erro Aleatorio'));
        }
    });

### CORS Livre para todo mundo

    cors:{
        origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: false
    }

Aqui estamos basicamente configurando para aceitar requisições *POST* e *GET* de qualquer lugar.

### Método OF
###### Cliente

    function acessarRota(){
        const socket = io('http://localhost:4001/rota');
        socket.on('server',function(data){
            console.log(data)
            const p = document.createElement('p');
            p.innerHTML = data;
            document.getElementById('server').append(p);
        });
    }
###### Servidor
    io.of('/rota',function(socket){
        console.log('rota acessada');
        socket.emit('server','"/rota" acessado');
    });
#### Explicando
Utilizando o método *OF*, é possível tratar rotas específicas dentro desse servidor, nesse caso esta sendo tratado `http://localhost:4001/rota`, se essa fota for acessado é esse listener que irá atender a requisição, ou seja, com o método `of` é possível tratar rotas específicas, lembrando que o objeto *oi*, visto aqui `io.of` vem de `const io = require('socket.io')(4001,`.

### Método USE
###### Código
    io.use(function(socket,next){
        console.log('Interceptado');
        next();
    });

#### Explicando
Aqui é feito uma interceptação, no caso como não é especificado a rota, essa interceptação é feito apenas na raiz. Basicamente você usa o socket para fazer verificação no cliente, ver que autenticação ele está levando entre outros dados se for o caso e impor uma condição para a chamada do `next()`, se você não passar nenhum parametro ou passar **true**, a requisição segue em frente, caso seja passado *false* ou uma exception tipo `next(new Error('Mensagem'))`, o acesso a rota é bloqueado aqui e o usuário não acessa a rota.

### Exemplo mais complexo
###### Cliente
    function interceptarRota(){
        const socket = io('http://localhost:4001/check');
        socket.on('server',function(data){
            console.log(data)
            const p = document.createElement('p');
            p.innerHTML = data;
            document.getElementById('server').append(p);
        });
    }
###### Servidor
    io.of('/check')
    .on('connect',function(socket){
        socket.emit('server','conectado a rota check');
    })
    .use(function(socket,next){
        if(Math.random() > 0.49){
            socket.emit('server','tudo certo');
            next();
        }else{
            console.log('erro aleatório');
            socket.emit('server','erro aleatório');
            next(new Error('Erro Aleatorio'));
        }
    });

Você pode encadear na rota o *on* e o *use* conforme é visto acima, ou seja na rota *check* `io.of('/check')`, quando conectar:

    .on('connect',function(socket){
        socket.emit('server','conectado a rota check');
    })

Podendo ou não ser interceptado por:

    .use(function(socket,next){
        if(Math.random() > 0.49){
            socket.emit('server','tudo certo');
            next();
        }else{
            console.log('erro aleatório');
            socket.emit('server','erro aleatório');
            next(new Error('Erro Aleatorio'));
        }
    });

No caso aleatóriamente a rota bloqueia ou libera o acesso, se o número randomico for mais que **0,5** a requisição continua, senão o mesmo é bloqueado avisando o servidor no banco de dados, detalhe o *socket.emit* em caso de erro nâo chega ao cliente, em caso de erro apenas exibe esse console aqui `console.log('erro aleatório');`. Ou seja se você quiser tratar uma rota você precisa encadear o *use* a função *on*, e com o auxílio do *of* você pode tratar uma url em específica e com o *on* você pode atender quando uma requisição chega ali e é aprovado pelo middleware *use*.