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
  
  //Essa funcao sera passado como parametro do evento: (eventoComplexo)
  eventoDaClasseComplexo(event: string){
    console.log(event);
    alert("Event Emit Complexo: "+event);
  }
  constructor() { }

  ngOnInit() {
  }

}
