import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Precisa importar
import { AppComponent } from './app.component';
import { HttpModuloComponent } from './http-modulo/http-modulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioModuloComponent } from './formulario-modulo/formulario-modulo.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { RotasComponent } from './rotas/rotas.component';
import {Routes, RouterModule} from "@angular/router"; //Precisa importar se for trabalhar com rotas
const appRoutes:Routes = [
  {
    path:"padrao", // => Aqui a rota.
    component:RotasComponent //=> Aqui o componente que atende na rota
}
];

@NgModule({
  declarations: [
    AppComponent,
    HttpModuloComponent,
    FormularioModuloComponent,
    ReactiveFormsComponent,
    RotasComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    //Com isso a conexao com o protocolo HTTP funciona.
    FormsModule, //Importe isso para funcionar o [(NgModel)] e o 2way databind
    ReactiveFormsModule, //Obrigatorio para o funcionamento do Reactive Forms.
    RouterModule.forRoot(appRoutes) //=> Aqui eh informado as rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
