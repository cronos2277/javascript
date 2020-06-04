import { Component, OnInit } from '@angular/core';
import { from, Subscriber, Subscription, of, interval, timer } from 'rxjs';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public funcaoFrom():void{
    const fonte = from([1,2,3,4,5,6,7,8,9,10]);
    const inscricao:Subscription = fonte.subscribe(
      ciclo => console.log('Ciclo: '+ciclo+', com o from'),
      erro => console.error(erro),
      () => console.log("10 ciclos com sucesso")
      );
    inscricao.unsubscribe();
  }

  public funcaoOf():void{
    const fonte = of([1,2,3,4,5,6,7,8,9,10]);
    const inscricao:Subscription = fonte.subscribe(
      ciclo => console.log('Ciclo: '+ciclo+', com o OF'),
      erro => console.error(erro),
      () => console.log("10 ciclos com sucesso")
      );
    inscricao.unsubscribe();
  }

  public funcaoInterval():void{
    const fonte = interval(1000);
    const inscricao:Subscription = fonte.subscribe(
      ciclo => {
        if (ciclo < 11){
          console.log('Ciclo: '+ciclo+', com o Interval');
        }else{
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
    const fonte = timer(3000,1000);
    const inscricao:Subscription = fonte.subscribe(
      ciclo => {
        if (ciclo < 11){
          console.log('Ciclo: '+ciclo+', com o Timer');
        }else{
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
}
