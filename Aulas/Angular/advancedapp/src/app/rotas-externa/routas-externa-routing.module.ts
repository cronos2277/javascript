import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponenteComponent } from './componente/componente.component';
/*
  Aqui estamos definindo as rotas. Apesar da definicao das rotas nao estar
  no app.module.ts, se faz necessario mesmo assim declarar o componente
  "ComponenteComponent" la, para que o angular possa carregar.
*/    
const routes: Routes = [
  {
    path:"externo",
    component:ComponenteComponent
  }
];

@NgModule({
  /*
    A outra diferenca entre as rotas esta aqui, la no app.module.ts o RouterModule
    eh: "RouterModule.forRoot(appRoutes)", ao tempo que aqui eh adicionado como uma folha.
    lembrando que o objeto constante routes daqui deve ser carregado antes que o objeto 
    constante routes, uma vez que o objeto routes de la tem define que toda a rota
    que nao foi definido cai na rota de 404, no caso seria esse trecho de codigo:
    { //Resposta de 404
    path:"**", //Se tiver qualquer outra coisa que nao foi definida aqui.
    component:NotFoundComponent //Carregue esse componente.
  }
  Toda e qualquer rota deve ser carregada antes desse trecho, pois do contrario qualquer
  rota carregada apos o path:"**", caira nessa rota. A forma com que deve ser definida
  as rotas deve ser sempre da mais especifica para a  mais generica, assim como 
  funciona no express por exemplo.
  */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutasExternaRoutingModule { }
