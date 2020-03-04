import { Injectable } from '@angular/core'; //<-- Injecao.
//<-- Aqui eh implementando o modulo.
import { Module1Module } from '../module1/module1.module';

/*
  Essa eh uma outra forma de voce registrar um Servico, 
  ou voce pode colocar dentro do providers ou se nao
  voce pode especificar aonde o servico sera injetado
  aqui, passando um objeto com o valor de providedIn,
  cujo o valor eh o modulo aonde havera a injecao.
  Para mais informacoes: https://angular.io/api/core/Injectable
*/
@Injectable({
  providedIn: Module1Module
})
export class Service1 {
  public num = 0;
  constructor() {
    this.num = Math.round(Math.random()*1000);
  }
}
