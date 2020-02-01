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
  constructor() {}

  ngOnInit() {
  }

}
