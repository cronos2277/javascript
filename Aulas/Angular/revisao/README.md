# Revisão
## Arquivos
#### Arquivo template
[arquivo template](src/app/app.component.html)
#### Arquivo de diretivas
[arquivo de tag](src/app/tag.directive.ts)
#### Aquivo app.module.ts
[app.module](src/app/app.module.ts)

## Diretivas
Nesses arquivos [diretiva](#arquivo-de-diretivas) e [template](#arquivo-template) você acompanha com mais detalhes o que é explicado aqui.
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

#### Diretivas estruturais
A diretiva estrutural é mais complexa, aqui está um arquivo explicando: [structure](src/app/structure.directive.ts)

## Angular pipes
    <h4>Data de Hoje: {{data | date: 'fullDate' | uppercase}}</h4>
### O que é?
No caso você pode formatar a impressão de dados em uma página HTML, aqui é imprimido a data `{{data}}`, aqui a data fica formatada `{{data | date: 'fullDate' }}` e aqui alem de formatada fica em maíuscula além de formatada `{{data | date: 'fullDate' | uppercase}}`. Exemplos aqui [template](#arquivo-template).

## Two Way databinding
    <input type="color" [(ngModel)]="cor"/> 
### O que é?
O Two way databinding é uma comunicação de duas vias, ou seja a variável alterada no TS reflete no template *É assim no one way data binding também*, no two way, temos que o valor alterado no tamplate também é modificado na variável, ou seja uma comunicação em duas vias, para isso você usa um `[(ngModel)]` e como valor você passa a variável, o gerenciamento do valor é em partes feito pelo ngModule.

### Importando módulo
    import { FormsModule } from '@angular/forms';
Você precisa importar esse módulo no `app.module.ts` ou no componente se for um import tipo lazy para que o *ngModul* funcione, conforme abaixo:
    
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule
    ],

### Na prática
Você precisa importar, nesse exemplo isso é feito nesse arquivo [app.module](src/app/app.module.ts) e o template se for o caso [template](src/app/app.component.html).

## Rotas
#### Arquivo de rota
[rota](src/app/app-routing.module.ts)
#### Componente 1
[Componente Vermelho](src/app/ret1.component.ts)
#### Componente 2
[Componente Verde](src/app/ret2.component.ts)
#### Componente 3
[Componente Azul](src/app/ret3.component.ts)

### O que é?
Com esse recurso você pode renderizar componentes em partes específicas da página de acordo com a url, para isso você deve marcar com a tag `<router-outlet></router-outlet> `, aonde deve ficar o componente, caso seja informado a rota, desse modo você modificar apenas esse trecho do site sem ter que forçar o usuário a um novo recarregamento, segue o arquivo de exemplo: [template](src/app/app.component.html).

### Arquivos de rotas
    const routes: Routes = [
    {
        component:AppRet1, 
        path:"ret1" 
    },
    {
        component:AppRet2,
        path:"ret2"
    },
    {
        component:AppRet3,
        path:"ret3"
    }
    ];
### Arquivo de rotas    
Você deve informar dentro de um array as rotas, dentro desse array deve conter um objeto contendo o componente a ser carregado e a rota ao qual ele responde, segue o arquivo exemplo: [rotas](src/app/app-routing.module.ts), o `component` equivale-se ao componente a ser carregado e o `path` e aqui é informado a rota ao qual o componente responde.

### routerLink
    <button routerLink="ret1">Retangulo Vermelho</button>
    <button routerLink="ret2">Retangulo Verde</button>
    <button routerLink="ret3">Retangulo Azul</button>
    
#### Explicando:
O routerlink ele seria o equivalente ao *href*, mas com a vantagem de ser entegrado a API do angular, logo recomenda-se o uso do `routerLink`.

## Ciclo de vida de componentes
[Exemplo](src/app/app.component.ts)
### ngOnInit, ngAfterContentInit, ngAfterViewInit, ngOnDestroy
`ngOnChanges` monitora alterações em qualquer elemento com a anotação `@Input`, `ngOnInit` é inicializado logo após o carregamento do construtor, geralmente usado para carregamentos de componentes na primeira oportunidade possível, mas depois que o componente passa a existir, ou seja, depois de instanciado. Já o `ngAfterContentInit` é executado quando o componente é carregado, logo em seguida temos o `ngAfterViewInit`, que é executado depois que os templates e o componente filho é executado, e claro o Angular tem um destrutor no caso um `ngOnDestroy`.

### ngDoCheck, ngAfterContentChecked, ngAfterViewChecked
Esses três métodos são de varreduras, ou seja eles monitoram o objeto **document** do javascript, então qualque alteração, todos esses três são acionados, logo eles fazem uma varredura em todos os componentes dentro de document. Podem ser útil para a criação de eventos customizáveis. A diferença entre esses três eventos, se dá na primeira vez que são executados, o `doCheck` é executado logo após o `ngOnInit`, o `ngAfterContentChecked` é executado depois de carregado o componente, mas antes de ser carregado o template e os componentes filhos, já o `ngAfterViewChecked` começa a varredura depois de carregado tudo.

### ngOnChanges
Esse método monitora qualquer valor mapeado com `@Input`, permitindo com que se faça analise dos valores com base em um objeto chamado chamado `SimpleChanges`, ao qual contém o valor novo, o antigo e se é ou não a primeira vez que foi modificado, Exemplo: [arquivo](src/app/structure.directive.ts).
#### Estrutura do parametro do metodo ngOnChanges:
    ngOnChanges(objeto:SimpleChanges)
##### Interior do Objeto SimpleChanges
`SimpleChange.currentValue` => Nesse subatributo de `SimpleChange` dentro de `SimpleChanges`, apresenta o valor mais novo informado

`SimpleChange.firstChange` => Nesse subatributo de `SimpleChange` dentro de `SimpleChanges`, retorna um valor booleano informando se foi ou não alterado o valor.

`SimpleChange.previousValue` => Nesse subatributo de `SimpleChange` dentro de `SimpleChanges`, apresenta o valor mais antigo informado

## Serviços
[Serviço exemplo](src/app/serv.service.ts)

[Interface](src/app/format.ts)
### Como funciona.
Um serviço funciona com base na injeção de dependencia, logo aqui é o local ideal para programar as regras de negócios referente ao backend e tambem para colocar os códigos que devem ser reaproveitados pelos componentes.

### Decorando
    @Injectable({
        providedIn: 'root'
    })
#### Explicando
Todo o serviço deve ser decorado com `@Injectable`, aqui `providedIn: 'root'` você informa o escopo do serviço, no caso por ser *root*, esse seria um alias para toda a aplicação, você deve informar um *alias* ou um componente, módulo ou diretiva para ao qual pode ser injetado e com base nesse escopo se tem um controle de instancias.

### HTTP Module
#### Importando
##### import app.module.ts
    import { HttpClientModule } from '@angular/common/http';

##### adicionando no array no app.module.ts
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],

##### import no arquivo service: 
    import { HttpClient } from '@angular/common/http';

##### Esse módulo usa a injeção de dependencia.
    constructor(private http:HttpClient) { }

#### Usando o método GET
    return this.http.get('http://ip.jsontest.com/');

##### Explicando
Esse método retorna um Observable, nesse método você deve informar a url para a requisição.

#### Usando o método POST
    return this.http.post('http://headers.jsontest.com/',{valor1:'valor1',valor2:'valor2'})
    .pipe(
        tap(e => console.log(`%c Origem da requisicao: ${e['Origin']}`,'background-color:black;color:white')),
        tap(e => console.log(`%c Navegador: ${e['User-Agent']}`,'background-color:black;color:white'))
    );

##### Explicando
Já no caso do post além da url você deve informar também os campos da requisição body. Também foi usado operadores pipe para exibir dados no console do navegador.