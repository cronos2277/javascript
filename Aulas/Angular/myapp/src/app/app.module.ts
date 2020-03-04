import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MyBasicComponent} from './mybasic.components';
import { AppComponent } from './app.component';
import {MyCompositeComponent} from "./mycomposite.components";
import { MygeneratedComponent } from './mygenerated/mygenerated.component';
import { InsideComponent } from './mygenerated/inside/inside.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module'; //Esse modulo importa todos os componentes do Material design.
import { ComunicationComponent } from './mygenerated/comunication/comunication.component';
import { FormsModule } from '@angular/forms'; //Importante para o funcionamento da diretiva ngModule.
import { MainLifecycleComponent } from './main-lifecycle/main-lifecycle.component';
import {LifecycleChildComponent} from './main-lifecycle/lifecycle-child/lifecycle-child.component';
import {ChildChildComponent} from './main-lifecycle/lifecycle-child/child-child/child-child.component';
import {CheckComponent} from './check/check.component';
import {CheckChildComponent} from './check/check-child/check-child.component';
import {Module1Module} from './module1/module1.module';
import {Module2Module} from './module2/module2.module';

/*
  Aqui abaixo temos um decorator contendo 4 atributos, que eh passado ao ng module.
*/
@NgModule({
  declarations: [ //Aqui estamos também informando a ordem de carregamento dos componentes.
    AppComponent, //Aqui estamos declarando a utilização desse componente.
    MyBasicComponent, //Componente criado por mim, um componente simples, aqui esta as explicacoes basicas de componentes.
    MyCompositeComponent, MygeneratedComponent, InsideComponent, 
    ComunicationComponent, MainLifecycleComponent, LifecycleChildComponent,
    ChildChildComponent, CheckComponent, CheckChildComponent //Um componente composto que carrega arquivos externos.
  ],
  imports: [ //Aqui lidamos com a importacao de modulos, Modulos deve ser referenciado aqui dentro do imports
    BrowserModule,
    BrowserAnimationsModule,       
    MaterialModule, //Aqui eh feito a importacao dos elementos do material design    
    FormsModule,
    Module1Module,
    Module2Module,
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