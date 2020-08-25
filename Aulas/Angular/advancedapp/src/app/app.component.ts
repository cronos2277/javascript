import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'advancedapp';
  http_modulo:boolean = false;
  formulario_modulo:boolean = false;
  reactive_forms:boolean = false;
  rotas:boolean = false;
  auth:boolean = false;
  firebase:boolean = false;
  upload:boolean = false;
  ngrx:boolean = true;
}
