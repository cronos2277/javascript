import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.css']
})
export class InsideComponent implements OnInit {
  exemplo1:string ="Exemplo de interpolacao de String."; //Atributo usando tipagem do TS
  exemplo = { //Usando o Javascript simples
    exemplo1: "Exemplo de interpolacao de String dentro de Objeto."
  }
  //Atributos referentes a mudanca de cor, aqui o exemplo relacionado a interpolacao de string
  colors = ["primary","accent","warn"]
  indice = 0; //Esse atributo tambem eh usado no ngSwitch

  //Exemplos da diretiva de classe do Angular.
  classDirective = ["classe1","classe2"];
  classDirectiveIndex = 0;
  classDirectiveFunction(){
    if(this.classDirectiveIndex){
      this.classDirectiveIndex = 0;
    }else{
      this.classDirectiveIndex = 1;
    }
  }

    //Esse atributo esta relacionado a diretiva ngStyle.
  ngstyle = ["black","white"];

  //Exemplo com o *ngIf.
  isActiveLabel = true;
  changeLabelVisibility(){
    this.isActiveLabel = !this.isActiveLabel;
  }

  arrays = ["valor1","valor2","valor3"];  
  constructor() {}
  cars = ""; //usado no 2way data binding do select
  input = "null";  //usado no 2way data binding do input  
  ngOnInit() {
    //Esse metodo eh chamado quando o componente eh criado.
    setInterval(() =>{
      /*
        Engenhoso e interessante essa estrategia, a % abaixo calcula o resto da divisao, 
        no caso temos 3 valores no array abaixo, logo o valor de this.colors.length = 3,
        nesse caso a cada interacao do setInterval sera incrementado o indice tirando
        o resto da divisao com o tamanho total do array, nesse caso temos:
        quando indice = 0:
        this.indice =  (this.indice +1) % this.colors.length; ficando...
        this.indice =  (0 +1) % 3; sendo o resto => 1
        quando indice = 1:
        this.indice =  (this.indice +1) % this.colors.length; ficando...
        this.indice =  (1 +1) % 3; sendo o resto => 2
        quando indice = 2:
        this.indice =  (this.indice +1) % this.colors.length; ficando...
        this.indice =  (2 + 1) % 3; sendo o resto => 0
        quando indice = 3:
        this.indice =  (this.indice +1) % this.colors.length; ficando...
        this.indice =  (3 + 1) % 3; sendo o resto => 1
        O seja temos um valor que altera de maneira circular.
      */
      this.indice =  (this.indice +1) % this.colors.length;
    },1000);
    
  }
/*
  Os metodos abaixo sao metodos, que correspondem a eventos
  no html.
*/
  checkboxFunction(event){ //Checkbox change e click
    console.log(event);
  }

  setCars(event){ //selectChange
    console.log(event);
    this.cars = event.value; 
  }

  inputText(event){ //input
    console.log(event);
    this.input = event.target.value;
  }
  metodoInside(){
    alert('Funcao executada dentro do inside.component.ts');
  }

}
