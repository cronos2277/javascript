//O Input precisa ser importado para functionar a anotacao.
import { Component, OnInit, Input } from '@angular/core';

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
  ngOnInit() {
  }

}
