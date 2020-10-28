import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRet1 } from './ret1.component';
import { AppRet2 } from './ret2.component';
import { AppRet3 } from './ret3.component';

/*
  Aqui temos as rotas configuradas, no array abaixo
  nos estamos definindo um componente a determinada rotas,
  por exemplo se na url for digitado /ret1 sera carregado o 
  componente AppRet1 na area delimitada por:
  <router-outlet></router-outlet> 
  Lembre-se de registrar esses componentes no arquivo app.modules.ts
  ou voce pode injetar no componente e carrega-lo de maneira lazy. 
*/

const routes: Routes = [ //Aqui se informa todas as rotas dentro desse array.
  {
    component:AppRet1, //Componente a ser carregado
    path:"ret1" //A rota ao qual responde
  },
  {
    component:AppRet2,
    path:"ret2"
  },
  {
    component:AppRet3,
    path:"ret3"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
