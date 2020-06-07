import { Component, OnInit } from '@angular/core';
import { Subscription, from, of, interval, Subject, fromEvent, Observable, timer, Observer } from 'rxjs';
import { delay, map, filter, tap, first, last, take, debounceTime, takeWhile, takeUntil, catchError,retry, retryWhen, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.css']
})
export class OperadoresComponent implements OnInit {
  public classe:string = "";
  constructor() { }

  ngOnInit() {
    this.debouceTimeFuncao();
  }
  /*
    Aqui temos um exemplo de como funciona o pipe,
    o pipe ele faz o processamento, antes do dado
    passar pela inscricao, ou seja nele voce 
    pode fazer o processamento de dados de um 
    observable.
  */

  //Exemplo do uso do Map
  public pipeMap():void{
    const fonte = from([1,2,3,4,5,6,7,8,9]);   
    const inscricao:Subscription = fonte.pipe( //Aqui que acontece o PIPE.
      /*
        Aqui temos um basico exemplo de como funciona,
        o operador map, quando usado ele funciona pegando
        cada dado e dando um tratamento a eles, 
        no caso o seu funcionamento eh parecido com
        o metodo Map dos arrays. No exemplo abaixo
        cada dado eh pego e multiplicado por 2.
        Ou seja a entrada dos dados vai do numero 1
        ate o 10, porem como temos o pipe teremos
        uma saida de dados que vai de 2 a 20, ou
        seja cada ciclo eh multiplicado por 2.
      */  
      //Uma vez que o from passa um elemento de array por vez.    
      map(cadadado => 2*cadadado)
    ).subscribe(
        msg => console.log(msg),
        erro => console.error(erro),
        () => console.log("Execucao do MAP concluida!")
    );
      inscricao.unsubscribe();      
  }

  //Exemplo do uso Delay
  public pipeDelay():void{
    let fonte = from([1,2,3,4,5,6,7,8,9]);
    /*
      Aqui voce esta usando o pipe de maneira
      nao encadeda, para isso voce precisa
      fazer o pipe retornar o proprio Observable,
      no proprio observable.
    */
    fonte = fonte.pipe( //Repare que o pipe esta reescrevendo o Objeto.
      /*
        O Delay eh um outro operador, no caso ele retarda o atraso da 
        execucao do subscribe, no caso o tempo eh informado em milisegundos.
        No caso, depois de 3 segundos ocorre a multiplicacao dos dados 
        que o mesmo recebe por 3, apos concluido o prazo do delay.
      */
      delay(3000),
      //Voce pode usar mais de um operador, esse operador triplica o cada valor,
      //Uma vez que o from passa um elemento de array por vez.
      map(e => 3*e) 
    );

    //Aqui eh feito a inscricao, repare que o pipe nao esta encadeado.
    const inscricao = fonte.subscribe(
        msg => console.log(msg),
        error => console.error(error),
        () => console.log("Execucao do PIPE Delay")      
    );
    /*
      Dessa forma voce pode fazer a desisncricao, bom cuidado
      ao fazer a desiscricao quando for usar o delay, pois dependendo
      do caso o observer pode ser desinscrito antes de executar.
      Aqui usamos o setInterval, como nao foi passado os milisegundos
      como segundo parametro, ele fica executando em segundo plano
      executando a funcao, entao cuidado com isso. Ou seja o setInterval
      pode ser executado fora de periodicidade e de maneira assincrona,
      porem erros ai, pode deixar a aplicacao onerosa.
      Dentro de um objeto Subscribe existe um atributo: "inscricao.closed"
      com base nesse atributo voce pode saber quando a operacao foi
      concluida, ou seja ele passa a ser true depois de executada a
      callback de complete dos Observables.
    */
    let interval = setInterval( //Precisamos atribuir a uma variavel para pode, limpa-lo depois.
      () =>{ //Funcao callback do setInterval
        if(inscricao.closed){
          console.log("Concluido! Desinscrevendo Observable do exemplo do Delay");
          inscricao.unsubscribe(); //Desiscrevendo.
          //Aqui limpamos o interval, faca isso, se nao o processo fica executando em loop.
          clearInterval(interval); 
        }
      } //Repare que nao ha parametro de tempo.
    );
  }

