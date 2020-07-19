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
`ng g m AppRouting -m app --flat`, no caso nesse exemplos estamos mantendo dentro do arquivo [app.modules.ts](src/app/app.module.ts)