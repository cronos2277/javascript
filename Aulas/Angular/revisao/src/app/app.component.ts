import { Component} from '@angular/core';

@Component({
  selector: 'root', //tag principal diferente do padrao
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public valor:number = 0; //Variavel definido via TS

  //Funcao estruturado em TS
  public aumentaValor():void{
    this.valor += 1;
  }
}