  public funcaoTap():void{
    /*
      Como voce pode ver o Pipe funciona com outros
      operadores e voce tambem pode encadear todo o processo,
      desde o acesso aos dados, o pipe, a inscricao e depois
      a desisncricao. Ou seja aqui nos temos todo o ciclo
      do observable encadeado, repare que o ponto e virgula
      esta depois de todo o codigo abaixo, indicando que 
      tudo isso eh uma instrucao apenas, mas toda encadeda.
      Alem do encadeamento e do uso da funcao OF, temos 
      dentro do PIPE o operador tap. O TAP ele executa
      o processamento de dados, mas sem retornar nada,
      repare que tem um console.log dentro do pipe, 
      no caso o console.log, retorna undefined e gracas
      ao operador tap voce evita a corrupcao dos dados,
      o TAP pode ser de grande valia caso voce queira
      dar um console.log ou rodar qualquer funcao que 
      retorne void ou undefined, mas sem que isso
      interfira nos valores dos dados. Lembrando sempre
      o tap nao interfe nos dados, e ele geralmente 
      eh usado para dar funcoes do tipo console.log
      no meio do pipe. O Tap abaixo tem uma funcao
      arrow simplificada, ou seja a funcao arrow
      que tem um retorno implicito, por mais que
      haja esse retorno implicito, essa funcao nao
      retornara nada, ou seja nada mesmo, nem VOID,
      nem NULL e nem Undefined. Outra coisa 
      os parametros no PIPE, quando usando dentro 
      de um contexto de of, o valor do parametro
      aqui eh um array com todos os valores, devido
      a natureza do of().
    */
    of([0,1,2,3,4,5,6,7,8,9]).pipe(
      tap(e => console.log('Console no meio do pipe'))
    ).subscribe(
      msg => console.log(msg),
      error => console.error(error),
      () => console.log("TAP Concluido")
    ).unsubscribe(); //Desinscricao eh feito de modo encadeado.
  }

  public filtroFunction():void{
    let fonte = from([0,1,2,3,4,5,6,7,8,9,10]);
    fonte.pipe(
      //Repare que os TAPS nao interfere no valor.
      tap(e => console.log(`Verificando se o valor ${e} eh par.`)),
      /*
        O filter funciona igual ao metodo filter dos arrays.
        Dentro desse filter voce programa uma regra de negocios
        que retorna o valor verdadeiro ou falso, caso o retorno
        seja verdadeiro o valor eh mantido, caso o retorno seja
        falso o valor eh excluido. Nesse exemplo verificamos se
        eh par, se for eh exibido no console.log do metodo subscribe,
        caso seja impar, ele nao sera exibido no console.log do subscribe
      */
      filter(cada => cada % 2== 0),
      //Repare que o tap exibe uma mensagem para cada elemento do from
      tap(e => console.log((e%2==0)?"Eh par vai ser incluido":"nao eh par, nao vai ser incluido"))
    ).subscribe(
      numero => console.log("%c O Número par incluido: "+numero,"background-color:black;color:white;font-size:16px"),
      erro => console.error(erro),
      () => console.log('Execucao concluida com sucesso')
    ).unsubscribe();
  }

  /*
    First, take, last.
    Esses tres operadores que podem ser usados dentro do pipe, sendo:
    first => vai apenas pegar o primeiro dado da fonte, executar a 
    callback de complete se houver e depois desinscrever.
    last => vai apenas pegar apenas o ultimo dado da fonte, executar a 
    callback de complete se houver e depois desinscrever.
    Take(numeroDeDadosAPegar) => vai apenas pegar a quantidade de dado informado
    da fonte, executar a callback de complete se houver e depois desinscrever.
    Esses tres metodos executam tanto o metodo de complete como a desiscricao.
    Nenhum outro metodo do pipe sera executado depois do last e first no pipe.
  */
  public firstFuncao():void{
    let fonte = from([1,2,3,4,5,6,7,8,9,10]);
    fonte = fonte.pipe(
      tap(e => console.log(`valor processado antes do first ${e}`)),
      first(), //Operador first
      tap(e => console.log(`valor processado depois do first ${e}`)) //Sera ignorado.
    );
    const subscribe = fonte.subscribe(
      msg => console.log(` %c Valor pego: ${msg}`, "background-color:black;color:white;font-size:16px"),
      erro => console.error(erro),
      () => console.log(`
          Foi chamado a callback de conclusao pelo
          metodo do pipe, que ira chamar depois o
          unsubscribe, uma vez que o metodo complete
          termine a sua execucao.
      `)
    );

    //Verificando se o observer foi desinscrito.
    const intervalo = setInterval(
      () => {
        if(subscribe.closed){
          console.warn("Inscricao encerrada!");
          clearInterval(intervalo);
        }
      }
    );
  }

