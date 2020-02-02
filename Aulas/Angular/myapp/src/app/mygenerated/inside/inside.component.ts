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
  colors = ["primary","accent","warn"]
  indice = 0;
  constructor() {}
  cars = "";
  input = "null";
  ngOnInit() {

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
  checkboxFunction(event){
    console.log(event);
  }
  setCars(event){
    console.log(event);
    this.cars = event.value; 
  }
  inputText(event){
    console.log(event);
    this.input = event.target.value;
  }

}
