# Javascript Avançado e Funcional
## MAP, FILTER, REDUCE
### Aqui tem um exemplo de como funciona o método .map()
    Array.prototype.meumap = function(callback){
        const arr = [];
        for(i=0;i<this.length;i++){
            arr.push(callback(this[i],i,this));
        }
       return arr;
    }

### Aqui tem um exemplo de como funciona o método .filter()
    Array.prototype.meufilter = function(callback){
        const arr = [];
        for(let i = 0;i<this.length;i++){
            if(callback(this[i],i,this)){
                arr.push(this[i]);
            }
        }
        return arr;
    }

### Aqui tem um exemplo de como funciona o método .reduce()
    Array.prototype.meureducer = function(callback,acc=null){    
        let arr = callback(acc,this[0],0,this);
        for(let i=1;i<this.length;i++){
            arr = callback(arr,this[i],i,this);
        }
        return arr;
    }

### Observações.
Repare que o this nesses métodos acima, faz referência ao próprio array em questão, o **this[i]** é o elemento do array no índice **i**, e o **this** dentro daquele contexto, é o array inteiro. Já o método reduce antes de entrar no **for**, ele executa essa linha: `let arr = callback(acc,this[0],0,this);` aqui ele faz a interação entre o acumulador e o índice zero, uma vez que essa interação seja concluída, entra-se no laço, caso o array tenha mais de um elemento.

## Promise
Você pode ver exemplos avançados de Promise, clicando aqui [PROMISE_AVANCADO](PROMISE_AVANCADO.js)

Promise são promessas, ou seja você só tem o dado quando o processamento é concluído com sucesso **resolve** ou com falha **reject**, além disso exceto que você faça uso de um **await**, você precisa fazer a interação com o dado dentro de um **.then()**, esse método aceita duas callbacks a primeira para resolve e a segunda caso de um erro dentro do escopo daquele **then**. Com **.catch()** você trata erros mais genéricos e com o **.finally()**, você executa uma instrução após todos os **then** ou algum **catch**. O **catch** mais genérico é ignorado, caso o erro seja tratado dentro do **then**. Funcões sinalizadas com **async**, sempre retornam uma promise, detalhe no nodejs você só pode usar um **await** dentro de uma função sinalizada com o async.

## Função pura
[Arquivo exemplo](FUNCAO_PURA.js)
### Exemplo de função pura
    const pura = (a,b) => a + b;
    console.log("Funcao pura: ", pura(2,2));
### Exemplo de função impura
    const comprimento = raio => 2 * Math.PI * raio;
    console.log("Comprimento de 314:",comprimento(314));
### O que é uma função pura?
#### Uma função pura tem três características:
##### 1 - Não deve ser influenciada por variáveis de escopo externos. 
Ou seja a função não pode ter influência externa.
##### 2 - Não deve influenciar valores de escopo externo.
Ou seja as funções não podem alterar valores fora do escopo dela.
##### 3 - Deve haver retorno de valores deterministicos. 
Ou seja deve ser possível saber a saida com certeza dos valores dela, o **NÃO** inclui por exemplo acesso a banco de dados ou acesso a arquivos, uma vez que pode haver algum problema e o acesso aos dados negado, ou seja qualquer o valor não deve ser oriundo de locais aos quais podem haver problemas que podem ou devem ser tratados por um **catch** por exemplo.

## CURRYING
[Arquivo exemplo](CURRYING.js)
### Exemplo
    function somalazy(valor1){
        const fim = Date.now() + 1000;
        while(Date.now() < fim){}
        return function(valor2) {
            return valor1 + valor2
        };
    }
### O que é?
O Curring é uma estratégia de passar N parâmetros um por vez, de modo que se torna possível aumentar o reuso e a execução da mesma de forma *Lazy*. Chamando a função acima:

    const lazy = somalazy(1);
    lazy(1);
    lazy(2);