  //Operador Last
  public lastFuncao():void{
    let fonte = from([1,2,3,4,5,6,7,8,9,10]);
    fonte = fonte.pipe(
      tap(e => console.log(`valor processado antes do last ${e}`)),
      last(), //Operador last aqui.
      tap(e => console.log(`valor processado depois do last ${e}`)) //Sera ignorado.
    );
    const subscribe = fonte.subscribe(
      msg => console.log(`%c Valor pego: ${msg}.`,"background-color:black;color:white;font-size:16px"),
      erro => console.error(erro),
      () => console.log(`
          Foi chamado a callback de conclusao pelo
          metodo do pipe, que ira chamar depois o
          unsubscribe, uma vez que o metodo complete
          termine a sua execucao.
      `)
    );

    //Verificando se o observer foi desinscrito.
    const intervalo = setInterval(
      () => {
        if(subscribe.closed){
          console.warn("Inscricao encerrada!");
          clearInterval(intervalo);
        }
      }
    );
  }

  //Operador Take
  public takeFuncao():void{
    let fonte = from([1,2,3,4,5,6,7,8,9,10]);
    fonte = fonte.pipe(
      tap(e => console.log(`valor processado antes do take: ${e}`)),
      take(5), //No take voce deve informar quantos dados voce quer pegar.
      tap(e => console.log(`valor processado depois do take: ${e}`)) //Sera exibido.
    );
    const subscribe = fonte.subscribe(
      msg => console.log(`%c Valor pego: ${msg}`, "background-color:black;color:white;font-size:16px"),
      erro => console.error(erro),
      () => console.log(`
          Foi chamado a callback de conclusao pelo
          metodo do pipe, que ira chamar depois o
          unsubscribe, uma vez que o metodo complete
          termine a sua execucao.
      `)
    );

    //Verificando se o observer foi desinscrito.
    const intervalo = setInterval(
      () => {
        if(subscribe.closed){
          console.warn("Inscricao encerrada!");
          clearInterval(intervalo);
        }
      }
    );
  }
  /*
    Take while e Take until pode ser util caso
    voce queira trabalhar com Observables do
    tipo interval ou timer. Assim como o take,
    uma vez que a condicao eh concluida, se
    executa o metodo complete e depois a
    desiscricao.
    Take while => assim como o filter,
    ele aceita uma callback que deve
    retornar true ou false, enquanto a
    callback estiver retornando true
    a continuacao executa.
    TakeUntil, funciona igual ao while,
    o porem ele aceita como parametro
    um observable e depois de executado
    todos os next e o complete ow erro
    do observable usado como parametro
    ai se executa a callback complete
    e depois a desinscricao.
  */
  public takeWhileFunction(){
    /*
      Aqui fica claro que funcoes do tipo
      From, Of, FromEvent, interval, geram
      observables, analise a linha abaixo e veja.
    */
    let fonte:Observable<any> = interval(500);    
    fonte = fonte.pipe(
      /*
        O value e o index comecam com o valor e vao
        sendo incrementado em 1. Os dois valores sao
        iguais, mas o value permite manipulacao.
      */
      takeWhile((value,index) => { 
        //Voce pode manipular qualquer um dos dois e compara-los,
        //justamente por isso o takewhile permite que voce usa dois valores.
        value *= 2;         
        console.log("Valor TakeWhile: "+value);
        console.log("Indice TakeWhile: "+index);  
        //Quando a callback retornar false o complete eh chamado.     
        return (value < 20)?true:false; 
      })
    );

    const inscricao = fonte.subscribe(
      (msg) => console.log("%c Valor pego TakeWhile: "+msg,"color:green"),
      (erro) => console.error(erro),
      () => console.warn("Exemplo Take While encerrado!")
    );

    //Verificando a desinscricao, quando concluido.
    const intervalo = setInterval(
      () => {
        if(inscricao.closed){
          console.warn("TakeWhile concluido e desinscrito!");          
          clearInterval(intervalo);
        }
      }
    );
  }
  /*
    TakeUntil tem como condicao um Observable. Ele executa
    os passos do Observable e quando o Observable der complete
    o takeUntil execute a callback complete e depois encerra
    a inscricao.
  */
  public takeUntilFunction(){
    //Criando o Observable que vai usar o takeUntil.
    let fonte:Observable<any> = interval(500);
    //Criando o Observable condicional.
    const condicao:Observable<any> = timer(10000)
    fonte = fonte.pipe(
      tap(_=> console.log("%c Valor de TakeUntil antes: "+_, "color:blue")),
      takeUntil(condicao), //Depois de executado o Observable condicional, encerra-se
      tap(_=> console.log("%c Valor de TakeUntil depois: "+_, "color:blue"))
    );

    const inscricao = fonte.subscribe(
      (msg) => console.log("%c Valor pego TakeUntil: "+msg,"color:blue"),
      (erro) => console.error(erro),
      () => console.warn("Exemplo Take Until encerrado!")
    );

    //Verificando a desinscricao, quando concluido.
    const intervalo = setInterval(
      () => {
        if(inscricao.closed){
          console.warn("TakeWhile concluido e desinscrito!");          
          clearInterval(intervalo);
        }
      }
    );

  }

