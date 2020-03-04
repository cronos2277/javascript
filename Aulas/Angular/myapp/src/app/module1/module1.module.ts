import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Service1 } from './service1.service'; //<-- Aqui eh importado o arquivo de Servico.

@NgModule({
  declarations: [Component1Component, Component2Component],
  exports: [Component1Component, Component2Component],
  imports: [
    CommonModule
  ],
  providers: [ Service1 ], //<-- Aqui eh feito o registro, necessario para o funcionamento.
})
export class Module1Module { }
/*
O registro do servico que sera usado esta sendo feito nessa classe, logo todas as classes 
e componenentes filhos desse, terao acesso a instancia criada aqui do servico, repare 
que se voce tirar do providers aqui eh colocar no providers das classes filhas, a mesma
criara uma instancia unica para cada classe filho, mas como o mesmo eh referenciado aqui
e cadastrado aqui, a mesma instancia serve para os componente: "component1" e "component2".
  No entanto o local aonde sera registrado o providers: [ Service1 ] define o escopo.
  O registro desse servicos no Array provider tambem eh obrigatorio, do contrario ao 
  programar uma classe que exige a injecao o angular ira reclamar que o mesmo nao existe,
  no caso que nao existe provider para esse servico.
*/
