import { Component} from '@angular/core';

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
    executado infinitamente.
  */  

  ngDoCheck() {
    if(this.doCheck === 1){
      console.log("     CheckChild: ngDoCheck");
    }    
    
    
  }

    ngAfterContentChecked() {
    if(this.doCheck === 1){  
      console.log("     CheckChild: ngAfterContentChecked");
    }
  }

  
  ngAfterViewChecked() {
    if(this.doCheck === 1){    
      console.log("     CheckChild: ngAfterViewChecked");
    }
    this.doCheck++; 
  }

}
