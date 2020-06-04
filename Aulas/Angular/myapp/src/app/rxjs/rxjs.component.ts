import { Component, OnInit } from '@angular/core';
import { from, Subscriber, Subscription, of, interval, timer, fromEvent, Subject, Observable, Observer } from 'rxjs';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.funcaoFromEvent();
  }

  /*
    Voce pode salvar a inscricao em um objeto Subscription
    para que seja possivel, eh uma boa pratica desiscrever
    observers quando for necessario para evitar o 
    consumo de memoria quando estiver em desuso. Exemplo:
    const inscricao:Subscription = fonte.subscribe(next,error,complete)
    ja para desinscrever:
    inscricao.unsubscribe();
  */

  /*
    const fonte = from([1,2,3,4,5,6,7,8,9,10]);
    Essa eh uma forma de voce fazer o carregamento de cada
    ciclo de dados, ou seja sera processado cada dado de
    uma unica vez, no caso a funcao from executa um "".next"
    para cada elemento do array, o oposto do OF que executa tudo
    de uma vez. O Metodo from eh indicado caso a fonte de dados 
    o forneca aos poucos.
  */
  public funcaoFrom():void{
    const fonte = from([1,2,3,4,5,6,7,8,9,10]); //Nesse array temos a fonte de dado.
    const inscricao:Subscription = fonte.subscribe( //Aqui temos a inscricao
      ciclo => console.log('Ciclo: '+ciclo+', com o from'), //callback de next()
      erro => console.error(erro), //callback error()
      () => console.log("10 ciclos com sucesso") //Callback para complete()
      );
    inscricao.unsubscribe(); //Aqui eh feito a desinscricao.
  }
  /*
    const fonte = of([1,2,3,4,5,6,7,8,9,10]);
    Diferente do From, a funcao OF pega os dados e faz o processamento tudo de uma
    vez, ou seja ele faz o processamento quando tem todos os dados.
  */
  public funcaoOf():void{
    const fonte = of([1,2,3,4,5,6,7,8,9,10]); //Nesse array temos a fonte de dado.
    const inscricao:Subscription = fonte.subscribe( //Aqui temos a inscricao
      ciclo => console.log('Ciclo: '+ciclo+', com o OF'), //callback de next()
      erro => console.error(erro), //callback error()
      () => console.log("10 ciclos com sucesso") //Callback para complete()
      );
    inscricao.unsubscribe(); //Aqui eh feito a desinscricao.
  }

  /*
    A funcao interval assim como a timer sao interessante
    caso o ciclos de dados sigam algum padrao cronologico.
    O interval eh mais simples voce apenas informa a perio-
    dicidade em milisegundos. A estrutura de funcionamento
    eh muito semelhante ao OF e From, porem mais focado
    para a execucao periodica.
  */
  public funcaoInterval():void{
    const fonte = interval(1000); //Aqui comecamos o uso, a cada 1 segundo.
    const inscricao:Subscription = fonte.subscribe(
      ciclo => {
        if (ciclo < 11){
          console.log('Ciclo: '+ciclo+', com o Interval');
        }else{ //A desiscricao eh feita quando o ciclo chega a 11.
          console.log("Concluido o Interval");
          inscricao.unsubscribe();
        }  
      },
      erro => console.error(erro)      
      );
      console.log(`
          ok, mesmo estando no final do codigo eh executado antes de 
          encerrar a execucao do interval assim, demonstrando assim
          a assincrocidade.
          `);   
  }

  public funcaoTimer():void{
    /*
      O timer aceita 2 paremetros, o primeiro a quantidade de tempo
      necessario para iniciar o evento e depois a quantidade de milisegundos
      que deve ser dado ao ser executado um "next()" e outro.
      Caso voce informe apenas um parametro, ele executara uma vez e ira parar.
      timer(x,y) ou timer(x)
      timer(x) => informa quantos milisegundos para a execucao unica, 
      apos a execucao o processo eh suspendido, com um parametro a execucao ocorre apenas
      uma vez.
      
      timer(x,y) => quando com 2 parametros o primeiro informa quanto tempo deve
      ser esperado para a primeira execucao, e o segundo indica com que frequencia
      deve ser executado.
    */
  
    //Inicia apos 3 segundos e uma vez iniciado a periodicidade do evento eh de 1 segundo.
    const fonte = timer(3000,1000); 
    const inscricao:Subscription = fonte.subscribe(
      ciclo => {
        if (ciclo < 11){
          console.log('Ciclo: '+ciclo+', com o Timer');
        }else{ //A desiscricao eh feita quando o ciclo chega a 11.
          console.log("Concluido o Timer");
          inscricao.unsubscribe();
        }  
      },
      erro => console.error(erro)      
      );
      console.log(`
          ok, mesmo estando no final do codigo eh executado antes de 
          encerrar a execucao do interval assim, demonstrando assim
          a assincrocidade. Sera executado em 3segundos
          `);   
  }
  /*
    Aqui a execucao funciona com base em algum evento, no 
    exemplo abaixo estamos usando o evento click. Segue o 
    padrao javascript para eventos sem o on na frente,
    ou seja click seria onclick, input para oninput e por
    ai vai.
    const fonte = fromEvent(document.getElementById('btn1-fe'),'click');
    A fromEvent acima aceita dois elementos, 1 o elemento DOm a ser
    monitorado e o segundo parametro qual evento deve ser monitorado,
    nao esqueca de que o segundo parametro aceita uma String.
  */
  private funcaoFromEvent():void{
    //Vigiando o evento onclick do botao com ID => btn1-fe
    const fonte = fromEvent(document.getElementById('btn1-fe'),'click');
    fonte.subscribe( //Repare que a inscricao segue o mesmo padrao.
      mensagem => console.log(mensagem),
      erro => console.error(erro),
      () => console.log('Evento concluido com sucesso')
    );
  }

  //Aqui temos um exemplo com o Subject, melhor explicado no modulo Subject
  public subjectFuncao():void{
    const subject:Subject<any> = new Subject<any>();
    //Voce pode salvar a inscricao para desinscrever depois.
    const inscricao:Subscription = subject.subscribe( 
      (mensagem) => console.log(mensagem),
      (erro) => console.error(erro),
      () => console.log("concluido a execucao com Subject!")
    ); 

    //Regras de negocios
    subject.next("Exemplo 1");
    subject.next("Exemplo 2");
    subject.complete(); 
    //Fim da regra de negocios.

    inscricao.unsubscribe(); 
  }

  //Aqui temos um exemplo com o Observable, melhor explicado no modulo Subject
  public observerFuncao():void{
    const observable:Observable<any> = new Observable<any>(
      (observer:Observer<any>) => {
        //Regras de negocios
        observer.next("Exemplo 1");
        observer.next("Exemplo 2");
        observer.complete();
        //Fim da regra de negocios.
      }
    );
    
    //Voce pode salvar a inscricao para desinscrever depois.
    const inscricao:Subscription = observable.subscribe(
      mensagem => console.log(mensagem),
      erro => console.error(erro),
      () => console.log("Execucao do Observable executado com sucesso!")
    );
    inscricao.unsubscribe();
  }
}
