import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mygenerated',
  templateUrl: './mygenerated.component.html',
  styleUrls: ['./mygenerated.component.css']
})
export class MygeneratedComponent implements OnInit {
  /* Esse objeto abaixo sera passado como parametro para uma tag. */
  objeto = {texto:"Texto exemplo",numero:10,booleano:true}
  eventoDaClasse(){
    console.log("Evento ativado!");
    alert("Event Emit");
  }
  
  constructor() { }

  ngOnInit() {
  }

}