### Exemplo
Repare que aqui a função foi executado em duas etapas, primeiro chamamos um **somalazy** e atribuimos o resultado a função a uma constante `const lazy = somalazy(1);`, como o **lazy** é uma função que ja resultando do processo da **somalazy** e justamente por essa flexibilidade é possível como o reuso, como nesse caso aqui: `lazy(1);lazy(2);`, graças a essa característica foi permitido o reuso, como nesse caso acima que pudemos usar o **lazy** duas vezes.

## Higher Order Functions
[Arquivo](COMPOSICAO_FUNCAO.js)
#### Criando uma função que aceite função como parametro de função e retorne uma função.
    function composta(...fns){
        return function(arg){
            return fns.reduce((acc,fn) => {
                return fn(acc);
            },arg)
        }
    }

#### Usando a função composta acima
    const somar = s => s + s;
    const multiplicar = m => m * m;
    composta(somar,multiplicar,somar,multiplicar,console.log)(1);

### O que é Higher Order Function?
É justamente a capacidade que a linguagem tem de aceitar uma função como parametro de outra função e a possibilidade de pode retornar uma função.

## Função de primeira classe.
Esse é um conceito ao qual se pode tratar a função como um tipo de dados qualquer, assim como acontece com *String* e *Boolean* por exemplo, como por exemplo: `const funcao = f => console.log(f);`, repare que aqui criamos uma função assim como criamos um tipo de dado qualquer.

### Exemplo de função de primeira classe e Higher Order Function
[Higher Order e First Class arquivo](HIGHER_ORDER_FN-FIRST_CLASS-FN.JS)

## Closure
### Exemplo de Closure
    const d = 4;
    function externo(){
        const a = 1;
        interno();
        function interno(){
            const b = 2;
            intimo();
            function intimo(){
                const c = 3;
                console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
            }
        }
    }

    const a = -1; 
    const b = -2;
    const c = -3;
    externo();

### O que é Closure?
Essa é uma característica que faz com que a função lembre do contexto lexico da onde ela foi escrita, nesse exemplo por mais que exista três variáveis **a**, **b**,**c**  com valores positivos dentro da função e fora da função existe essas mesma variáveis, mas com valores negativos. No caso, como essas três variaveis foram criados dentro da função com valores positivos, logo quando a função é executada a função trabalha com os valores positivos, uma vez que no contexto lexico da função os valores foram definidos como positivos, agora isso não se aplica a **d**, uma vez que essa variável não está dentro do da função **externo** por mais paradoxico que possa parecer. [CLOUSURE](CLOSURE.js)

## Flat, FlatMap
[Exemplo](FLAT-FLATMAP.js)
### Flat
Esse processo consiste colocar todos os dados de dentro de um array no mesmo nível, por exemplo esse array `[1,[2],[[3]],[[4]],[5],6];` se fossemos achatar esse array em **1 nível** ficaria: `[ 1, 2, [ 3 ], [ 4 ], 5, 6 ]` repare que todos os elementos subiram um nível, ou seja o que era um sub-array ficou no nível de array e o que estava dentro de um sub-array agora está no nível de sub-array. Para conseguirmos isso usamos o método **flat**, assim sendo: `[1,[2],[[3]],[[4]],[5],6].flat(1)`, no caso você poderia substituir o **1** pelo nível de achatamento que você deseja, caso que você queira que todos os valores estejam no mesmo nível, por exemplo tranformar isso `[1,[2],[[3]],[[4]],[5],6]` nisso `[ 1, 2, 3, 4, 5, 6 ]` ou seja colocar todos os elementos no mesmo nível então voce pode substituir o numero pelo **infinity**, ficando: `[1,[2],[[3]],[[4]],[5],6].flat(Infinity)`, assim é tudo planificado ou achatado ao mesmo nível dentro do array.

