import { Component, OnInit, ViewChild } from '@angular/core';

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
  /*
    Essa anotacao, pega o componente registrado como #componente,
    dessa forma que voce acessa o componente, porem para pode usa-lo
    corretamente se faz necessario usar o metodo do Angular chamado
    ngAfterViewInit, para garantir que o componente seja manipulado
    apenas quando for carregado.
  */
  @ViewChild("componente",null) //Essa eh a sintaxe basica, o nome apos #
  private variavelAngular; //Essa eh a variavel referenciada.
  
  //Esse metodo eh executado depois de carregado todos os elementos templateUrl.
  ngAfterViewInit() {
    console.log(this.variavelAngular.arrays); //Atributo da classe inside.components.ts
  }
  constructor() { }

  //Metodo carregado antes de qualquer coisa.
  ngOnInit() {}

}
