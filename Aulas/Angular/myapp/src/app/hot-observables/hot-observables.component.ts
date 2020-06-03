import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';

import { publish, refCount, share } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  //Esses atributos sao acessados por todos os subscribe, pois sao criados aqui
  n: number = 0;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    /*
      Dessa forma que voce cria um hot observable, voce cria um objeto
      do tipo observable e passa uma funcao como parametro na hora da
      instanciacao.
      
    */
    this.myObservable = new Observable(
      (observer:Observer<number>) => {
        let i : number = 0;
        console.log('%c Observable Created', 'background: #cccccc; color: #ff0000');
        setInterval(()=>{
          i++;
          console.log('%c i = ' + i, 'background: #cccccc; color: #0000FF');
          (i==100) ? observer.complete() : observer.next(i);
        }, 1000)
      }
    );
    //this.usingSubjects();
    //this.usingPublish();
    this.usingShare();
  }


  //Essa eh uma forma basica de esquentar Observers.
  usingSubjects() {
    /*
      Um Objeto Subject extende de um Observable, entao
      justamente por isso o subject tem os metodos do
      Observable.
      Nessa estrategia voce subscreve um subject e
      uma vez que o subject esta subscrito, eh 
      justamente nesse subject que voce vai
      subscrever os seus observers. Basicamente:
      1) Cria um subject e subscreve ele em um Observable.
      2) Use o subject no passo acima como um Observable.
      Essa seria uma outra maneira de esquentar um observer,
      como as callbacks vao compartilhar o mesmo subject,
      logo tudo sera esquentado, pois elas compartilharam
      dados.
    */
    const subject = new Subject<number>(); //Criando um Subject.
    //Subscrevendo o Subject acima, em um observable da instancia.
    this.myObservable.subscribe(subject); //Aqui o subject se comporta como um Observer.

    //Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(()=>{
      subject.subscribe((_n) => { //Aqui o subject se comporta como um Observable
        this.n1 = _n;
        this.s1 = 'OK';
      })
    },2000);

    //Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(()=>{
      subject.subscribe((_n) => { //Aqui o subject se comporta como um Observable
        this.n2 = _n;
        this.s2 = 'OK';
      })
    },4000);

  }

  /*
    Aqui temos uma outra estrategia a publish, muito parecida com a subscriber
    inclusive. Nessa estrategia voce pode colocar filtros personalizados no
    pipe. Nessa estrategia o observer echamado assim que eh chamado o metodo
    connect(), ou quando iniciar o subscriber caso a primeira linha do metodo,
    seja descomentada.
  */
  usingPublish() {
    //const multicasted = this.myObservable.pipe(publish(), refCount());
    /*
      Aqui temos duas estrategias a estrategia comentada acima, com o 
      refcount() faz com  que o observer comeca a sua execucao no primeiro
      subscriber. A funcao publish retorna um subject, ou seja o metodo
      ele passa um subject para o metodo pipe.
      Agora temos o codigo abaixo, o as abaixo ele da um cast no observable 
      abaixo. Nessa estrategia apenas comeca a execucao quando chamado o
      metodo ".connect()".
    */
    const multicasted: ConnectableObservable<number> = this.myObservable
      .pipe(publish()) as ConnectableObservable<number>;
    multicasted.connect();

    //Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { //A subscricao eh feita no objeto ConnectableObservable
        this.n1 = _n;
        this.s1 = 'OK';
      })
    },2000);

    //Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { //A subscricao eh feita no objeto ConnectableObservable
        this.n2 = _n;
        this.s2 = 'OK';
      })
    },4000);    
  }

  usingShare() {
    /*
      Essa estrategia eh muito parecida com essa:
      //const multicasted = this.myObservable.pipe(publish(), refCount());
      porem tem apenas uma unica diferenca.Quando finalizado o
      processamento dos dados o publish nao retornara nenhum dado ao
      novo observer subscrito, sendo que o share ele reinicia o processamento
      dos dados, ou seja isso diz respeito a criacao de dados. Resumindo:
      publish() => Quando tem uma nova subscricao, mantem-se a consistencia, 
      ou seja se o processamento se encerro nao eh retornado nada ao novo subscrito,
      ou seja depois de publicado ja era.
      share() => Para cada subscricao, existe um reinicio as condicoes iniciais dos dados,
      caso o processamento tenha sido concluido, ou seja tudo eh compartilhado, inclusive
      o estado.
    */
    const multicasted = this.myObservable.pipe(share());

    //Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { 
        this.n1 = _n;
        this.s1 = 'OK';
      })
    },2000);

    //Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { 
        this.n2 = _n;
        this.s2 = 'OK';
      })
    },4000);    
  }  


}