### FlatMap
Você também pode associar uma função durante ao processo de achatamento, no caso é possível executar uma função map em paralelo com o achatamento, nesse exemplo abaixo o array será achatado e terá os seus valores duplicados:

    const array = [1,[2],[[3]],[[4]],[5],6];
    funcaoFlatMap = e => e*2;
    console.log(array.flatMap(funcaoFlatMap));
    
#### Output
Nesse exemplo, o output seria: `[ 2, 4, 6, 8, 10, 12 ]`, ou seja o valor é achatado ou planificado e depois cada valor é dobrado devido a função ` funcaoFlatMap = e => e*2;` passada por parametro.

## Observer
[Exemplo](Observer.js)
### O que é?
O Observer é a base da programação reativa e executada as funções ou métodos inscritos no momento que um evento programado é executado.

### Evento
    const readline = require('readline');
    function evento(pergunta){
        const line = readline.createInterface(
            {
                input:process.stdin,
                output:process.stdout
            });
        return new Promise((resolver,rejeitar) => {
            try{
                line.question(pergunta, function resposta(digitado){
                    resolver(digitado);
                    line.close();
                });
            }catch(error){
                rejeitar(error);
            }
        });
    }
#### Sobre a função
Esse é o evento que será monitorado, no caso a entrada de dados por meio do teclado. Quando a função evento retornar alguma coisa dependendo do que retornar algo será feito. Todo o Observer tem um evento a ser monitorado e esse evento pode ser qualquer coisa, quando esse evento tem uma reação, ai o subscribe reage acionando o Observer.

### Inscrições
    async function inscricoes(pergunta,observadores){
        try{
            const resposta = await evento(pergunta);
            let continuar = true;              
            while(continuar){
                if(resposta.toLowerCase() === 's' || resposta.toLowerCase() === 'y'){
                    (observadores || []).forEach(element => element ({resposta, data: Date.now()}));
                    continuar = false;
                    inscricoes(pergunta,observadores);                
                }else if(resposta.toLowerCase() === 'n'){
                    continuar = false;
                    inscricoes(pergunta,observadores);
                }else{
                    continuar = false;
                }
            }       
        }catch(error){
            console.error(error);
        }
    }

#### Sobre a Inscrição.
Nessa função acima que o objeto ou função será inscrito, a classe de inscrição será a classe que irá monitorar o evento e caso ocorra algo no evento, a inscricao avisa o observer.

### Observador
    const  observador1 = objeto => console.log("Observador 1", objeto);
    const  observador2 = objeto => console.log("Observador 2", objeto);

### Sobre o observador
Esses são os métodos que o **subscribe**, no caso a função **inscricoes** deve executar quando o evento ocorrer.

### Executando
    inscricoes("Voce deseja executar o evento? Respostas(S => Sim /N => Nao /X => Sair)",[observador1,observador2]);

Inscrições recebe a mensagem a ser exibida pedindo a interação dos usuário e mostrando entre os parenteses as opções como primeiro parametro, após isso no segundo parametro temos um array contendo os Observer que devem ser executados, caso o evento ocorra.

## Observable
[Olhar o arquivo com o Código](Observable.js)
### Estrutura
    function Observavel(){
        return {
            iniciar(callback, tempo = 1000){
                let num = 0;
                const intervalo = setInterval(
                    _ => callback(num++),
                    tempo
                );
                return{
                    parar(){
                        clearInterval(intervalo);
                    }
                };
            },        
        }
    }

### Explicando o Interior do Observable.
Esse seria de maneira bem simplificada, como funciona um **Observable**, para começar chamamos a função `Observavel` e colocamos o seu valor dentro de uma constante: 

    const observavel = Observavel();

### Depois de chamado a funcao...
Essa função retorna uma outra função, que é a função `iniciar`, essa função recebe dois parametros, o primeiro que é obrigatório, que seria uma callback a ser executada periodicamente e o segundo já opicional é a frequencia com que essa função de callback vai ser executado. Nesse exemplo passamos o `console.log` como callback e *500 milessegundos* como segundo parâmetro. No caso seria aqui que seria o equivalente a uma inscrição em um Observer, além disso também é retornado uma função que se chamada fará a desinscrição desse observable.  

    const inscricao = observavel.iniciar(console.log,500);

