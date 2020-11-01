import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeat]'
})
export class StructureDirective implements OnChanges{
  /*
    Com o Input voce monitora o elemento em questao, a sintaxe
    eh um tanto exotica, mas tem uma logica por traz.
    repeatForNumber => aqui temos o repeat do seletor,
    que encontramos aqui: selector: '[repeat]', concatenado
    com o separador colocado na diretiva la no template, no
    caso: let val forNumber 13, lembrando que segue o padrao
    lowercamelcase la e aqui tambem, la eh o separador iniciado
    com letra minuscula e aqui o seletor concatenado em uppercase
    com o seletor.
    La no template: let val forNumber 13
    aqui: repeatForNumber
    No caso eh pego o que vem depois do separador "repeatForNumber",
    que eh o valor '13'.
    O Angular executa um eval, logo isso se explica tanta algo excentrico
    dessa forma, a sintaxe no template precisa ser como qualquer diretiva
    com *, deve ter uma declaracao com o let.
  */
  @Input('repeatForNumber') value:number;      

  constructor(
    /* 
      Construtor de elementos, no caso com esse objeto
      pode-se criar componentes, elementos ou qualquer
      coisa no elemento DOM.
    */
    private container:ViewContainerRef, 
    /*
      Esse objeto carrega o elemento com base no contexto "{{variavel}},
      lembrando que "variavel", foi definido no let acima, essa variavel
      eh aquela definida pelo let como valor da diretiva:
      ex: *repeat="let variavel forNumber 13", olha aonde ela esta.
    */
    private template:TemplateRef<any>     
    ){}
  
  private fnComponent(n:number){    
    for(let i=0;i<n;i++){      
      this.container.createEmbeddedView( //Esse metodo cria algo visual.
        this.template, //Esse objeto faz referencia ao componente ao qual o valor pego esta envolto
        {$implicit:i} //Aqui eh tratado e colocado o valor.
      )   
    }
  }

  /*  
    Quando tem qualquer mudanca em um valor mapeado com @input, executa-se esse metodo.
    ele tem um parametro do tipo SimpleChanges que tem como atributos.
    Value do tipo SimpleChange no singular, que fica dentro do objeto SimpleChanges,
    e dentro desse objeto com o nome no singular temos:
        currentValue: => Aqui tem o novo valor.
        firstChange: => Retorna um booleano se eh ou nao a primeira mudanca feita.
        previousValue: => Aqui o valor antigo, anterior ao novo.
  */
  ngOnChanges(change:SimpleChanges){
    console.log(`%c onChange ativado pela diretiva structure`,'background-color:purple;color:white;');
    console.log(change);    
    this.fnComponent(change.value.currentValue);        
  }
 
}
