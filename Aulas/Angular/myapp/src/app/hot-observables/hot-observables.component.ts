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


  usingShare() {
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

  usingPublish() {
    //const multicasted = this.myObservable.pipe(publish(), refCount());

    const multicasted: ConnectableObservable<number> = this.myObservable
      .pipe(publish()) as ConnectableObservable<number>;
    multicasted.connect();

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



}