### Parando a execução...
Aqui paramos a execução da inscrição, ou seja após 10 segundos é dado a desinscrição e a função `parar` retornada acima se encarrega disso:

    setTimeout(
        _ => inscricao.parar(),
        10000
    );

#### Output
    0
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    11
    12
    13
    14
    15
    16
    17
    18
    [Done] exited with code=0 in 10.11 seconds

### Streaming envolvendo array
[Exemplo Streaming](Streaming.js)
#### Função
    function streaming(array){
        return{
            iniciar(fn,tempo = 500,comecarPor = 0){
                const intervalo = setInterval(
                    () => {
                        if(array.length > comecarPor){
                            fn(array[comecarPor++]),
                            tempo
                        }else{
                            clearInterval(intervalo);
                        }
                    },tempo                
                )            
            }        
        }
    }
#### O que essa função faz?
A função eleva ao quadrado todos os números de um array dentro de um intervalo e posição especificada.

#### Chamando a função acima    
    streaming([0,1,2,3,4,5,6,7,8,9,10]).iniciar(e => console.log(`${e}² = ${e*e}`));

#### Output dessa função envolvendo arrays.

    0² = 0
    1² = 1
    2² = 4
    3² = 9
    4² = 16
    5² = 25
    6² = 36
    7² = 49
    8² = 64
    9² = 81
    10² = 100
    [Done] exited with code=0 in 6.115 seconds

## Usando a Biblioteca Rxjs.
[Exemplo Básico](rxjs/basico.js)
### Instalação
Para instalar essa biblioteca `npm i rxjs` o nome do pacote é **rxjs**.

### interval
    const {interval} = require('rxjs');

    const intervalo = interval(500);
    const intervalo_inscricao = intervalo.subscribe(
        e => console.log(`e = ${e}`), 
    );

    setTimeout(
        () => intervalo_inscricao.unsubscribe(),
        5000
        );

##### Explicando:
Aqui chamamos a biblioteca `const {interval} = require('rxjs');`, aqui começamos a usa-la `const intervalo = interval(500);`, o **500** é a quantidade de milissegundos, esse Observable ele é semelhante a um *foreach*, porém você pode definir o tempo entre uma interação e outra, no caso a cada *500 milisegundos* ele irá incrementar um valor numérico e inteiro que começará em zero, no caso esse valor seria uma variavél contadora que será incrementada apartir da inscrição: 

    const intervalo_inscricao = intervalo.subscribe(
        e => console.log(`e = ${e}`), 
    );

##### Explicando a callback acima.
No caso a cada 500 milisegundos será realizado uma iteração e essa calback recebe o valor que é a variável contadora, incrementada a cada *500 milissegundos*, nesse exemplo, com o valor **e** começando com zero e aumentando o seu valor em um a cada iteração que no exemplo ocorre a cada *500 milissegundos*.. 

#### Unsubscribe

    setTimeout(
        () => intervalo_inscricao.unsubscribe(),
        5000
    );

No caso existe um método que é responsável pelo unsubscribe: `intervalo_inscricao.unsubscribe()`, essas funções retornam esse método. No caso usamos o *setTimeout* para fazer isso após cinco segundos.

### From encadeado

    from([
        parseInt(Math.random() * 100),parseInt(Math.random() * 100),
        parseInt(Math.random() * 100),parseInt(Math.random() * 100),
        parseInt(Math.random() * 100),parseInt(Math.random() * 100)
    ]).subscribe(
        e => console.log(`From ${e}`)
    ).unsubscribe();

