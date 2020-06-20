import { Component, OnInit } from '@angular/core';

/*
  Esse modelo contem o modelo do formulario, o ngModel
  vai preencher uma instancia criada com essa interface
  de maneira automatica.
*/
interface Modelo{
  valor1:string; /* Obrigatorio */
  valor2?:string; /* Opcional devido ao interrogacao */
  valor3?:string; /* Opcional devido ao interrogacao */

}

@Component({
  selector: 'app-formulario-modulo',
  templateUrl: './formulario-modulo.component.html',
  styleUrls: ['./formulario-modulo.component.css']
})
export class FormularioModuloComponent implements OnInit {

  /*
    Como apenas o valor 1 eh obrigatorio, logo apenas esse
    eh obrigado a ser preenchido.
  */
  public modelo:Modelo = {
    valor1:""
  }

  submitted:boolean = false; 

  constructor() { }

  /*
    Disparado quando clicado no botao submit.
  */
  public modeloFuncao(formClient,valor1,valor2,valor3){ 
    console.clear() //Limpa o console do navegador.
    console.log('%c #formClient="ngForm"',"font-size:18px");           
    console.table(formClient); //Console.table exibe o objeto em uma tabela.
    console.log('%c #valor1="ngModel"',"font-size:18px");       
    console.table(valor1);    
    console.log('%c #valor2="ngModel"',"font-size:18px");       
    console.table(valor2);    
    console.log('%c #valor3="ngModel"',"font-size:18px");       
    console.table(valor3);    
  }

  ngOnInit() {
  }

  public onSubmit(){
    console.log("sbmt");
    this.submitted  = true;
    return true;
  }
}
