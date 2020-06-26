import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, RequiredValidator } from '@angular/forms';
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
  private array_com_validacoes = [
    /* 
      Aqui eh feito as validacoes. Para isso voce deve criar um array e passar 
    como segundo parametro um array com as validacoes, no caso aqui temos 4
    validacoes que o reactive form pode fazer. Cada validator eh um objeto ao
    qual contem os dados do usuario em seu interior que permite a devida programacao
    do tratamento do erro.
    */
    Validators.required, /* Aqui estamos especificando que o campo eh obrigatorio. */
    Validators.minLength(4), /* O campo deve ter no minimo 4 caracteres */
    Validators.maxLength(10), /* O campo deve ter no maximo 10 caracteres */
    /* 
        Quando voce for colocar algum valor em String o Angular ira acrescentar a sua String 
      /^ antes e $/: depois. Voce tambem pode colocar um regex tambem direto, o regex eh 
      um tipo de dado do Javascript tambem aceito como parametro na funcao abaixo, no
      caso abaixo, dara erro caso o valor informado nao bata com a expressao regular abaixo. 
    */
    Validators.pattern(/[^0-9]/) 
  ];
  //Aqui temos a string vazia que informa o valor padrao do elemento e depois um array com as validacoes.
  public formControlBasico:FormControl = new FormControl('',this.array_com_validacoes);
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
    console.log("%c Erros de validacao","font-size:24px;color:red");
    console.log((this.formControlBasico.hasError)?this.formControlBasico.errors:"Sem erros");
    console.log(`%c Status:${this.formControlBasico.status}`,"font-size:24px;color:yellow;background-color:black");
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
  private arrayBuilder;
  public camposExemplos:FormArray;
  public camposExemplosComplexo:FormArray;
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
      /*
        Aqui abaixo temos um exemplo de como funciona o array,
        ele pode ser util caso precise criar novos elementos
        do tipo input ou select em tempo de execucao.
      */
    this.arrayBuilder = this.formBuilder.group(
      {
        /* 
            Aqui criamos um array no caso dentro desse metodo
          abaixo voce informa os valores padroes dos formControl,
          no caso para cada elemento que tiver dentro desse array
          sera criado um elemento e com o valor padrao, nesse caso
          apenas se cria um unico formcontrol cuja o valor eh uma 
          String vazia.
          */
        arrayExemplo:this.formBuilder.array(['']),
        /*
          Aqui abaixo temos um exemplo de como criar um array
          de objetos, ou seja, temos um array e dentro desse
          array temos um grupo e ai o objeto em questao com
          valores padroes
        */
        objetoComplexoExemplo:this.formBuilder.array([
          /*Dentro do array um group, temos aqui. */
          this.formBuilder.group(
            {
              cor:['#000'], range:[50]              
            })
        ])
      }
    );
    /* 
      Aqui estamos ampliando o escopo do array, tanto do simples
      como o array complexo formado por um conjunto de formControl.
      Essas dois atributos tem uma visibilidade publica e eh com
      base neles que o template vai trabalhar, no caso o template HTML.
      Metodos:
      .get('nome do atributo do form builder array') => {
        Esse metodo pega um atributo de dentro do formBuilder, a String
        passada eh o nome do atributo que voce quer pegar do formBuilder
        array.
      }

      o as eh uma forma de dar cast, de modo que o dado fique moldado a
      classe FormArray.
    */
      this.camposExemplos = this.arrayBuilder.get('arrayExemplo') as FormArray;
      this.camposExemplosComplexo = this.arrayBuilder.get('objetoComplexoExemplo') as FormArray;        
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

  /* 
    Esse metodo eh acionado quando o cliente requesita um novo elemento
    input em tempo de execucao.
  */
  adicionarInputsArray(){
    /* 
      Quando o formArray eh simples, voce pode fazer como em qualquer array e dar um push
    o metodo requer um .control como atributo, uma vez que se trata de um array de control.
    */
    this.camposExemplos.push(
      this.formBuilder.control('')
    );    
    /*
      Aqui um exemplo de um formArray mais complexo, a diferenca eh que aqui voce adiciona um 
      grupo.
    */
    this.camposExemplosComplexo.push(this.formBuilder.group(
      {
        cor:this.formBuilder.control(''),
        range:this.formBuilder.control('')
      }
    ));
  }

  exibirValorDosInputsArray(){
    console.clear();
    console.log("%c Objeto Form Array","font-size:24px;color:red");
    console.table(this.arrayBuilder);
    console.log("%c Valores dentro do FormArray","font-size:24px;color:red");
    console.log(this.arrayBuilder.value);    
  }

  
}