### Explicando
O from funciona com base em um array, no caso passamos um array cuja o seu valor é um numero inteiro aleatório entre 0 e 100. Na inscrição foi passado uma callback que vai imprimir esse valor no console e pois fim já é feito a desinscrição automaticamente.

## Usando Observable
### Importando
    const {Observable} = require("rxjs");

### Observable vs Promise.
O promise ele retorna um valor uma vez quando você chama o **resolve** ou retorna um erro quando você retorna um **reject**. No caso o Observable pode retornar **N** resolve através do **next**, sendo cada next o equivalente a um resolve das promises e  o complete que o método que é chamado quando o Observable for concluído.

#### new Observable(callback);
    const observable1 = new Observable(
        subject => {
            subject.next("Acao 11");
            subject.next("Acao 12");
            subject.next("Acao 13");
            if(Math.random() > 0.5){
                subject.complete();
            }else{
                subject.error("Erro Controlado 1.");
            }
        }
    );

##### usando o observable
    observable1.subscribe(
        console.log,
        console.error,
        () => console.warn("Concluido com sucesso 1!")
    );

#### subscribe
O *subscribe* recebe três callback, uma que será usada nos *next*, que seria os vários *then* do *observable*, a segunda que seria o *error*, no caso a caso de erro será chamado essa, que será executando quando for sinalizado um erro dentro do observable. Quando for concluido sem erros será chamado a terceira callback.

### Usando o metodo create

    const observable2 = Observable.create(
        subject => {
            subject.next("Acao 21");
            subject.next("Acao 22");
            subject.next("Acao 23");
            if(Math.random() > 0.5){
                subject.complete();
            }else{
                subject.error("Erro Controlado 2.");
            }
        }
    );

#### método create
você pode instanciar e passar a callback como parametro ou fazer isso através do método create.

#### dando subscribe passando objeto

    observable2.subscribe({
        next(valor){
            console.log(valor)
        },
        error(erro){
            console.error(erro)
        },
        complete(){
            console.warn("Concluido com sucesso 2!")
        }
    })

##### Explicando
Além de passar três callback, você pode passar um objeto que contenha o metodo **error**, **complete** e o **next**.

##### Output
    Acao 11
    Acao 12
    Acao 13
    Erro Controlado 1.
    Acao 21
    Acao 22
    Acao 23
    Concluido com sucesso 2!
    [Done] exited with code=0 in 0.179 seconds

### OF
#### Exemplo
    of(1,2,3,4,5,6,7,8,9)
    .subscribe(
        e => console.log(`${e}³ = ${e*e*e}`)
    );

#### Output
    1³ = 1
    2³ = 8
    3³ = 27
    4³ = 64
    5³ = 125
    6³ = 216
    7³ = 343
    8³ = 512
    9³ = 729
#### Explicando
o Operador **Of** funciona com dados, ele é semelhante ao *From*, porém o *From* recebe um array e o *of* recebe **n** parametros.

### AJAX com RXJS
[Exemplo de Ajax](rxjs/ajax.js)
#### Explicando
Inicialmente importamos o módulo que gera observable com base no ajax `const {ajax} = require('rxjs/ajax')`, alem disso também precisamos importar um módulo para fazer a requisição ajax, uma vez que o node não faz isso por padrão, no caso se quiser fazer solicitação ajax no node js precisamos importar `const {XMLHttpRequest} = require('xmlhttprequest');`.

##### console.log: const {ajax} = require('rxjs/ajax');
    [Function: create] {
        get: [Function: ajaxGet],
        post: [Function: ajaxPost],
        delete: [Function: ajaxDelete],
        put: [Function: ajaxPut],
        patch: [Function: ajaxPatch],
        getJSON: [Function: ajaxGetJSON]
    }

