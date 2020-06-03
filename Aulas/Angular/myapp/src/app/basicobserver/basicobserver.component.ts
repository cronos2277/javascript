import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';
//import { BrowserViewportScroller } from '@angular/common/src/viewport_scroller';

/*
  Esse eh um exemplo de um cold-observer, nesse caso cada subscribe funciona de 
  maneira idependente, diferente de um hot-observer por exemplo.
*/

@Component({
  selector: 'app-basic',
  templateUrl: './basicobserver.component.html',
  styleUrls: ['./basicobserver.component.css']
})
export class BasicobserverComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';
    /*
      Aqui temos um exemplo de Observable, 
      o objeto instanciado abaixo, ele 
      e observa um deteminado elemento.
      O seu funcionamento se assemelha
      a uma Promise. O Objeto abaixo
      tem como parametro uma callback,
      uma callback que tem como parametro
      um objeto Observer. Voce precisa
      passar um tipo dentro do diamante,
      que será o tipo que o metodo next
      ira operar.

      Hot Observers se difere do Cold Observers no sentido de que os
      HOT compartilham dados com todas as instancias, de grosso modo
      a diferença eh semelhante entre atributos de classe e instancia,
      sendo nessa analogia os Cold Observers tendo os atributos de 
      instancia e os Hot Observers de classe.
      Repare tambem que os atributos eles sao de classes e com isso
      eles nao sao criados dentro de funcoes, como ocorrem em Cold Observers
      e sim na classe, os atributos são acessados de maneira compartilhada, 
      dessa forma, uma vez que todas as inscricoes acessam os mesmos atributos.
    */
    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1); //cada next equivale a um passo do Observable.
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error("error"); //chamado caso de erro.
        //callback chamado quando a mesma eh encerrada devidamente
        observer.complete(); 
      }
    );
    /*
      Eh aqui que a magica eh feita, o subscribe ele
      registra uma funcao dentro de um observer.
      No caso ao instanciar um objeto Observable,
      voce tem um metodo chamado subscribe, ao qual
      registra a sua funcao a um observer.
      No caso essa funcao eh executada quando os
      componentes sao inicializados.
      Voce pode passar 3 callbacks como parametro para subscribe.
    */
    myFirstObservable.subscribe(
      (n: number) => console.log(n), //A callback a ser monitorada. OBRIGATÓRIO!

      //callback para caso de erro, executado no metodo: "".error"
      (error) => console.error(error), 

       //callback quando tudo for concluido, executado no metodo: "complete"
      () => console.log('completed.'));
    
    /* 
    const timerCount = interval(500);
    timerCount.subscribe(
      (n) => console.log(n)
    )
    console.log("after interval");
    */

    const myIntervalObservable = new Observable(     
      (observer: Observer<any>) => {
        let i:number = 0;
        let id = setInterval(()=>{
          i++;
          console.log('from Observable: ', i);
          if (i == 10)
            observer.complete();
          else if(i%2 == 0)
            observer.next(i);
        }, 1000);
        return () => {
          //O retorno do observer eh chamado depois do metodo complete.
          //Nesse caso eh parado o setInterval, do contrario o mesmo,
          //continuaria devido ao setInterval.
          clearInterval(id);
        }
      }
    );
    this.subscription1 = myIntervalObservable.subscribe(
       //Funcao de callback a ser executado a cada "next()" no observer. O _n eh o atributo colocado no metodo .next("valor do '_n' aqui")
      (_n) => {this.n1 = _n}, //Aqui o algoritimo para cada .next()
      //Callback a ser executada quando houver erro no caso o, funciona como o next(), exemplo .error("o valor do'_n' aqui").
      (error) => {this.s1 = 'Error: ' + error }, //algoritmo para o .error(), caso ele seja executado o complete nao eh.
      () => {this.s1 = 'Completed'} //Callback quando for executado o "complete()".
    );
    this.subscription2 = myIntervalObservable.subscribe(
      (_n) => {this.n2 = _n},
      (error) => {this.s2 = 'Error: ' + error },
      () => {this.s2 = 'Completed'}
    );

    setTimeout(()=>{
       //Esse método desescreve o metodo do observer, suspendendo o seu funcionamento.
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 15000)

  }

}
