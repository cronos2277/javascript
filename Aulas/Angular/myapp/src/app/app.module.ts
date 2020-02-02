import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MyBasicComponent} from './mybasic.components';
import { AppComponent } from './app.component';
import {MyCompositeComponent} from "./mycomposite.components";
import { MygeneratedComponent } from './mygenerated/mygenerated.component';
import { InsideComponent } from './mygenerated/inside/inside.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; //Modulo para o botao material design
import {MatCardModule} from '@angular/material/card';  //Modulo para a div do material design
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

/*
  Aqui abaixo temos um decorator contendo 4 atributos, que eh passado ao ng module.
*/
@NgModule({
  declarations: [ //Aqui estamos também informando a ordem de carregamento dos componentes.
    AppComponent, //Aqui estamos declarando a utilização desse componente.
    MyBasicComponent, //Componente criado por mim, um componente simples, aqui esta as explicacoes basicas de componentes.
    MyCompositeComponent, MygeneratedComponent, InsideComponent //Um componente composto que carrega arquivos externos.
  ],
  imports: [ //Aqui lidamos com a importacao de modulos
    BrowserModule,
    BrowserAnimationsModule,
//Aqui eh feito a importacao dos elementos do material design    
    MatButtonModule,
    MatCardModule, //Modulos deve ser referenciado aqui dentro do imports
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
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