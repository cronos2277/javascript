import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[tag]' //define aqui um seletor com base no JQuery ou no querySelector do JS.
})
export class TagDirective {
/*
  Aqui estamos customizando todos os atributos que tiverem o atributo
  tag, conforme o definido no selector acima:
  @Directive({
    selector: '[tag]'
  })
  Assim que o elemento for carregado, ele será passado por injecao
  de dependencia ao ref abaixo e com base nesse objeto sera feito
  as customizacoes, a diretiva precisa ser carregada aqui:
    @NgModule({
    declarations: [
      AppComponent,
      TagDirective
    ],
    No caso voce precisa informar ela no app.modele.ts se for criar
    tudo no braco, mas com o 'ng generator directive "nome"' tudo
    isso eh feito de maneira automatica.
*/
  constructor(ref:ElementRef){    
      ref.nativeElement.style.color = 'yellow';      
      ref.nativeElement.style.background = 'blue';     
      console.log('%c Elemento capturado com o Tag Directive','color:yellow;background:blue');
      console.log(ref.nativeElement);

  }

}
