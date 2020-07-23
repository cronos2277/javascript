# Advancedapp

Para funcionar a Aplicacao inicie o servidor. Para isso vai no diretorio "server-name-api" e o inici-o com o comando "npm i" para instalar as dependencias e depois de instalado as dependencias, voce usa o "npm start".

## Arquivos Base
[app.component.css](./src/app/app.component.css)
[app.component.html](./src/app/app.component.html)
[app.component.spec.ts](./src/app/app.component.spec.ts)
[app.component.ts](./src/app/app.component.ts)
[app.module.ts](./src/app/app.module.ts)

## Requisitos: 
Veja nesse arquivo [app.module.ts](./src/app/app.module.ts), quais sao os modulos que voce precisa importar para determinado modulo funcionar.
para funcionar o http por exemplo voce precisa desse "**HttpClientModule**", depois no ngModule e o formulario voce vai precisar desse "**FormsModule**",
caso voce faca uso do Reactive forms, provalvelmente, tera que usar esse "**ReactiveFormsModule**"

## Rotas
### Arquivos
[Arquivo HTML](src/app/rotas/rotas.component.html) => Arquivo HTML

[Arquivo HTML](src/app/rotas/rotas.component.css) => Arquivo CSS

[Arquivo TS](src/app/rotas/rotas.component.ts) => Arquivo contendo os codigos TS.

[app.modules.ts](src/app/app.module.ts) => Arquivo aonde esta as configuracoes da rota

### Criando arquivos de rotas
Criando rotas, em um projeto existente, caso voce tenha um sistema de rotas muito complexo ou muito grande, seria interessante, esse arquivo estar separado do **app.module.ts**
`ng g m [NOME_DO_MODULO] -m app --flat`, no caso nesse exemplos estamos mantendo dentro do arquivo [app.modules.ts](src/app/app.module.ts)

### Pegando parametros de rotas
[Exemplo de um Arquivo TS](src/app/rotas/parametros/parametros.component.ts), aqui nesse arquivo tem um exemplo de como funciona, mas voce precisara importar `import {ActivatedRoute, ParamMap} from '@angular/router';` o **ActivatedRoute** eh um servico que funciona por meio da injecao de dependencia, com esse objeto voce vai trabalhar com parametros passado pela url, ja o **ParamMap** eh um observable dentro do **ActivatedRoute** que nao so devolve o valor pego na url no parametro da callback, como tambem monitora por mudancas. [Arquivo de template HTML](src/app/rotas/parametros/parametros.component.html)

### Criando arquivos de rota basico
 Voce pode usar esse comando para criar rotas, `ng g m [NOME_DO_MODULO] -m app --routing`, no caso esse comando cria dois arquivos, um contendo as rotas e com tudo pronto para implementar os arquivos e outro correspondente ao modulo.

 [Arquivos de Rotas Criado com o comando acima](src/app/routas-externa/routas-externa-routing.module.ts)

 [Arquivos de Modulos](src/app/routas-externa/routas-externa.module.ts)

 Rota em arquivo externo, caso voce queira saber como eh a estrutura de um arquivo de rota separado do app.module.ts, veja esse arquivo [Rotas Externas](src/app/rotas-externa/routas-externa-routing.module.ts)