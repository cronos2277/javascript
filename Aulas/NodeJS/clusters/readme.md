# Usando Cluster
[Modulo OS](#modulo-os)

## Modulo OS
[Documentação](https://nodejs.org/api/os.html)

Você pode começar a usar esse módulo com `require('os');`, ele já vem incluso na instalação do *NODE JS*, sem necessidade de instalar nada. Geralmente importa isso da seguinte forma `const os = require('os');` 

###### Código

    const os = require('os');
    const system = {
        "Arquitetura":os.arch(),    
        "Diretorio do Usuario":os.homedir(),
        "Nome do Host":os.hostname(),
        "Plataforma":os.platform(),
        "Release":os.release(),
        'Type':os.type(),
        'Tempo Ligado':os.uptime()    
    }
    console.log('\nSystema');
    console.log(system);

    const memory = {
        "Memoria Livre":os.freemem(),
        "Memoria Total":os.totalmem()    
    }

    console.log('\nMemoria');
    console.log(memory);

    console.log('\nUser');
    console.log(os.userInfo());

    console.log('\nProcessadores');
    console.log(os.cpus())
### Explicando
`os.arch()` *=>* Informa a arquitetura do sistema.

`os.homedir()` *=>* Informa o diretório *home* do usuário atual.

`os.hostname()` *=>* Informa o nome de host, que usado para identificar a máquina na rede.

`os.platform()` *=>* Retorna uma string que identifica a plataforma do sistema operacional. O valor é definido no tempo de compilação.Valores possíveis são: 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.

`os.release()` *=>* Retorna o sistema operacional como uma string.Em sistemas POSIX, a liberação do sistema operacional é determinada pela chamada `uname(3)`. On *Windows*, `GetVersionExW()` é usado.

`os.type()` *=>* Retorna o nome do sistema operacional como devolvido por `uname(3)`. Por exemplo, retorna `'Linux'` no *Linux*, `'Darwin'` no *macOS*, e `'Windows_NT'` no *Windows*.

`os.uptime()` *=>* Retorna o tempo de atividade do sistema em número de segundos.O valor retornado pode ser impreciso em alguns casos de virtualização raros.A questão surge quando a instância de hóspede virtualizada compartilha o kernel com o sistema host. Devido ao fato de que a Libuv usa um syscall que fornece tempo de atividade do host em vez do tempo de atividade do hóspede no OpenVZ, `os.uptime()` também pode fornecer resultado errôneo.

#### Memória
`os.freemem()` *=>* Retorna a quantidade de memória de sistema livre em bytes como um inteiro.

`os.totalmem()` *=>* Retorna a quantidade total de memória do sistema em bytes como um inteiro.

#### os.userInfo()
>Retorna informações sobre o usuário atualmente eficaz.Em plataformas POSIX, isso é tipicamente um subconjunto do arquivo de senha.O objeto retornado inclui o nome de usuário, `uid`,` gid`, `shell`, e` homedir`.Em "janelas", os campos do `UID` e` Gid` são -1, e `shell` é `null`.

>O valor de Homedir retornou por `os.userInfo()` é fornecido pelo sistema operacional. Isso difere do resultado de `os.homedir()`, que consulta variáveis de ambiente para o diretório inicial antes de voltar à resposta do sistema operacional.

>Lança `SystemError` Se um usuário não tiver **username** ou **homedir**.

#### os.cpus()
Esse método retorna um array contendo informações de cada núcleo da CPU, você pode facilmente pegar o número de thread encadenado com o atributo *lenght*, ficando `os.cpus().lenght`, ou se não pegar uma informação de cada thread dentro do array abaixo:

##### Em cada elemento
`Model` => informa o modelo do processador.

`speed` => frequência em *Mhz*.

###### Times

`user <number>` O número de milissegundos a CPU gastou no modo de usuário.

`nice <number>` O número de milissegundos a CPU gastou no modo legal.

`sys <number>` O número de milissegundos a CPU gastou no modo SYS.

`idle <number>` O número de milissegundos a CPU gastou no modo ocioso.

`irq <number>` O número de milissegundos a CPU gastou no modo IRQ.


###### Output

    Systema
        {
            Arquitetura: 'x64',
            'Diretorio do Usuario': '/home/cronos2277',
            'Nome do Host': 'sirlei-Latitude-E5400',
            Plataforma: 'linux',
            Release: '5.4.0-66-generic',
            Type: 'Linux',
            'Tempo Ligado': 6290
        }

    Memoria
        {
             'Memoria Livre': 137641984,
             'Memoria Total': 4080877568
        }

    User
        {
            uid: 1001,
            gid: 1002,
            username: 'cronos2277',
            homedir: '/home/cronos2277',
            shell: '/bin/bash'
        }

    Processadores
    [
        {
            model: 'Intel(R) Core(TM)2 Duo CPU     P8700  @ 2.53GHz',
            speed: 2179,
            times: { user: 585520, nice: 0, sys: 227050, idle: 4227770, irq: 0 }
        },
        {
            model: 'Intel(R) Core(TM)2 Duo CPU     P8700  @ 2.53GHz',
            speed: 2341,
            times: { user: 589780, nice: 20, sys: 236290, idle: 4262410, irq: 0 }
        }
    ]

## Cluster
### Conceituando o Cluster
>Os clusters permitem a criação de processos filhos, que são diferentes de threads. Threads compartilham o mesmo espaço de memória e criar novas não ocupa muito dos recursos do sistema. Já os processos são executados em espaços de memória próprios, que contém uma cópia completa do sistema. Assim, se memória for um recurso escasso, a criação de vários processos filhos não é algo benéfico. Algo que seria diferente com o uso de threads.

>Esse é o pacote `const cluster = require('cluster');` e é nativo no *nodejs* não precisando instalar nada. Obs nesse exemplo o módulo cluster será instanciado como *cluster*.

[cluster1](cluster1.js)
###### Exemplo Básico

    const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;

    if(cluster.isMaster){

        for(let i = 0;i < numCPUs;i++){
            cluster.fork();
        }

        cluster.on('online', (worker) => {
            console.log(`worker ${worker.process.pid} is online`);
        });
        
    }else{
        http.createServer(function(req,res){
            res.writeHead(200);
            res.write(`Numero de CPU:${numCPUs}\n`);
            res.end(`process ${process.pid} says hello`);
        }).listen(4005);
    }

### isMaster ou isWorker

`cluster.isMaster` => retorna true se o cluster não for um fork.

`cluster.isWorker` => True se o processo não é um mestre (é a negação de `cluster.isMaster`).

### Método Fork
    cluster.fork();

Aqui é criado um fork, mas basta ficar atento ao que é dito aqui [conceito de cluster](#conceituando-o-cluster), de todo modo é dessa forma que você cria um worker, podendo ou não armazena-la em algum lugar.

### Método ON
Funciona como um listener, assim como funciona em outros módulos, você informa via string o evento e passa uma callback para tratar-la, por exemplo no exemplo abaixo, trata-se o inicio de uma conexão, para cada fork criado com o método acima, será chamado o evento *online*, sendo o argumento um objeto do tipo *worker*. [Segue a documentação da classe worker](https://nodejs.org/api/cluster.html#cluster_class_worker)

    cluster.on('online', (worker) => {
        console.log(`worker ${worker.process.pid} is online`);
    });

### E então de maneira assincrona...

    else{
        http.createServer(function(req,res){
            res.writeHead(200);
            res.write(`Numero de CPU:${numCPUs}\n`);
            res.end(`process ${process.pid} says hello`);
        }).listen(4005);
    }

De maneira assincrona é possível executar essa parte do código, no caso, se não for o mestre `cluster.isMaster` será executado essa exceção, ou seja apenas os forks executaram esse *else*. Vale lembrar que será criado um fork de acordo com o número de thread do processador devido ao laço for `for(let i = 0;i < numCPUs;i++)`, mas é sempre bom lembrar que aqui se trata de assincronismo e não de paralelismo. Um exemplo de output desse código seria:

    worker 17176 is online
    worker 17182 is online

### Exemplo um pouco mais avançado
[cluster2](cluster2.js)

###### Código

    const cluster = require('cluster');
    const cpus = require('os').cpus().length;

    if(cluster.isMaster){
        let workers = [];
        for(i=0;i<cpus;i++){        
            cluster.fork();
            workers[i] = cluster.fork();
        } 
    
        cluster.on('online',function(worker){
            console.log(`ONLINE: ${worker.process.pid}`)
        });

        cluster.on('disconnect',function(){
            console.log(`DISCONNECT PELO MASTER`)
        });

        cluster.on('exit',function(){
            console.log(`EXIT PELO MASTER`)
        });

        cluster.on('fork',function(worker){                      
            console.log('Fork');        
        });       

        const time3 = setTimeout(function(){
            workers.forEach(worker => worker.on('disconnect',function(){
                console.log(`DISCONNECT PELO WORKER`);
        }));

        workers.forEach(w => w.disconnect());
            clearTimeout(time3);
        },2000);
    
        const time4 = setTimeout(function(){        
            workers.forEach(w => w.destroy(0,'SIGHUP'));      
            clearTimeout(time4);        
        },3000);    
    }

### Armazenando workers

    let workers = [];
    for(i=0;i<cpus;i++){        
        cluster.fork();
        workers[i] = cluster.fork();
    }

Nesse caso os *forks* são armazenados dentro de um array de modo que possa ser tratado mais tarde.

#### on com evento 'online'
    cluster.on('online',function(worker){
        console.log(`ONLINE: ${worker.process.pid}`)
    });

#### on com evento 'disconnect'
    cluster.on('disconnect',function(){
        console.log(`DISCONNECT PELO MASTER`)
    });

Pode ser usado tanto no *worker* como no *master*, através da chamada do método `destroy`, conforme visto aqui:

    const time4 = setTimeout(function(){        
        workers.forEach(w => w.destroy(0,'SIGHUP'));      
        clearTimeout(time4);        
    },4000);

Você pode passar um código de erro númerico que é o primeiro argumento e o tipo de encerramento em formato string.
#### on com evento 'exit'
    cluster.on('exit',function(){
        console.log(`EXIT PELO MASTER`)
    });

Esse diferente do disconnect funciona apenas com o master.
#### on com evento 'fork'
    cluster.on('fork',function(worker){                      
        console.log('Fork');        
    });     
    
Chamado quando é criado um novo *fork*, nesse exemplo é criado nesse momento:

    let workers = [];
    for(i=0;i<cpus;i++){        
        cluster.fork();
        workers[i] = cluster.fork();
    } 