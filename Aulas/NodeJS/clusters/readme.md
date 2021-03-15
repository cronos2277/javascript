# Cluster
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