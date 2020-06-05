import { Component, OnInit } from '@angular/core';
import { Subscription, from, of, interval, Subject, fromEvent } from 'rxjs';
import { delay, map, filter, tap, first, last, take, debounceTime } from 'rxjs/operators';

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
      tap(_ => this.classe = "")
    );
    fonte.subscribe(
      msg => {
        console.log(`
          Funcao debouceTime ativa, repare que quando o botao estiver vermelho,
          nao sera impresso outra mensagem como essa, por mais que voce clique.
          A impressao ocorre depois que o botao volta ao normal.
        `);
      },
      error => console.error(error),
      () => console.log('Execucao Completa!')
    );
  }

}
