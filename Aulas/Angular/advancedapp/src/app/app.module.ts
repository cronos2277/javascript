import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Precisa importar
import { AppComponent } from './app.component';
import { HttpModuloComponent } from './http-modulo/http-modulo.component';
import { FormsModule } from '@angular/forms';
import { FormularioModuloComponent } from './formulario-modulo/formulario-modulo.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpModuloComponent,
    FormularioModuloComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    //Com isso a conexao com o protocolo HTTP funciona.
    FormsModule //Importe isso para funcionar o [(NgModel)] e o 2way databind
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
