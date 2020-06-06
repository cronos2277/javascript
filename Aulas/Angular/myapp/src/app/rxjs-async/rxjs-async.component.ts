import { Component, OnInit } from '@angular/core';
import {Usuario} from './Usuario.models';
import { Observable, interval } from 'rxjs';
import { toArray, delay } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-async',
  templateUrl: './rxjs-async.component.html',
  styleUrls: ['./rxjs-async.component.css']
})
export class RxjsAsyncComponent implements OnInit {
  private usuarios:Usuario[] = [
    {code:1,name:"Joao"},
    {code:2, name:"Paulo"},
    {code:3, name:"Lucas"}
  ];
  /*
    Recomenda-se usar $ no no final do nome, para identificar visualmente um observable.
    Nao eh obrigado, mas eh uma convencao como a primeira letra de nomes de classe em maiuscula
    e lower camel case para funcoes, metodos, atributos e variaveis.
  /*
    Repare que o subscribe nao eh feito aqui, a inscricao
    eh feito no html no momento que eh chamado, nas diretivas
    ngFor e ngIf:
    *ngFor:
    *ngFor="let cada of observer1$ | async" => O async faz de maneira
    assincrona a inscricao do observer, no momento em que ele eh usado,
    porem depois de usado a desiscricao eh feito. Com isso voce consegue
    acessar o valor desse observer dessa forma:
    <p>Codigo: {{cada.code}}, Nome: {{cada.name}}</p>
    Essa estrategia imprime cada processo do next na pagina, ou seja
    havera 1 <p> para cada processamento do for.
  */
  public observer1$:Observable<Usuario>; 
  /*
    Aqui usamos com o *ngIf, como no exemplo abaixo:
    ----------------------------------------------------------
    Primeiro: observer2$|async; else carregando
    Aqui no primeiro caso fazemos o casseo ao valor, usando
    o proprio objeto, dessa forma:
    <p><b>Code: {{(observer2$|async)?.code}}</b> </p>
    <p><b>Nome: {{(observer2$|async)?.name}}</b> </p>
    Dentro do parenteses voce coloca a referencia do Observer
    e com o uso do pipe voce coloca o async. O interrogacao
    eh opcional, porem extremamente importante coloca-lo, pois
    caso tenha algum dado nulo, o mesmo dispara um erro. 
    Agora com um interrogacao, ai valores nulos sao tratados
    e quando tiver algum valor o mesmo eh exibido.
    -----------------------------------------------------------
    Segundo: observer2$|async as objeto; else carregando1"
    Nessa estrategia voce acessa dessa forma:
      <p><b>Code: {{objeto.code}}</b></p>
      <p><b>Nome: {{objeto.name}}</b></p>
    Ou seja aqui voce usa um substituo e no caso o substituo eh 
    chamado de objeto. Nessa estrategia valores nulos nao sao
    exibidos, apenas ocorre a exibicao quando se tem algum valor.

    No caso esse IF executa cada next, entao para cada next dentro
    desse observable o valor eh atualizado, entao o primeiro valor
    que aparece eh o primeiro valor processado pelo next, ai ocorre
    uma segunda atualizacao quando ocorre uma nova execucao do next 
    e por ai vai... Essa estrategia eh interessante caso voce queira
    exibir o valor processado atualmente pelo next do observable.
    Resumindo diferente do for, o valor subscreve o anterior, ou
    seja nao o valor eh atualizado dento do mesmo <p>
  */
  public observer2$:Observable<Usuario>; 

  constructor() { }

  ngOnInit() {
    this.observer1();
    this.observer2();    
  }

  private observer1(){
    //Essa eh uma outra forma de criar um observables, o metodo create retorna um observable.
    this.observer1$ = Observable.create( 
      (observer) => {
        for(let i=0;i < this.usuarios.length;i++){
          observer.next(this.usuarios[i]);          
        }
        observer.complete();
      }
      ).pipe(
        //To array retorna os dados do next para um array.
        //Ou seja o parametro do next vira um array com todos os elementos dentro
        toArray() 
    );    
  }

  private observer2(){
    this.observer2$ = Observable.create(
      (observer) => {
        let i:number = 0;
        const intervalo = setInterval(
            () => {
              if(i < this.usuarios.length){
                observer.next(this.usuarios[i++]);
              }else{
                clearInterval(intervalo);
                observer.complete();
              }
            },5000);       
      }
    ).pipe(
      delay(2000)
      );    
  }

}
