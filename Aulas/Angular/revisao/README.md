# Revisão
## Diretivas
[arquivo template](src/app/app.component.html)

[arquivo de tag](src/app/tag.directive.ts)

### O que é?
Diretivas são seletores criados (pode ser um id, classe, tag, etc... ) que quando aplicado em um elemento, ele modifica o estilo ou o comportamento.

### Exemplo no template
` <h1 tag>HOOP</h1>` => Esse tag é um exemplo de uma diretiva customizável.

### imports
    import { Directive, ElementRef } from '@angular/core';
### Informação no decorator
    @Directive({
        selector: '[tag]' //define aqui um seletor com base no JQuery ou no querySelector do JS.
    })

### Na Classe
    export class TagDirective {
        constructor(ref:ElementRef){    
            ref.nativeElement.style.color = 'yellow';      
            ref.nativeElement.style.background = 'blue';     
            console.log('%c Elemento capturado com o Tag Directive','color:yellow;background:blue');
            console.log(ref.nativeElement);
        }
    }

### Explicando.
Repare que [na classe](#na-classe) é usado o construtor e dentro do construtor se recebe via injeção de independencia no próprio elemento html, no caso esse elemento ele possui um atributo `nativeElement`, ao qual possui todos os atributos e no caso esse elemento, no caso o elemento que implementa essa diretiva, que nesse caso é uma tag, ele é processado e alterado nessas linhas:
#### Alterando cor e cor de fundo
    ref.nativeElement.style.color = 'yellow';      
    ref.nativeElement.style.background = 'blue'; 

### Definindo a diretiva
Aqui definimos o [seletor](#informação-no-decorator), no caso a lógica aqui é semelhante ao *querySelector* ou o *JQuery*, repare que dentro desse contexto, esse seletor de **colchetes** refere-se a atributos, mas se fosse classe teria que ser ponto, id hash e etc... Mas como está envolto de conchetes, logo a forma de uso dessa diretiva é como atributo.

### Outras diretivas
    <button *ngIf="1 == 1" [value]="valor" (click)="aumentaValor()">Clique: {{valor}}</button>
o asterisco refere-se a uma diretiva que inclui ou exclue um elemento html, nesse caso `*ngIf="1 == 1"` se verdadeiro, como é o caso ele é exibido, se falso sequer é renderizado, `[value]="valor"` isso aqui significa interpolação, no caso o atributo *value* tem como valor o resultado da variavél *valor*, no caso o funcionamento disso se assemelha com um ponteiro, `(click)` indica evento=função, no caso seria algo como `onclick=aumentaValor()`, ou seja você pode mapear eventos a funções usando diretivas envolto de parentes. `{{valor}}` aqui temos a área de processamento, no caso isso seria equivalente ao `<?php=` ou a `<%=` ou seja só deve ser passado valores ali que são imprimíveis.

## Angular pipes