##### console.log: const {XMLHttpRequest} = require('xmlhttprequest');
    {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE: 4,
        readyState: 0,
        onreadystatechange: null,
        responseText: '',
        responseXML: '',
        status: null,
        statusText: null,
        withCredentials: false,
        open: [Function],
        setDisableHeaderCheck: [Function],
        setRequestHeader: [Function],
        getResponseHeader: [Function],
        getAllResponseHeaders: [Function],
        getRequestHeader: [Function],
        send: [Function],
        handleError: [Function],
        abort: [Function],
        addEventListener: [Function],
        removeEventListener: [Function],
        dispatchEvent: [Function]
    }

#### Usando o módulo do ajax
##### Exemplo de uso
    const {XMLHttpRequest} = require('xmlhttprequest');
    const {ajax} = require('rxjs/ajax');
    ajax({
        method:"get",
        url: "https://httpbin.org/get",
        createXHR: () => new XMLHttpRequest()
    }).subscribe(console.log,console.error);

##### Explicando os parametros da função ajax:
    ajax({
        method:"get",
        url: "https://httpbin.org/get",
        createXHR: () => new XMLHttpRequest()
    })

`method` => método da requisição, nesse exemplo usamos o get, mas poderia ser *post*, *delete*, *update*, etc... Padrão é **GET** se omitido.

`url` => A url ao qual será deve ser feita a requisição.

`createXHR` => Aqui passamos uma função callback que vai construir o objeto ao qual fará a requisição, se fosse o caso poderiamos fazer costumização aqui `new XMLHttpRequest()`.

### Operadores PIPE
[Arquivo com exemplo de operadores](rxjs/operadores.js)

##### Código
    const {noop,map,concatAll} = require('rxjs/Operators');
    const {Observable} = require('rxjs');
    const observable$ = new Observable(
        subscribe => {
            try{
                let array = [];
                for(let i=0;i<3;i++){
                    array[i] = i;
                }
                subscribe.next(array);
            }catch(error){
                subscribe.error(error)
            }finally{
                subscribe.complete()
            }
        }
    );
    observable$
    .pipe(
        map(e => e), //Aplica uma funcao aos dados, no caso nao faz nada
        concatAll(), //Aqui esta sendo usando para planificar o array que recebe.
    )
    .subscribe(
        e => console.log(`dado: ${e}`),
        noop, //Esse operador faz com que nada seja executado, ele eh o no operations
        noop
    );

##### Focaremos aqui
    observable$
        .pipe(
            map(e => e), //Aplica uma funcao aos dados, no caso nao faz nada
            concatAll(), //Aqui esta sendo usando para planificar o array que recebe.
        )
        .subscribe(
            e => console.log(`dado: ${e}`),
            noop, //Esse operador faz com que nada seja executado, ele eh o no operations
            noop
        );

`noop` => Faz com que não seja executado nada, quando esse evento for chamado, seria como colocar um `null` ali.

`map` => Aplica uma função em cada dado passado pelo Pipe.

`first` => Pega o primeiro valor do observable.

`last` => Pega o ultimo valor do observable.

#### concatAll
`concatAll` => Executa um spread nos dados.

##### Output em um array [0,1,2] Com esse operador concatAll
    dado: 0
    dado: 1
    dado: 2
    [Done] exited with code=0 in 0.241 seconds

##### Sem esse operador
    dado: 0,1,2
    [Done] exited with code=0 in 0.245 seconds

## Assincronismo
[Arquivo de exemplo](rxjs/Assincronismo.js)
##### Código
    const { from, asyncScheduler,queueScheduler,asapScheduler } = require('rxjs');
    const {observeOn} = require('rxjs/operators');
    console.time("#tempo");
    console.log("Iniciando...");

    const observer$ = from([0,1,2,3]);

    observer$.pipe(    
        observeOn(asyncScheduler)    
    ).subscribe(
        console.log,
        console.error,
        () => console.log('asyncScheduler assincrono concluido\n\n')
    );

    observer$
    .pipe(
        observeOn(queueScheduler)
    ).subscribe(
        console.log,
        console.error,
        () => console.log("queueScheduler assincrono concluido\n\n")
    );

    observer$
    .pipe(
        observeOn(asapScheduler	)
    ).subscribe(
        console.log,
        console.error,
        () => console.log("asapScheduler assincrono concluido\n\n")
    );
    console.log("Finalizando...")
    console.timeEnd("#tempo");

