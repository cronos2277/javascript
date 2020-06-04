import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor() {
    console.log("SUBJECT EXECUTADO");
    this.subjectBasico();
  }

  ngOnInit() {
    
  }

  //Exemplo basico da classe Subject.
  public subjectBasico(){
    //Dessa forma abaixo voce instancia usando a forma de duplo diamante.
    const subject:Subject<any> = new Subject<any>(); //O any pode ser trocado por qualquer tipo de dado.
    //Aqui o subject se porta como um Observable...
    subject.subscribe( //Adicionado inscrito
      /*
        O console.log aceita costumizacao, para isso coloque o %c e depois da virgula
        coloque os atributos em css de como que tudo deve ser renderizado, no caso
        fundo vermelho e letra branca.*/
      //Funcao que o Inscrito deve executar 
      parametro => console.log('%c'+parametro,"background-color:red;color:white"),
      erro => console.error(erro), //Caso de erro, nesse console eh exibido em forma de erro.
      () => console.warn("Simulacao de concluído com sucesso!") //Depois de terminado exibe o console em forma de aviso.
    );
      //Aqui o subject comeca a operar como um OBSERVER. 
      //Estruturalmente o funcionamento parace promise, se olharmos s metodos: 
      //.next(), .complete(), .error(); mas é mais completa que ela em recursos.
      subject.next('olá mundo'); //Chamando o next, ou o ".then()" do observer se compararmos com promises.
      if(Math.random() > 0.49){ //50% de chance de dar acerto ou erro.
        subject.complete(); //Se acerto, o equivalente ao ".finally()" do promise.
      }else{ //Se erro. o equivalente ao ".catch()" da promise.
        subject.error("Simulacao de erro com o subject");
      }
  }
}
