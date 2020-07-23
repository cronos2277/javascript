import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Precisa importar
import { AppComponent } from './app.component';
import { HttpModuloComponent } from './http-modulo/http-modulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioModuloComponent } from './formulario-modulo/formulario-modulo.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { RotasComponent } from './rotas/rotas.component';
import {Routes, RouterModule} from "@angular/router";
import { ParametrosComponent } from './rotas/parametros/parametros.component';
import { NotFoundComponent } from './rotas/not-found/not-found.component';
import { PadraoComponent } from './rotas/padrao/padrao.component';
import { FilhoComponent } from './rotas/filho/filho.component';
import { RoutasExternaModule } from './rotas-externa/routas-externa.module';
import { ComponenteComponent } from './rotas-externa/componente/componente.component';

// Exemplo Simples de rota
const appRoutes:Routes = [ //Aqui esta todas as rotas.
  /*
    Basicamente voce entra com um objeto que contem os atributos e esses atributos serao
    renderizados no local aonde voce informou o "<router-outlet></router-outlet>",com
    base na url do usuario. 
    --- Path
    O Path seria o gatilho, no caso, quando o cliente entrar
    com a url, o componente relacionado a ele sera renderizado, na url o path corresponde
    a esse trecho da url: ["ESSEVALORAQUI"]   
    path: Indica a rota, exemplo: http://localhost:4200/["ESSEVALORAQUI"]
    --- Component
    Aqui estamos informando qual componente deve ser renderizado, quando o cliente entrar
    como a rota informada no path.
  */
  {
    path:"rota1", // => Aqui a rota.
    component:ReactiveFormsComponent //=> Aqui o componente que atende na rota
  },
  { //Aqui estamos definindo a rota padrao
    path:"padrao",
    component:PadraoComponent,
    children:[
      {
        /*
          Aqui estamos criando uma rota filha, que no caso tem os mesmos atributos
          de uma rota tradicional. Nesse exemplo de o usuario digitar "/padrao",
          essa parte nao eh exibida, mas se o usuario digitar "/padrao/filho",
          ai sim essa rota eh exibida, carregando assim o componente informado
          no atributo componente no espaco aonde esta o "<router-outlet></router-outlet>"
          do componente pai, ou seja o filho colocara o componente dentro dessa
          tag caso o usuario entre com a url correta, ou o conteudo ficara
          em branco caso nao tenha o caminho completo.
        */
        path:"filho",
        component: FilhoComponent
      }
    ]    
  },
  { //Segundo componente
    path:"rota2",
    component:FormularioModuloComponent    
  },
  {
    path:"parametros/:parametro",
    component:ParametrosComponent
  },
  { //Aqui caso nao tenha rota definida, ou seja se estiver indo para o index
    path:"", //Se tiver nada na url depois do '/'
    pathMatch:"full", //Criterio para analise, ou seja se a rota for exatamente igual a "path"
    redirectTo:"padrao" //Redirecione para a path padrao que foi definida mais acima.
  },  
  { //Resposta de 404
    path:"**", //Se tiver qualquer outra coisa que nao foi definida aqui.
    component:NotFoundComponent //Carregue esse componente.
  }
];

@NgModule({
  declarations: [
    /*
      Qualquer componente das rotas deve ser declarada aqui, para que o angular possa
      carregar, exceto que o modulo esteja funcionando em modo lazy.
    */
    AppComponent,
    HttpModuloComponent,
    FormularioModuloComponent,
    ReactiveFormsComponent,
    RotasComponent,
    ParametrosComponent,
    NotFoundComponent,
    PadraoComponent,
    FilhoComponent,  
    /* 
      Aqui estamos declarando um componente que pertence a uma rota externa.
      Como a rota externa nao eh definida no Objeto acima, logo temos
      que importar aqui, ou importat no objeto acima no modo lazy. 
    */
    ComponenteComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    //Com isso a conexao com o protocolo HTTP funciona.
    FormsModule, //Importe isso para funcionar o [(NgModel)] e o 2way databind
    ReactiveFormsModule, //Obrigatorio para o funcionamento do Reactive Forms.
    //Aplicando as rotas
    /* 
      A rota deve ser carregada antes, porque na rota definida aqui esta definida 
      a rota para paginas 404.
    
    */
    RoutasExternaModule, 
    RouterModule.forRoot(appRoutes) //=> Aqui eh informado as rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