  /*
    O DebouceTime suspende a ocorrencia de eventos que se executam em 
    um intervalo de tempo inferior ao informado, ou seja, qualquer 
    evento que tem uma frequencia inferior a 3 segundos(nesse caso em especifico),
    sera ignorado. No exemplo abaixo colocamos que o botao debounceTime apenas
    execute o metodo onclick associado a ele apenas uma vez a cada 3 segundos.
    Dessa forma enquanto o botao estiver vermelho, por mais que o usuario clique,
    nao ocorrera o evento associado a ele. Essa funcao pode ser interessante, 
    caso o excesso de interacao do evento por parte do usuario possa ter algum 
    efeito colateral, dessa forma voce pode restringir a quantidade de interacao
    do usuario a uma dentro de um tempo especifico. Em resumo o codigo abaixo,
    impoe ao usuario a execucao do evento 1 click a uma execucao maxima de uma
    vez a cada 3 segundos, por mais que o usuario nao respeite esse tempo.
    Util para usar em conjunto com um Observable fromEvent()
  */
  private debouceTimeFuncao(){
    const milisegundos = 3000; //Aqui eh definido os milisegundos, nesse caso 3 segundos
    let fonte = fromEvent(document.getElementById('debounceTime'), 'click');
    fonte = fonte.pipe(
      //Com o Tap executado antes, colocamos a cor vermelha registrando classe ao componente.
      tap(_ => this.classe = "cor"), 
       //Repare que a funcao usa como parametro os milisegundos definidos acima.
      debounceTime(milisegundos),
      //Caso a frequencia do evento respeite a condicao pelo debouceTime, tiramos a cor.
      tap(_ => this.classe = "") //So executa se debouceTime for respeitado.
    );
    fonte.subscribe(
      _ => {
        console.log(`
          Funcao debouceTime ativa, repare que quando o botao estiver vermelho,
          nao sera impresso outra mensagem como essa, por mais que voce clique.
          A impressao ocorre depois que o botao volta ao normal. Nao importa
          quantas vezes voce clique, o evento onclick apenas estara disponivel
          1 vez a cada 3 segundos.
        `);
      },
      error => console.error(error),
      () => console.log('Execucao Completa!')
    );
  }

  public catchErrorFuncao(){
    //Aqui faremos com o subject para ficar claro o passo a passo.
    /* 
      Como os passos estao sendo executado pelo subject, o mesmo
      objeto que fara a inscricao, entao ele nao executara os next
      devido ao erro. Ou seja quando tem um erro ele nao executa 
      nenhum next e ja imprime logo o erro. Diferente dos observables,
      que executam passo a passo os next ate o complete ou o erro.
      Nesse caso sera impresso o erro, depois a mensagem gerada
      pelo observer do catchErro e ai por fim o complete, sem executar
      em nenuma vez os next, primeiro porque o subject vai ignorar
      os next ate o erro e segundo porque o catchError muda o fluxo
      do observer executando outro observer.
    */
    const fonte = new Subject(); 
    fonte.next("Instrucao antes do erro"); //Nao sera executado
    //Repare que aqui estamos executando um erro.
    fonte.error("Ops... Deu um erro, tratando e continuando!"); 
    fonte.next("Instrucao depois do erro"); //Nao sera executado.
    fonte.complete();
    fonte.pipe(
      /*
        Aqui temos um exemplo da funcionalidade de um operador, no
        caso o catch erro ele permite que se continue a execucao
        apesar do erro, funciona como o catch das linguagens de 
        programacoes. O catch permite com que a execucao continue.
        O Catch recebe como parametro de entrada da callback dele,
        o valor passado no .error(), e exige como um retorno um observable,
        ou seja, caso aconteca erros, ele executa um outro observable, no
        caso eh esse observable que voce poe como retorno da callback da catchError.
        E entao o fluxo continuara a execucao apartir da execucao desse Observable
        que voce especificou no return da callback, voce pode tambem dar um throw new Error,
        caso nao queira continuar, de toda forma essa eh a forma de voce lidar
        com erros no pipe.
      */
      catchError(erro =>{ //O parametro eh a mensagem que o throw gerou.
        console.log(erro); 
        return of("concluindo... "); //Aqui estamos retornando um Observable apesar da funcao OF
      })
    ).subscribe(
      mensagem => console.log(mensagem),
      erro => console.error(erro), //Nao sera executado devido ao tratamento do catchError.
      () => console.warn("Execucaoo concluida, apesar de erros.")
    );
    fonte.unsubscribe();
  }

  public retryFuncao():void{
    const fonte:Observable<any> = new Observable<any>(
      (observer) =>{
        for(let i=1;i<4;i++){
          observer.next("Executando "+i);
          if(i == 2){
            console.warn("deu Erro, tentando de novo");
            //O retry nao deixara imprimir o throw ate acabar as tentativas
            throw new Error("Acabou as tentativas!");
          } 
        }
        observer.complete();
      }
    );
    fonte.pipe(  
      /*
        Caso de erros, o retry permite que voce possa tentar denovo,
        ou seja ele executa novamento o observer a caso de erro,
        o parametro que ele aceita eh a quantidade de tentativas que
        ele pode executar. No caso ele ira executar duas vezes a execucao
        do observer.
      */
      retry(2)        
    ).subscribe(
      mensagem => console.log(mensagem),
      erro => console.error("Erro Fatal: "+erro),
      () => console.warn("Execucao concluida com erros!")
    ).unsubscribe();
  }

  public retryWhenFuncao():void{
    /*
      Voce pode criar um observebles sem a necessidade
      de colocar dentro de uma variavel.
    */
    new Observable<any>(
      (observer:Observer<any>) => {
        for(let i=0; i<5; i++){
          observer.next('valor: '+i);
          if(i == 2) throw new Error("Erro");
        }
      }
    ).pipe(
      /*
        retryWhen recebe como parametro
        uma callback e essa callback recebe
        um parametro do tipo subject e deve
        obrigatoriamente retornar um observable,
        Uma vez que o observable de retorno seja
        resolvido, ai eh feito uma nova tentativa,
        e esse operador nao dispara a callback de
        erro, na verdade ele nao deixa executar
        nenhum catch e tao pouco suspende a execucao,
        ele conclui sem problemas com base no valor que tem.
      */
        retryWhen((parametro:Subject<any>) => {          
          console.log(parametro);
          return timer(500);
        })
    ).subscribe(
      mensagem => console.log(mensagem),
      erro => console.error("Erro: "+erro),
      () => console.warn("Concluido!") 
    );    
  }

  public timeoutFuncao():void{
    let fonte = new Observable<any>(
      (observer) => {        
        for(let i:number = 0; i<11; i++){
          observer.next(i);          
        }
        observer.complete();
      }
    );
    fonte = fonte.pipe(
      /*
        Esse operador faz uma nova tentativa depois
        do tempo especificado, no caso depois de 5000
        milisegundos, aqui nem vai fazer diferenca,
        mas ele faz a diferenca em Observables de tempo,
        uma vez que ele atrasa para poder se adequar ao
        observable de tempo.
      */      
      timeout(5000),
    );

    const inscricao = fonte.subscribe(
      mensagem => console.log(mensagem),
      erro => console.error(erro),
      () => console.warn("fonte1 executado com sucesso!")
    );
    
    let fonte2 = timer(3000);
    fonte2 = fonte2.pipe(
      /*
        Aqui sim, repare que o observable esta em 3 segundos,
        porem o timeout esta em 1,5 segundos, aqui dara erro
        pois a fonte vai demorar 3 segundos para gerar o dado
        e o timeout esta esperando apenas 1500. No caso o time
        out permite sincronizar o pipe com um Observable de timer,
        eh para isso que serve o operador timeout.
      */
      timeout(1500)
    );
    
    let inscricao2 = fonte2.subscribe(
      mensagem => console.log(mensagem),
      erro => console.error("Erro controlado na fonte2:"+erro)
    );

    let intervalo = setInterval(
      () => {
        if(inscricao.closed && inscricao2.closed){
          inscricao.unsubscribe();
          inscricao2.unsubscribe();
          clearInterval(intervalo);
        }
      }  
    );
  }
}
