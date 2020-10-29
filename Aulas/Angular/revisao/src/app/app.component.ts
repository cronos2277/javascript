import { Component, Input, SimpleChanges} from '@angular/core';
import { EventEmitter } from 'events';
import { Format } from './format';
import { ServService } from './serv.service';

@Component({
  selector: 'root', //tag principal diferente do padrao
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public falso:boolean = false; //Variavel boolean que esconde a SPAN  
  public valor:number = 0;
  public ip:string;
  public header:Format; // Eh posivel formatar com base em uma interface
  private exibirAoCarregar(e,f){
    console.time(`#${f}`);
    console.log(`%c ${e}`,'background-color:green;color:white');
    console.timeEnd(`#${f}`);
  }
  
  //O Construtor eh chamado quando o elemento eh construido.
  constructor(public serv:ServService){
    this.exibirAoCarregar('construtor carregado','constructor');
    //Dando subscribe em um observable, a primeira callback eh a de interacao
    serv.observable$.subscribe(console.log) 
    //Quando se tem mais de uma callback...
    serv.getIp().subscribe(
        e => this.ip = e.ip, //Interacao e processamento dos dados.
        console.error, //Caso de erro
        () => console.warn('IP pego com sucesso!') //Ao concluir a execucao do Observable.
      );
    
      //Observable basico apenas a interacao.
      serv.post().subscribe(e => this.header = e);             
      
  }

    //Funcao estruturado em TS
  public aumentaValor():void{
    this.valor += 1;
  }

  public data:number = Date.now();

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

  //Ciclo de vida de um componente em ordem de execucao
  /*
    Monitora todos os componentes que possuem a anotacao @Input,
    a cada alteracao nesses componentes, esse evento eh disparado.
  */
  ngOnChanges(s){    
    this.exibirAoCarregar('On Changes carregado','changes');
  }

  /* 
    Util caso voce necessite inicializar um componente logo apos
    concluir a execucao do construtor, diferente do changes, esse
    eh executado uma unica vez apos o construtor. Use-o quando
    voce precisar usar algo ao inicializar o componente, mas
    depois de executado o construtor, geralmente componentes
    do Angular devem ser inicializado aqui.
    */

  ngOnInit(){ 
    this.exibirAoCarregar('OnInit carregado','init');
  }

  /*
    Esse metodo executa uma varredura por todo e qualquer
    evento ja logo enseguida do onInit, ele deve ser
    usado quando voce quer varrer um evento, assim que
    ele for inicializado.
  */
  ngDoCheck(){
    this.exibirAoCarregar('doCheck carregado','init');
  }

  /*
    É chamado depois que o conteúdo externo dos componentes foi inicializado.
    Ou seja eh inicializado quando o componente esta carregado, mas
    nao os componentes filhos.    
  */
  ngAfterContentInit(){
    this.exibirAoCarregar('AfterContentInit carregado','AfterContentInit');
  }

  /*
    Tambem executa uma varredura igual ao doCheck, mas diferente
    desse, esse metodo comeca apos o carregamento de todo o 
    componente, logo na pratica o uso desse metodo geralmente
    exclui a necessidade do doCheck.
  */
  ngAfterContentChecked(){
    this.exibirAoCarregar('AfterContentChecked carregado','AfterContentChecked');
  }
  /*
    Isso é chamado depois que o template do componente e de suas vistas filhas foram inicializadas.
    Ou seja esse metodo diferente do AfterContentView eh executado depois de
    inicializado todos os componentes filhos desses.
  */
  ngAfterViewInit(){
    this.exibirAoCarregar('AfterViewInit carregado','AfterViewInit');
  }

  /*
    Aqui caso voce queira iniciar uma varredura, apos inicializado tudo,
    incluindo componentes filhos, tambem funciona semelhante ao doCheck
    e ne pratica pode substituilo, mas com a diferenca que ele comeca
    a varredura apos tudo carregado.
  */
  ngAfterViewChecked(){
    this.exibirAoCarregar('AfterViewChecked carregado','AfterViewChecked');
  }

  /*
    Executado quando o componente morre, caso o Angular mate esse componente,
    ou seja ele deixe de ser executado, esse metodo eh executado, no caso
    isso eh util quando voce quer executar alguma coisa quando o elemento
    eh deletado ou deixa de ser renderizado. No caso esse metodo funciona
    como um Destrutor. Geralmente eh usado para dar unsbscribe em observables
    dentre outras coisas que liberam memoria.
  */
  ngOnDestroy(){
    this.exibirAoCarregar('ngOnDestroy carregado','ngOnDestroy');
  }
  
}
