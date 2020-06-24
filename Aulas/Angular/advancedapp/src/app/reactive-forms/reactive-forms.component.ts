import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  
  /*
    Reactive form ele tem utilidade para campos avulsos sem 
    estar em um formulario. Ele te permite manipular o elemento
    html independente de um formulario, seja um input, ou um
    select por exemplo. Se faz necessario importar "ReactiveFormsModule"
    de '@angular/forms'; esse arquivo tambem tem o modulo "FormsModule",
    entao cuidado para nao se confundir. 
    Atributos:
    .valueChanges => {
      Um observable que eh executado quando acontece a mudanca de
      valores no elemento. Quando tem uma mudanca nos valores, ou
      seja quando ocorre um onChange, o observable passa a ser
      executado.
    }
    .pristine => {
      Booleano, true se o campo estiver com o valor padrao, false
      depois de alterado o valor padrao, uma vez alterado para false,
      o mesmo permenecera falso.
    }
    .touched => {
      Booleano, true se o elemento foi tocado, por tocado entenda uma
      interacao do tipo onfocus.
    }

    new FormControl('Valor inicial') => {
      voce pode instanciar essa classe sem parametros tambem, ficando assim:
      new FormControl(), porem caso tenha um parametro, esse sera valor inicial
      do elemento.
    }
  */
  public formControlBasico:FormControl = new FormControl();
  public formControlBasico$:Subscription = null;
  public resultadoBasico:string = "";
  /*
    FormGroup permite agrupar os formControl dando tambem uma
    estrutura para fazer tratamento dos dados. O FormGroup
    aceita como parametro um objeto e esse objeto deve conter
    FormControl. O Objetivo do formgroup eh montar um objeto
    com os dados dos elementos, entao o formgroup pega os
    valores do formcontrol e monta um objeto pronto dentro do
    atributo: .value. Uma vez que voce acesse esse atributo
    voce pega um objeto com os valores dos formControls devidamente
    estruturado, nesse exemplo abaixo quando acessarmos o .value,
    teremos a seguinte estrutura: 
        { "valor do input1", "valor do input2" }
  */
  public grupo:FormGroup = new FormGroup(
    {
      /*
        Aqui estamos criando os atributos, voce deve instanciar
        o FormGroup ou o FormControl
      */
      input1: new FormControl(),
      input2: new FormControl(),
      subatributo: new FormGroup({
        /*Voce pode colocar um formgroup dentro de outro. */
        input3: new FormControl(),
        input4: new FormControl('Exemplo de subatributo')
      })
    }  
  );

  public executarFormGroup(){
    console.clear();
    console.log("%c Objeto Form Group","font-size:24px;color:red");
    /* Aqui printa a estrutura do FormGroup */
    console.table(this.grupo);
    /*Aqui exibimos um objeto pronto com todos os valores. */
    console.log(this.grupo.value);
  }

  ngOnInit() {
    this.formControlBasico$ = this.formControlBasico.valueChanges.subscribe(
      valor_alterado => {
        console.clear();
        this.resultadoBasico = valor_alterado;       
        console.log(valor_alterado); 
      },
      erro => console.error(erro)      
    );
    
  }

  public exibirEstruturaFormControl(){
    console.clear();
    console.log("%c Form Control","font-size:24px;color:red");
    console.table(this.formControlBasico);
  }
  /*
    Essa eh uma outra estrategia, no caso seria o formBuilder.
    O formBuilder trabalha com a injecao de dependencia, 
    voce o chama no construtor e monta o mesmo usando 
    o metodo ".group" ou "control" ou "array". nenhuma restricao
    precisa ser colocado no html, como required ou minlenght,
    voce pode fazer isso aqui.
    Metodos:
    .group => {
      ele aceita um objeto contendo a estrutura de como
      deve ser o objeto montado, assim como no formGroup,
      porem ao inves de instanciar um formGroup, voce 
      usa a injecao de dependencia e cria essa estrutura
      usando o metodo group.
    }
  */
  public builder;  
  constructor(private formBuilder:FormBuilder) {     
    this.builder = this.formBuilder.group(
      {
        atributo:[''],
        /*
          Voce pode colocar um group dentro de outro,
          no caso dessa forma criamos subatributos.
        */
        objeto: this.formBuilder.group({
          subatributo:['']
        })
      }
    );
  }

  executarBuilder(){
    console.clear();
    console.log("%c Objeto Form Builder","font-size:24px;color:red");
    console.log(this.formBuilder);
    console.log("%c Objeto Builder","font-size:24px;color:red");
    console.table(this.builder);
    console.log("%c Valor tratado","font-size:24px;color:red");
    console.log(this.builder.value);    
  }
}
