import { Component, OnInit } from '@angular/core';
import { Subscription, from, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.css']
})
export class OperadoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
      //Voce pode usar mais de um operador, esse operador triplica o valor
      map(e => 3*e) 
    );

    //Aqui eh feito a inscricao, repare que o pipe nao esta encadeado.
    fonte.subscribe(
        msg => console.log(msg),
        error => console.error(error),
        () => console.log("Execucao do PIPE Delay")      
    );
  }
}
