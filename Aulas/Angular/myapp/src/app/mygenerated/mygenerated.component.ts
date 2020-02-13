import { Component, OnInit, ViewChild, OnChanges,Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mygenerated',
  templateUrl: './mygenerated.component.html',
  styleUrls: ['./mygenerated.component.css']
})
export class MygeneratedComponent implements OnInit,OnChanges {
  @Input() private _input:string = ""; //o metodo usado por "get" e "set" do "meuInput2" 
  meuInput1:string = "";
  /*
    Voce tambem pode usar o @Input junto com o get e o Set.
    No caso a variavel "meuInput2" sao interceptadas tanto
    pelo get e o set. No caso o @input voce usa no set,
    uma vez que o mesmo lida com a entrada de dados.
  */
  @Input() set meuInput2(str:string){ //caso o meuInput2 esteja sendo escrita.
    console.log("Interceptado pelo set");
    this._input = "/set/ "+str;
  }

  get meuInput2(){ //na hora de ler o valor de meuInput2.    
    return (this._input)?this._input + " /get/":"";
  }

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
  ngOnInit() {
    console.log("ngOnInit chamado!");
  }

  ngOnChanges(changes:SimpleChanges): void {
    console.log("ngOnChanges chamado!");
    console.log(changes);
  }
  setText(){ //funcao chamada no evento change do meuInput1
    this.meuInput2 = this.meuInput1;
  }
  
}
