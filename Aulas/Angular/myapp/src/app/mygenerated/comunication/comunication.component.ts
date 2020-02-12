//O Input precisa ser importado para functionar a anotacao.
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
/*
  Preste muita atencao ao importar o EventEmmit, importe-o do angular e nao do 
  "protractor", o EventEmitter usado aqui vem do @angular/core.
*/
@Component({
  selector: 'app-comunication',
  templateUrl: './comunication.component.html',
  styleUrls: ['./comunication.component.css']
})
export class ComunicationComponent implements OnInit {

  constructor() { }
  /*
    Essa anotacao input ela pemite a passagem de parametros para dentro
    do componente, por exemplo, como o seletor eh app-comunication, a 
    forma com que a mesma eh chamada, eh atraves: <app-comunication>,
    para escrever o atributo abaixo, voce faz da seguinte forma: 
    <app-comunication atributo="Valor a ser inserido, respeitando o tipo"></app-comunication>
    no entanto a leitura se faz interpolando o valor, usando {{atributo}}, um exemplo
    pode ser encontrado no arquivo comunication.component.html
  */
  @Input() atributo:string; //Notacao simples.
  /*
    Aqui temos um exemplo um pouco mais complexo. O parametro eh usado para a escrita,
    quando passado o parametro na chamada da tag (nesse caso, ja que o seletor eh uma tag),
    e para leitura usamos a variavel. Assim sendo, abaixo um exemplo de como passar o valor:
    <app-comunication parametro="Valor a ser inserido, respeitando o tipo"></app-comunication>
    agora abaixo temos um exemplo de como acessados esse valor passado como parametro.
    {{variavel}}
    Nesse exemplo abaixo temos como o valor eh passado pela tag, nesse caso informando e passando
    valor para o parametro, podendo o mesmo sendo resgatado por um atributo chamado variavel.
    */
  @Input('parametro') variavel:string; //Aqui com valor.
  /*
    No exemplo abaixo estamos recebendo um objeto, no caso esse valor eh generico, voce nao eh 
    obrigado a especificar o tipo, mas aqui ele eh usado como um objeto de fato.
  */
  @Input() objeto;
  /*
    Aqui temos um exemplo basico do output, sem a passagens de tipo.
    O output permite com que o componente receba um evento do componente que esta o chamando,
    nesse caso o mesmo ira executar a funcao que for passada como parametro do atributo eventoOuput.
    Se executado o evento nesse componente, o mesmo ira executar a funcao que sera definida por 
    parametro aqui. A sintaxe eh semelhante ao input, se passar uma string no output, a string
    vai se referir ao nome do parametro a ser informado e o nome do atributo eh evento em questao.
    Voce pode definir um tipo ao emit usando a sintaxe de diamante, que a de generics do Typescript.
    o eventoOutput recebera a funcao passada como parametro, nesse caso:
    <app-comunication (eventoOutput)="envoque a sua funcao aqui"></app-comunication>
    Envocar significa colocar os parenteses depois do nome da funcao, ou seja nao trata-la como um dado.
    Uma vez passada a sua funcao, a mesma sera chamada quando for executado o metodo emit() desse atributo
    do tipo EventEmitter abaixo.
  */
  @Output() eventoOutput = new EventEmitter();

  meuEvento(){
    /*
      Aqui eh executado a funcao do eventoOutput, a funcao passada, so sera executada quando esse metodo for
      chamado. Colocar null como parametro eh a sintaxe mais simples dela. No caso esse metodo foi associado
      ao Evento onclick de um botao, dentro desse componente, o nome do botao eh emit. Quando ele for clicado
      e esse metodo for chamado, sera executado a funcao que o componente passou usando o evento "eventoOutput".
    */
    this.eventoOutput.emit(null);
  }
  /*
    Aqui temos um exemplo mais complexo envolvendo o "EventEmitter", nesse exemplo temos a tipagem dentro do diamante,
    nesse caso string. Ou seja voce pode fazer algo mais especifico.
  */
  @Output() eventoComplexo = new EventEmitter<string>();
  meuEventoComplexo(event: string){
    /*
      Essa funcao eh executada quando o botao eh clicado. Esse event ele recebe um parametro tambem,
      esse parametro deve ser do mesmo tipo do informado no diamante acima, nesse caso string. Nesse
      caso o event, vendo de dentro da funcao que o chama, nesse caso do botao, que chama esse metodo.
      Quando se eh chamado uma funcao com parametro, voce passa esse parametro, como parametro do metodo
      emit(), ou voce pode omiti-lo passando null como parametro.
    */
    this.eventoComplexo.emit(event);
  }
  ngOnInit() {
  }

}
