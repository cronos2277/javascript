import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service1.service';
import { Service2 } from 'src/app/service2.service';
@Component({
  selector: 'app-component1',
  //providers: [ Service1 ], //<-- Voce poderia registrar a escopo desse componente, se habilitado.
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  num = 0;
  text = "";
  
  /*
    Dessa forma abaixo que voce usa um servico, no construtor voce chama as dependencias que voce precisa,
    se existe o Angular usa a instancia previamente criada, se não a mesma eh instanciada aqui, para entender
    melhor a estrura, se faz necessario conhecer o padrao de Injecao de Dependencia. O servico eh registrado
    no providers pais desse componente, tanto o service1, como o service2. 
  */
  constructor(
    private myService1: Service1,
    private myService2: Service2) { }

  ngOnInit() {
    this.num = this.myService1.num;
    this.text = this.myService2.text;
  }

}
