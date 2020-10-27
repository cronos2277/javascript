import { Component} from '@angular/core';

@Component({
  selector: 'root', //tag principal diferente do padrao
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public falso:boolean = false; //Variavel boolean que esconde a SPAN  
  public valor:number = 0; //Variavel definido via TS

    //Funcao estruturado em TS
  public aumentaValor():void{
    this.valor += 1;
  }

  // A variavel do 2 way databinding no HTML
  public cor:string = 'black'
  
}
