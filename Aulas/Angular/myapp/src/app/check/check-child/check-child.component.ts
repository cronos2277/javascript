import { Component} from '@angular/core';

/*
  Os Checks sao uma forma avancada de analisar eventos no
  Angular, eles servem caso os eventos do angular nao
  seja suficientes. Os checks monitoram toda e qualquer
  alteracao, seja por mouse, teclado, url, ajax, etc...
  Eh muito facil voce criar eventos infinitos com os checks,
  logo eh necessario cuidado e sempre bom evitar de usa-los
  caso haja alternativas.
*/

@Component({
  selector: 'app-check-child',
  templateUrl: './check-child.component.html',
  styleUrls: ['./check-child.component.css']
})
export class CheckChildComponent{  
  public doCheck:number=0;  

   /*
    Chamado logo depois do init e antes do ngAfterContentInit,
    esse metodo na primeira execucao voce pode fazer checagens 
    para ver se os valores iniciados pelo ngOnInit foram iniciados 
    direito. Ele eh executado multiplas vezes a cada interacao.
    Ou seja a cada interacao do usuario com usuario, esse metodo 
    eh disparado. Isso incluir, mouse, teclado, mudanca de rota 
    na url, conexao via ajax, ou qualquer interacao com o objeto
    window ou document, enfim a qualquer situacao esse metodo eh 
    disparado. Cuidado, pois pode acontecer situacoes dele ser 
    executado infinitamente. Esse metodo eh mais avancado, 
    e o angular disponibiliza ele, caso o ngOnInit nao atenda as
    necessidades, como por exemplo na criacao de um componente
    avancado que envolve verificacao de url, teclado ou posicao
    de mouse por exemplo, ou se um conteudo ajax foi concluido.
    Ele tambem eh executado antes do: ngAfterContentInt
  */  

  ngDoCheck() {
    if(this.doCheck === 1){
      console.log("     CheckChild: ngDoCheck");
    }    
    
    
  }
  /*
    Executado apos o ngAfterContentInt, tem a mesma funcionalidade
    que o ngDoCheck, mas se diferencia do mesmo, uma vez que o
    ngDoCheck eh executado ANTES do ngAfterContentInt e ESSE EVENTO
    EH EXECUTADO DEPOIS DO: ngAfterContentInt.
    Esse evento eh executado antes do ngAfterViewInit.
  */

    ngAfterContentChecked() {
    if(this.doCheck === 1){  
      console.log("     CheckChild: ngAfterContentChecked");
    }
  }

  /*
    Executado depois do ngAfterViewInit. Tem a mesma regra que os
    dois checks acimas, porem difere de ambos na ordem de execucao.
  */
  ngAfterViewChecked() {
    if(this.doCheck === 1){    
      console.log("     CheckChild: ngAfterViewChecked");
    }
    this.doCheck++; 
  }

}