##### Output
    Iniciando...

    0
    1
    2
    3
    queueScheduler assincrono concluido

    Finalizando...
    #tempo: 6.571ms

    0
    1
    2
    3
    asapScheduler assincrono concluido

    0
    1
    2
    3

    asyncScheduler assincrono concluido
    [Done] exited with code=0 in 0.246 seconds

### Importando
    const { from, asyncScheduler,queueScheduler,asapScheduler } = require('rxjs');
    const {observeOn} = require('rxjs/operators');

O observeOn será usado usando um desses operadores por exemplo `asyncScheduler,queueScheduler,asapScheduler`. Como nesse exemplo abaixo.

    observer$
    .pipe(
        observeOn(asapScheduler	)
    ).subscribe(
        console.log,
        console.error,
        () => console.log("asapScheduler assincrono concluido\n\n")
    );

### observeOn
Esse operador faz com que o observable seja executado me maneira assincrona e pode ser importado dessa forma: `const {observeOn} = require('rxjs/operators');`

#### Sobre os operadores a serem usados no observeOn

`null` => As notificações são entregues de forma síncrona e recursiva.

`queueScheduler` => Programações em uma fila na estrutura de eventos atual. Use isso para operações de iteração.

`asapScheduler` => Programações na fila de microtarefas, que é a mesma fila usada para promessas. Basicamente após o trabalho atual, mas antes do próximo trabalho. Use isso para conversões assíncronas.

`asyncScheduler` => Os agendamentos funcionam com setInterval. Use isso para operações baseadas em tempo.

`animationFrameScheduler` => Agenda a tarefa que acontecerá antes do próximo quadro do navegador. Pode ser usado para criar animações de navegador suaves.

