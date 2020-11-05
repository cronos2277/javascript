# Socket IO

## Documentação
[Socket IO](https://socket.io/docs/)

## Inicializando
rode um `npm i` tanto no [client](./client/) e no [server](./server/), cada pessoa que deseja se loga no chat deve executar o *client* e o *server* deve executar no servidor e apenas uma vez.

### No cliente
No cliente depois de instalar, você deve rodar o comando `ng serve` se quiser rodar.

### No Servidor
No Servidor você precisa rodar o comando `npm start` após instalado.

## Configuração
### No Servidor
[APP.JS](./server/app.js)

#### Configurando
    const settings = {
        port:4444,
        clientEventName:'message'
    }

##### port
Aqui deve ser informado a porta TCP ao qual o servidor vai escutar.

##### clientEventName
O valor informado ali, deve ser igual tanto no backend como no front, ali que é criado a sala virtual. No cliente é informado a sala ao qual ele deve se conectar, no caso a sala ali é a **message**.

### No cliente
[Service](./client/src/app/socket-io.service.ts)

#### this.socket.on, this.socket.emit
    constructor() {        
        this.socket.on('message',(msg:Message) => this.subjectMessages.next(msg));
    }

    public send(msg:Message):void{
        this.socket.emit('message',msg);
    }

##### Explicando
Aqui `'message'` deve estar o nome da sala ao qual você quer se conectar.

#### Configuração de Rede
    private readonly ip:string = 'localhost';
    private readonly tcp:string = '4444';
    private readonly url:string =`http://${this.ip}:${this.tcp}`;  

##### Explicando as configurações de rede
Nesses campos devem ser configurado as configurações de socket do servidor, o endereço e porta do servidor deve ser configurado ali.
