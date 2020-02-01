import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MyBasicComponent} from './mybasic.components';
import { AppComponent } from './app.component';
import {MyCompositeComponent} from "./mycomposite.components";
/*
  Aqui abaixo temos um decorator contendo 4 atributos, que eh passado ao ng module.
*/
@NgModule({
  declarations: [ //Aqui estamos também informando a ordem de carregamento dos componentes.
    AppComponent, //Aqui estamos declarando a utilização desse componente.
    MyBasicComponent, //Componente criado por mim, um componente simples, aqui esta as explicacoes basicas de componentes.
    MyCompositeComponent //Um componente composto que carrega arquivos externos.
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] //A sequencia de componentes que sera chamada.
})
export class AppModule { }
/*
  O angular um o decorator do typescript para decorarar um objeto. Repare que 
  o NgModule define o comportamento da classe. No declarations, temos uma
  declaracao de qual componente usaremos, no imports sobre a importacao
  de componentes e no bootstrap, apesar de existir uma biblioteca com esse nome,
  aqui o bootstrap refere-se ao boot dos componentes.
*/