### Informações
[Para mais informações](https://rxjs-dev.firebaseapp.com/guide/scheduler)

### Map, MergeMap
[Arquivo com exemplos](rxjs/mergemap.js)
#### Código
    const {from} = require('rxjs')
    const {mergeMap,map} = require('rxjs/operators')
    const obs1 = from(['A','B','C','D','E']);
    const obs2 = from([1,2,3,4,5]);
    obs1
    .pipe(
        mergeMap(n1 => obs2.pipe(map(n2 => `${n1} => ${n2}`)))    
    )
    .subscribe(console.log);

#### Output:
    A => 1
    A => 2
    A => 3
    A => 4
    A => 5
    B => 1
    B => 2
    B => 3
    B => 4
    B => 5
    C => 1
    C => 2
    C => 3
    C => 4
    C => 5
    D => 1
    D => 2
    D => 3
    D => 4
    D => 5
    E => 1
    E => 2
    E => 3
    E => 4
    E => 5

    [Done] exited with code=0 in 0.241 seconds

#### Explicação
O operador Map permite que um cada elemento de um array seja manipulado e retornado, assim como qualquer método **.map** de um array do javascript. Porém o operador **mergeMap** ele permite com que seja possível combinar dois, de modo que cada elemento do primeiro observable possa interagir individualmente com cada elemento do segundo observable. Nesse caso tivemos dois observables, um contendo um array de letras e outro de números, com o auxilio de um operador map, foi possível fazer com que os dois operadores pudessem interagir.
    
    mergeMap(n1 => obs2.pipe(map(n2 => `${n1} => ${n2}`))) 

`mergeMap(callback)` => O parametro essa callback, corresponde ao atual valor do observable, ou seja o valor atual emitido pelo **next**.

Uma vez feito isso dentro da `callback` você da um pipe, mas sem se inscrever no segundo observable, você apenas chama o método pipe: `obs2.pipe(outracb)`.

`outracb` => Dentro dessa callback você faz a interação entre o valor atual do primeiro observable e o valor atual do segundo observable, ou seja dessa forma é possível sincronizar o next dois dois observables, como ocorre aqui: ``n2 => `${n1} => ${n2}``

## Subjects
[Arquivo Subject](rxjs/subject.js)
#### Código completo
    const {Observable, Subject} = require('rxjs');

    function getObservable(){
        return new Observable(
            function(subscribe){
                subscribe.next(Math.random());
                subscribe.complete();
            }
        );
    }

    const obs1 = getObservable();
    obs1.subscribe(e => console.log(`Obs1 = ${e}`));
    const obs2 = getObservable();
    obs2.subscribe(e => console.log(`Obs2 = ${e}`));

    //Exemplo com Subject
    const subject = new Subject(); 
    const numero = Math.random();
    subject.subscribe({
        next: callback => callback(numero)
    });        

    subject.next(e => console.log(`sub1 = ${e}`));
    subject.next(e => console.log(`sub2 = ${e}`));
#### Output completo
    [Running] node "c:\Users\crono\OneDrive\Área de Trabalho\javascript\Aulas\Javascript\avancado\rxjs\subject.js"
    Obs1 = 0.2909042459565543
    Obs2 = 0.6400543893082804
    sub1 = 0.7825865903683205
    sub2 = 0.7825865903683205

    [Done] exited with code=0 in 0.186 seconds

#### Parte do output com numero aleatório referente ao Subject
sub1 = 0.7825865903683205
sub2 = 0.7825865903683205

#### Parte do output com numero aleatório referente ao Observable
Obs1 = 0.2909042459565543
Obs2 = 0.6400543893082804

### Código apenas com o subject
    //Exemplo com Subject
    const subject = new Subject(); 
    const numero = Math.random();
    subject.subscribe({
        next: callback => callback(numero)
    });        

    subject.next(e => console.log(`sub1 = ${e}`));
    subject.next(e => console.log(`sub2 = ${e}`));

### Como funciona
Um subject funciona de maneira oposta ao Observable, no caso você dá um subscribe no subject  `subject.subscribe({next: callback => callback(numero)}); ` e após o subscribe, você pode chamar o **next**, ou o **error** ou o **complete** que na hora que for chamado irá executar de maneira uniforme, ou seja irá passar o mesmo dado para todos o **next**, como nesse exemplo abaixo:
##### Exemplo
``subject.next(e => console.log(`sub1 = ${e}`));`` => sub1 = 0.7825865903683205
    
``subject.next(e => console.log(`sub2 = ${e}`));`` => sub2 = 0.7825865903683205

### Multicast
O subject é interessante caso queira passar o exato mesmo dados a todas as fontes como é esse exemplo, que executa o next com o mesmo dado aleatório nos dois next diferente do Observable que distribui um dado diferente para cada requisição.

### subscribe primeiro, next, error ou complete depois...
Inicialmente voce cria a função geradora de dados dentro do subscribe com um objeto ou passando 3 callbacks como argumento, como o **subscribe** do *Observable*, uma vez que eles se assemelham na forma mas se diferem no comportamento, após isso você usa o **.next** para passar o dado, toda vez que você executar o *next*, será executado a callback do next e o mesmo acontece com o error que pode estar em um bloco catch, ou até mesmo o complete quando o processamento terminar e você não quiser mais emtir o mesmo dado. Um subscribe pode ser interessante para criar um **Hot Observable**, ou seja um Observable que compartilha o mesmo dado com todos os seus inscritos.

## Lambda Functions
[Arquivo de exemplo](lambda.js)
### Explicando
No arquivo acima tem exemplo com lambda e como criar valores booleanos com base em função, tudo isso com base na função que retorna o primeiro argumento, outra que retorna o ultimo e com base nisso sao construidas funções que retornam em base de: **AND**, **OR**, **XOR**, **XNOR**.
