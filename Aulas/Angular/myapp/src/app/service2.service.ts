import { Injectable } from '@angular/core';
/*
  Esse eh o padrao quando voce usa o padrao,
  no caso, quando voce cria um servico pelo
  ng. Nesse caso o servico esta registrado,
  no escopo mais externo da aplicao, no caso
  no escopo do app.module.ts. 
*/
@Injectable({
  providedIn: 'root'
})
export class Service2 {
  text = "Service 2";
  constructor() { 
    console.log("Service 2 - constructor()");
  }
}
