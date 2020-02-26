import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

export interface LifeCycleEvent {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnInit, OnDestroy, OnChanges {
/* 
O uso de interface eh opcional, mas se tiver o metodo, ngOnInit,
ngOnDestroy, etc... o metodo eh executado, do ponto de vista da  
funcionalidade a interface eh irrelevante, mas do ponto de vista 
dos editores, pode ser uma boa, para garantir de que nao haja
erros de sintaxe e coisas desse tipo, seria como o @Override
do Java, voce pode fazer o polimorfismo sem a anotacao, mas a 
anotacao verifica se de fato esta ocorrendo uma reescrita do metodo,
a logica dessas interfaces eh a mesma. No caso as interfaces sao
implementacao do typescript, como o javascript nao entende interface
na hora da execucao o typescript vai transformar isso em outra coisa,
resumindo, interface do ponto de vista da funcionalidade eh irrelevante,
porem do ponto de vista de boas praticas, eh completamente relevante.
 */
  @Input() name: string; //Monitorado pelo ngOnChanges pois tem o @Input()
  @Input() age: number; //Monitorado pelo ngOnChanges pois tem o @Input()
  @Input() food: string; //Monitorado pelo ngOnChanges pois tem o @Input()

  //Atributos daqui para baixo nao serao monitorados pelo ngOnChange();
  public events: LifeCycleEvent[] = [];
  nextEventId : number = 0;

  colors: string[] = ["accent","warn","primary"];

  private intervalRef = null;

  //Esse eh o primeiro metodo a ser chamado, na classe. No caso o construtor.
  //Se quer que algo seja executado antes de qualquer coisa, coloque aqui.
  //Porem fique esperto, que quando o construtor eh chamado, nao existe nada
  //de input, output ou qualquer atributo do angular carregado, nesse caso
  //usar o construtor pode nao ser uma boa ideia e usar os metodos ng podem 
  //ser interessante, caso voce queira que a sua logica seja executada antes,
  //ou depois de algum evento. Resumindo o construtor eh o inicio de todo o
  //objeto, antes mesmo de carregar qualquer coisa do Angular.
  //Repare que ao interagir com o formulario clients, mais abaixo no console.log()
  //quando um cliente eh cadastrado, o nome do cliente cadastrado nao aparece,
  //Ou seja o componente eh criado sob demanda e o valor do mesmo nao eh adicionado
  //a instancia quando o construtor eh chamado. Resumindo evite de interagir com
  //componentes do Angular no Construtor, como demonstrado o mesmo fica com undefined,
  //sendo carregado posteriormente.
  constructor() { 
    //Esse construtor eh chamado quando voce da submit no formulario "Clients"
    console.log(this.name + " - constructor");
    this.newEvent("constructor");
    this.intervalRef = setInterval(()=>{ console.log('interval')}, 2000);
  }
  /*
    Caso voce queira inicializar algum componente no Angular, o ngOnInit
    eh o lugar certo para fazer. Por mais que o ngOnChange seja executado
    por primeiro, o local eh aqui. No caso esse metodo tem como objetivo
    inicializar o componente. Ele eh executado apenas uma vez quando o 
    componente eh inicializado. No caso aqui ele eh o terceiro metodo a
    ser executado, sendo executado apos o ngOnChanges e o construtor.
    Qualquer configuracao envolvendo algum atributo de um componente do 
    angular deve ser feito aqui, sob pena de nao ser executado, ou de ser
    sobreescrito pelo padrao do angular, caso seja feito no constutor.
    Ou de ser ignorado, caso seja feito no ngOnChanges, uma vez que esse
    metodo eh acionado apenas em mudancas.
  */
  ngOnInit() {
    console.log(this.name + " - ngOnInit");
    this.newEvent("ngOnInit");
  }

  /*
  ngOnChanges eh o segundo metodo a ser carregado aqui, ele eh executado
  logo apos o construtor, tendo uma prioridade maior que a do metodo ngOnInit,
  isso pode ser comprovado ao interagir com o formulario "Clients" e olhando
  o console.log. Esse metodo eh executado assim que se tem uma mudanca, esse
  metodo nao pertence ao ciclo de vida de um componente no angular.
  */
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.name + " - ngOnChanges");
    /*
      ngOnChanges aceita um parametro, nesse caso esse parametro
      eh do tipo SimpleChanges. Esse objeto contem um outro objeto
      dentro desse objeto tem no estilo chave e valor (ou seja um outro 
      objeto interno), como chave o atributo com anotacao @input dessa classe 
      que foi alterado, e como valor um outro objeto contendo "previosValue" 
      que contem o valor antigo desse atributo alterado, "currentValue" 
      que tem o valor atual e firstChange que eh um booleano que informa,
      se eh ou nao a primeira mudanca. 
      No caso de uma instancia dessa classe apenas quando inserido
      e nao quando eh alterado algum valor, fica:
      {
        age:{
          previosValue:"valorAntigo",
          currentValue:"ValorQueEstaAgora",
          firstChange:true
        },
        food:{
          previosValue:"valorAntigo",
          currentValue:"ValorQueEstaAgora",
          firstChange:true
        },
        name:{
          previosValue:"valorAntigo",
          currentValue:"ValorQueEstaAgora",
          firstChange:true
        }
      }
      para acessar:
      changes.age.firstChange //Anotacao ponto.
      changes['name'].currentValue //Como array e anotacao ponto.
      changes['food']['previosValue'] //Como array.
      Aqui no caso eh changes, em funcao do nome do parametro de entrada.
      --
      Detalhe o mesmo retorna todos os atributos que foram alterados,
      esse objeto em questao, deve estar decorado com o @input para aparecer
      aqui. Isso pode ser interessante caso voce queira interceptar algum
      atributo quando o mesmo for escrito, seria uma alternativa a 
      funcionalidade "set" do javascript. Apenas os atributos que foram
      modificados aparecem aqui, os que permaneceram iguais sequer aparece
      dentro do objeto. Alem disso com o atributo firstChange voce consegue
      diferenciar uma atualizacao de uma insercao de maneira facilitada.
    */    
    console.log(changes); //Exibe os dados do changes no console.
    this.newEvent("ngOnChanges");
  }

  ngAfterContentInit() {
    console.log(this.name + " - ngAfterContentInit");
    this.newEvent("ngAfterContentInit");
  }

  ngAfterViewInit() {
    console.log(this.name + " - ngAfterViewInit");
    this.newEvent("ngAfterViewInit");
  }

  /*
    Esse metodo eh chamado apenas quando a instancia eh 
    destruida. No caso quando voce solicitar o fim dessa
    instancia, esse metodo sera chamado, antes do objeto
    ser destruido.
  */
  ngOnDestroy(){
    console.log(this.name + " - ngOnDestroy");
    this.newEvent("ngOnDestroy");
    clearInterval(this.intervalRef); // desalocando
  }

  newEvent(name: string) {
    let id = this.nextEventId++;
    this.events.push({
      id: id, 
      color: this.colors[id%this.colors.length], 
      name: name});
    setTimeout(()=>{
      let idx = this.events.findIndex((e) => e.id==id);
      if (idx >= 0)
        this.events.splice(idx, 1);
    }, 3000 + this.events.length*2000);
  }

}
  

