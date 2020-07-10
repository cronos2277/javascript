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