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
  public cor:string = '#000000'
  // A funcao ligado ao input do 2 way databind do HTML
  // Caso o valor inserido no input nao bata com a regex manda invalido
  //A regex avalia se o campo inserido no input text eh valido para input color
  validar(elemento):boolean{
    const texto:string = elemento.cor;
    console.log(
      (/^#[\da-fA-F]{6}$/.test(texto))
        ?"%cValor Valido":"%cValor invalido",
        'background-color:black;color:white;font-size:14px'
      )    
      return this.validoInputCor = /^#[\da-fA-F]{6}$/.test(texto);
  }
  
  //Essa variavel eh responsavel por exibir se o valor informado, serve para um input color. 
  public validoInputCor:boolean = true;
}
