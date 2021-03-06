<h1>Angular 2</h1>
<h2>Revisao</h2>
<p>Segue a pasta para uma rápida revisao: <a href="./revisao/">revisao</a>, contem exemplos com os conceitos mais basico do angular.
<h2>Exemplo basico</h2>
<p>A pasta <a href="./myapp/">myapp</a>, contem os exemplos mais basicos envolvendo Angular 2</p>
<h3>Basico</h3>
<p>
  Os exemplos mais basicos do Angular, podem ser acompanhados aqui:
  <br>
  <a href="./myapp/src/app/mybasic.components.ts">mybasic.components.ts</a>, modelo extremamente basico, nao possui
  HTML e CSS.
  <br> 
  <a href="./myapp/src/app/mycomposite.components.ts">mycomposite.components.ts</a>, sendo o html <a href="./myapp/src/app/mycomposite.components.html">mycomposite.components.html</a>,
  e o css <a href="./myapp/src/app/mycomposite.components.css">mycomposite.components.css</a>
</p>
<p> Para ver os exemplos mais basicos de diretivas do Angular, acesse o arquivo <a href="myapp/src/app/mygenerated/inside/inside.component.html" target="_blank">inside.component.html</a>, sendo esse um componente interno do componente <a href="myapp/src/app/mygenerated/mygenerated.component.html" target="_blank">mygenerated.component.html</a>
</p>
<p>
Os arquivos html acima sao interpolados por uma classe, ao qual
contem toda as regras de negocio em javascript, nesse caso temos:<br>
Para <b><a href="myapp/src/app/mygenerated/inside/inside.component.html" target="_blank">inside.component.html</a> => <a href="myapp/src/app/mygenerated/inside/inside.component.ts" target="_blank">inside.component.ts</a><br></b>
Para: <b><a href="myapp/src/app/mygenerated/mygenerated.component.html" target="_blank">mygenerated.component.html</a> => <a href="myapp/src/app/mygenerated/mygenerated.component.ts" target="_blank">mygenerated.component.ts</a>
</b></p>
<p>
Aqui <a href="./myapp/src/app/app.module.ts">app.module.ts</a> temos o arquivo mais importante da aplicao, que eh carregado carregado pelo arquivo <a href="./myapp/src/main.ts">main.ts</a>. Todos os modulos
que serao implementados estaram dentro desse arquivo, assim como
a sua implementacao devera estar aqui dentro de <a href="./myapp/src/app/app.module.ts">app.module.ts</a>. Recomenda-se usar o ng quando
for criar um novo componente, ou qualquer coisa que seja, uma vez
que o ng faz toda essa parte de implementar dentro desse arquivo
de maneira automatica, estando assim pronto o seu novo componente
para uso. Agora se voce vai usar algo externo, ou algo instalado
pelo npm, nao esqueca de incluir isso nesse arquivo varias vezes citado aqui: <a href="./myapp/src/app/app.module.ts">app.module.ts</a><br>
Esse arquivo possui estilo e um html, sendo o seu estilo 
<a href="./myapp/src/app/app.component.css">app.component.css</a> e o
seu html <a href="./myapp/src/app/app.component.html">app.component.html</a> tendo tambem um
arquivo <a href="./myapp/src/app/app.component.ts">app.component.ts</a> aonde fica toda a regra
de negocios do componente, ou seja o arquivo principal tambem carrega um componente principal
que nesse caso eh o:  
</p>
<h3>Comunicacao Entre componentes</h3>
<p>
Aqui temos um exemplo da comunicacao entre componentes, nesse arquivo temos um exemplo da estrutura <a href="myapp/src/app/mygenerated/comunication/comunication.component.html">comunication.component.html</a>, sendo o arquivo da aonde esta a classe: <a href="myapp/src/app/mygenerated/comunication/comunication.component.ts">comunication.component.ts</a>.<br>
Esse componente assim como esses dois arquivos tem uma demonstracao de como funciona a comunicao entre componentes. Ou seja como funciona a comunicacao entre eles, tento entre componentes filhos como da mesma hierarquia.
</p>
<p>Aqui temos um outro exemplo, mais pratico e direto: <a href="advancedapp/src/app/file-upload-firebase/upload/upload.component.ts">upload.component.ts</a></p>
<h3>Ciclo de vida de componentes</h3>
<p>Aqui voce entendera como que funciona o ciclo de vida de um componente: <a href="./myapp/src/app/main-lifecycle/lifecycle-child/lifecycle-child.component.ts">lifecycle-child.component.ts</a>, os seguintes metodos sao detalhados ali:"<b> ngOnInit, ngOnChanges, ngAfterContentInit, ngAfterViewInit, ngOnDestroy</b>", Todos aqueles metodos necessarios caso voce queira manipular dados da classe do componente.</p>
<p>Exemplos Avancados de metodos usados na vida de componentes, sendo recomendado, apenas quando os metodo acimas nao servem:<br> 
Arquivo: <a href="./myapp/src/app/check/check-child/check-child.component.ts">check-child.component.ts</a>, sendo detalhado ali:
<b>ngDoCheck, ngAfterContentChecked, ngAfterViewChecked</b>, podendo ser util para programar interacoes mais avancadas entre os componentes, como mudanca da url, redirecionamento, etc... Basicamente qualquer coisa que aconteca com o navegador.
<h3>Servicos</h3>
<p>Como construir um servico, de modo que voce possa injetar nos componentes: 
<a href="./myapp/src/app/module1/service1.service.ts">service1.service.ts</a><br>
Aqui mais informacoes de como implementar e registrar um servico um servico:
<a href="./myapp/src/app/module1/module1.module.ts">module1.module.ts</a><br>
Aqui um exemplo de como usar e de como criar uma classe para implementar esse servico:
<a href="./myapp/src/app/module1/component1/component1.component.ts">component1.component.ts</a><br>
Aqui um exemplo de como definir o provider dentro da anotacao @Injetable:
<a href="./myapp/src/app/module2/service1.service.ts">service1.service.ts</a><br>
Aqui um exemplo de um servico criado por: <b>"ng g s [Servico]"</b>, o [Servico] deve ser substituido pelo nome do arquivo que voce quer criar, o arquivo criado pelo NG:
<a href="./myapp/src/app/service2.service.ts">service2.service.ts</a>
<br>
Servicos sao a maneira com que o Angular trabalha com as injecoes de dependencias, ou seja o servico eh algo injetavel, que cuja cada instancia podera ser reutilizada evitando custos com novas instanciacoes.
</p>
<h2>Observables</h2>
<h3>Cold-Observables</h3>
<p>Aqui temos um exemplo de cold-observables, no caso cada observer eh independente um do outro:<a href="./myapp/src/app/basicobserver/basicobserver.component.ts">basicobserver.component.ts</a>.</p>
<h3>Hot-Observables</h3>
<p>Aqui temos um exemplo de hot-observables, no caso o observer eh disponibilizado em grupo:<a href="./myapp/src/app/hot-observables/hot-observables.component.ts">basicobserver.component.ts</a>.</p>
<h3>Objeto Subjects com funcao de Observable e Observer</h3>
<p>Aqui um exemplo das entranhas do Subject: <a href="./myapp/src/app/subject/subject.component.ts">subject.component.ts</a> </p>
<p>Observables sao uma maneira de programacao reativa no Angular, com eles voce pode monitorar o Status de cada dado e ir trabalhando seguindo os principios da programacao reativa:</p>
<p>
<ul>
   <li> Elastico: Reage a demanda/carga: aplicacoes podem fazer uso de multiplos nucleos e multiplos servidores;</li>
    <li>Resiliente: Reage as falhas; aplicacoes reagem e se recuperam de
    falhas de software, hardware e de conectividade;</li>
    <li>Message Driven: Reage aos eventos (event driven): em vez de compor
    aplicacoes por multiplas threads sincronas, sistemas sao compostos de gerenciadores de eventos assincronos e nao bloqueantes;</li>
    <li>Responsivo: Reage aos usuarios: aplicacoes que oferecem interacoes
    ricas e tempo real com usuarios.</li>
</ul>
</p>
<h2>Operadores RXJS</h2>
<h3>Funcoes para criacao de Observables</h3>
<p>Aqui temos usamos funcoes para criar os Observers, sao uteis caso haja alguma exigencia, cronologica, reativa ou ate mesmo caso a complexidade possa ser reduzida, aqui os Observables sao criados com funcoes, um pouco diferente dos metodos acima: <a href="./myapp/src/app/rxjs/rxjs.component.ts">rxjs.component.ts</a></p>
<h3>Pipe e seus operadores</h3>
<p> Aqui eh explicado os operadores no metodo pipe, ao qual pode fazer um tratamento dos dados: <a href="./myapp/src/app/operadores/operadores.component.ts">operadores.component.ts</a></p>
<h3>Inscrevendo Observables com Async</h3>
<p> Aqui temos uma explicacao melhor de como funciona o Async e como eh possivel dar subscribe com ele:<br>
<a href="./myapp/src/app/rxjs-async/rxjs-async.component.ts">rxjs-async.component.ts</a><br>
<a href="./myapp/src/app/rxjs-async/rxjs-async.component.html">rxjs-async.component.html</a><br>
</p>
<h3>RXJS Drag </h3>
<p>
Aqui esta um exemplo de um componente arrastavel, usando os conceitos do Observables.<br>
<a href="./myapp/src/app/observables-rxjs-avancado/observables-rxjs-avancado.component.ts">observables-rxjs-avancado.component.ts</a><br>
<a href="./myapp/src/app/observables-rxjs-avancado/observables-rxjs-avancado.component.html">observables-rxjs-avancado.component.html</a>
</p>
<hr>
<h2> Angular 2, Exemplos mais avancados.</h2>
<p>A pasta <a href="./server-name-api/">server-name-api</a>, Eh um servidor que talvez precise ser inicializado para funcionar alguns exemplos. Inicie-o atraves do npm start, mas antes instale as dependencias usando npm install.</p>
<p>A Pasta com exemplos avancados: <a href="./advancedapp/">advancedapp</a></p>
<h3>HTTP no Angular</h3>
<p>
Aqui temos mais exemplo da conexao com o protocolo HTTP em um servidor externo, necessita do servidor acima rodando para funcionar:<br>
<a href="./advancedapp/src/app/http-modulo/http-modulo.component.html">http-modulo.component.html</a><br>
<a href="./advancedapp/src/app/http-modulo/http-modulo.component.ts">http-modulo.component.ts</a><br><br>
<a href="./advancedapp/src/app/app.component.html">app.component.html</a><br><br>
Lembrando que se faz necessario incluir pacotes aqui: <a href="./advancedapp/src/app/app.module.ts">app.module.ts</a><br><br>
</p>
<h3>Formulario no Angular</h3>
<p>
Aqui temos um exemplo de como o Angular gerencia um formulario, usando o #formularioVariavelNome="ngForm" e #nomeDaVariavelDoInput="ngModel",
e com isso voce pode usar o angular para controlar o formulario atraves do arquivo TS.
<a href="./advancedapp/src/app/formulario-modulo/formulario-modulo.component.html">formulario-modulo.component.html</a><br>
<a href="./advancedapp/src/app/formulario-modulo/formulario-modulo.component.ts">formulario-modulo.component.ts</a><br><br>
</p>
<p>
Aqui temos um exemplo de como funciona um reactive-forms: <br>
<a href="./advancedapp/src/app/reactive-forms/reactive-forms.component.html">reactive-forms.component.html</a><br>
<a href="./advancedapp/src/app/reactive-forms/reactive-forms.component.ts">reactive-forms.component.ts</a><br><br>
<p>
<hr>
<h3>Rotas</h3>
<p>Aqui temos mais um exemplo de rotas:</p>
<p>Pasta contendo as instrucoes: <a href="./advancedapp">readme</a></p>
<p>
Modulo de rotas:<br>
HTML: <a href="./advancedapp/src/app/rotas/rotas.component.html">rotas.component.html</a>
CSS: <a href="./advancedapp/src/app/rotas/rotas.component.css">rotas.component.css</a>
TypeScript: <a href="./advancedapp/src/app/rotas/rotas.component.ts">rotas.component.ts</a>
</p>
<p>Arquivo para pegar parametros: <a href="./advancedapp/src/app/rotas/parametros/parametros.component.ts">parametros.component.ts</a></p>
<p>Aonde esta a configuracao de rota:<a href="./advancedapp/src/app/app.module.ts">app.module.ts</a></p>
<p>
Rota em arquivo externo, caso voce queira saber como eh a estrutura de um arquivo de rota separado do app.module.ts, veja esse arquivo <a href="./advancedapp/src/app/rotas-externa/routas-externa-routing.module.ts">routas-externa-routing.module.ts</a>
</p>
<p>
Exemplo mais complexo: <a href="./advancedapp/src/app/rotas-externa/activate.route.ts">activate.route.ts</a>
</p>
<h3>Interceptacao</h3>
<p>Arquivo de exemplo,nesse arquivo esta toda a logica de como funciona a interceptacao de dados a cada 
 requisicao http. <a href="./advancedapp/src/app/autenticacao/autenticacao.interceptor.ts">autenticacao.interceptor.ts</a></p>
 <p>Voce precisara, alterar aqui:<a href="./advancedapp/src/app/app.module.ts">app.module.ts</a></p>
<hr>
<h3>Firebase</h3>
<p>Aqui temos um exemplo de um componente usando o firebase, no caso esse componente faz o crud: <a href="./advancedapp/src/app/firebase/firebase.component.ts">firebase.component.ts</a></p>
<p>Aqui temos um exemplo de um servico que faz a conexao com o firebase, repare que tudo funciona com apenas dois objetos: <pre>AngularFirestore</pre> e dentro dela temos um objeto
ao qual acessamos usando o atributo collection <pre>AngularFirestoreCollection</pre>, ao qual usa de modelo dentro do diamante <a href="./advancedapp/src/app/firebase/table.model.ts">table.model.ts</a></p>
<p>Aqui por fim temos o servico o objeto que faz efetivamente a conexao: <a href="./advancedapp/src/app/firebase/service.service.ts">service.service.ts</a></p>
<p>Lembrando que se faz necessario importar modulo no arquivo <a href="./advancedapp/src/app/app.module.ts">app.module.ts</a></p>
<h3>Firebase Storage</h3>
<p>Componente pai: <a href="./advancedapp/src/app/file-upload-firebase/file-upload-firebase.component.ts">file-upload-firebase.component.ts</a>, template <a href="./advancedapp/src/app/file-upload-firebase/file-upload-firebase.component.html"></a></p>
<p>
Componente de upload, template: <a hre="./advancedapp/src/app/file-upload-firebase/upload/upload.component.html">upload.component.html</a><br>
Arquivo TS do componente de upload: <a href="./advancedapp/src/app/file-upload-firebase/upload/upload.component.ts">upload.component.ts</a>
</p>
<p>
Dropzone template:<a href="./advancedapp/src/app/file-upload-firebase/list-files/list-files.component.html">list-files.component.html</a> <br>
Dropzone TS:<a href="./advancedapp/src/app/file-upload-firebase/list-files/list-files.component.ts">list-files.component.ts</a>
</p>
<p>
Arquivo de Service:<a href="./advancedapp/src/app/file-upload-firebase/files.service.ts">files.service.ts</a> <br>
Arquivo modelo: <a href="./advancedapp/src/app/file-upload-firebase/file.entry.module.ts">file.entry.module.ts</a>
</p>
<h3>NGRX Basico</h3>
<p>
  Aqui temos um exemplo de funcionamento do NGRX, no caso uma lista de arquivos abaixo:<br>
  Actions:<a href="./advancedapp/src/app/ngrx/command.actions.ts">command.actions.ts</a> =>  Aqui temos a regra de negocio para cada acao<br>
  Reducers:<a href="./advancedapp/src/app/ngrx/command.reducer.ts">command.reducer.ts</a> => Aqui temos as acoes de um CRUD <br>
  States:<a href="./advancedapp/src/app/ngrx/command.state.ts">command.state.ts</a> => Aqui temos os Estados, ou seja a colecao de objetos assim como a regra de negocio para as "queries"<br>
  Models:<a href="./advancedapp/src/app/ngrx/command.model.ts">command.model.ts</a> => Arquivo de modelo, que modela o dado, seria o Equivalente a um arquivo de template do MVC. <br>
  Template HTML:<a href="./advancedapp/src/app/ngrx/ngrx.component.html">ngrx.component.html</a> <br>
  Arquivo TS:<a href="./advancedapp/src/app/ngrx/ngrx.component.ts">ngrx.component.ts</a> <br>
  Se faz necessario fazer alteracoes no app.module.ts:<a href="./advancedapp/src/app/app.module.ts">app.module.ts</a> <br>
  Alem de tudo isso, lembre-se que o NRGX nao vem por padrao no Angular, voce precisa instalar, segue o comando para instalacao: <pre>npm install @ngrx/store --save</pre>
</p>
<h2>Comandos basicos do ng</h2>
<h3>Exemplo de sintaxe:</h3>
<p><b>ng [UM_DOS_COMANDOS_ABAIXO] [PARAMETROS]</b></p>
<p>
  <b>add</b> Adiciona suporte para uma biblioteca externa ao seu projeto.<br>
  <b>analytics</b> Configura a coleta de metricas de uso da CLI angular. Veja: https://v8.angular.io/cli/usage-analytics-gathering.<br>
  <b>build (b)</b> Compila um aplicativo Angular em um diretorio de saida chamado dist / no caminho de saida especificado. Deve ser executado de dentro de um diretorio da area de trabalho.<br>
  <b>deploy (d)</b> Invoca o construtor de implementacao para um projeto especificado ou para o projeto padrao na area de trabalho.<br>
  <b>config</b> Recupera ou define valores de configuracao Angular no arquivo angular.json da area de trabalho.<br>
  <b>doc (d)</b> Abre a documentacao oficial do Angular (angular.io) em um navegador e pesquisa uma determinada palavra-chave.<br>
  <b>e2e (e)</b> Cria e veicula um aplicativo Angular e, em seguida, executa testes de ponta a ponta usando o Transferidor.<br>
  <b>generate (g)</b> Gera e / ou modifica arquivos com base em um esquema.  <br>
  <b>lint (l)</b> Executa ferramentas de linting no codigo do aplicativo Angular em uma determinada pasta do projeto.<br>
  <b>new (n)</b> Cria um novo espaco de trabalho e um aplicativo Angular inicial.<br>
  <b>run</b> Executa um destino do Architect com uma configuracao opcional do construtor personalizado definida em seu projeto.<br>
  <b>serve (s)</b> Cria e veicula seu aplicativo, reconstruindo com alteracoes de arquivo.<br>
  <b>test (t)</b> Executa testes de unidade em um projeto.<br>
  <b>update</b> Atualiza seu aplicativo e suas dependencias. Veja: https://update.angular.io/<br>
  <b>version (v)</b> Emite a versao da CLI angular.<br>
  <b>xi18n</b> Extrai mensagens i18n do codigo fonte.<br>
  
</p>
<hr>
<h2>A respeito do NG Generate:</h2>

<p>
    Voce pode usar o comando, na raiz do projeto:<br>
    <b>ng generate component "[NOME_DO_COMPONENTE]"</b><br>
    Assim como voce pode criar um componente dentro de um componente<br>
    <b>ng generate component "[NOME_DO_COMPONENTE]/[NOME_DO_COMPONENTE_INTERNO]"</b><br>
    Dessa forma o componente eh criado da maneira correta dentro de uma pasta, sendo referenciado 
    inclusive dentro do arquivo "<b>./src/app.module.ts</b>", com o seu respectivo html e css,
    tupo isso de maneira automatizada.
</p>
<p>
Com esse comando abaixo, voce cria um modulo, no caso apenas um arquivo TS, para conter componente.<br>
Para criar um modulo: "<b>ng generate module [NOME_DO_MODULO]</b>"<br>
Com o comando abaixo voce cria um servico ja contendo a injecao no escopo de root, ou seja abrangendo o escopo mais externo, altere se precisar o @Injection<br>
Para criar um servico: "<b>ng generate service [NOME_DO_SERVICO]</b>"<br>
</p>
<p>
<b>Abreviacoes:</b> <br>
Componente: "<b>ng g c [NOME]</b>".<br>
Modulo: "<b>ng g m [NOME]</b>".<br>
Servico: "<b>ng g s [NOME]</b>".<br>
Substitua o <b>[NOME]</b> pelo nome do componente.
</p>
<p>
Voce tambem pode usar o seguinte comando caso apareca a mensagem:<br>
<b>More than one module matches. Use skip-import option to skip importing the component into the closest module.</b><br>
Comando: "<b>ng g c componente -m app</b>", sendo:<br>
"<b>componente</b>": O nome do componente a ser criado; <br>
"<b>-m</b>": o parametro a ser usado para designar o diretorio pai.
"<b>app</b>": o nome da pasta a ser adicionado dentro. App eh a pasta principal de componente.<br>
No caso acima usamos a pasta app, mas a pasta app poderia ser substituida por qualquer pasta de componente se fosse o caso.
</p>
<hr>

<h2> Rotas</h2>
<p>Aqui temos mais exemplos de rotas:</p>
<p>
"<b> --routing</b>": Deve ser colocado no final do comando, por exemplo: "<b>ng g m [NOME] --routing</b>", no caso ele 
adiciona um arquivo de rotas dentro do componente, modulo ou servico, etc... 
</p>
<p>caso voce queira criar um arquivo de rota no app.module.ts, voce tem dois caminhos, o primeiro eh dar o comando <pre>ng new [aplicacao] --routing
trocando claro o <b>[aplicacao]</b> pelo nome da sua aplicacao, dessa forma voce informa ao angular para criar um arquivo de rotas na hora da
criacao do projeto.<br>
O Segundo caminho eh usar o comando no projeto existente, no caso quando estiver com o projeto aberto <pre>ng generate module app-routing --flat --module=app</pre>,
dessa forma voce consegue criar em um projeto ja existente. parâmetros: <pre>--flat</pre> para que ele seja criado dentro da pasta <b>src/app</b> e o <pre>--module=app</pre> para registrarmos ele no nosso arquivo <b>AppModule</b>.
</p>
<h2>A respeito do NG add: </h2>

<p>
  Sempre que possivel use o ng add ao inves do npm install, uma vez que 
  esse comando nao so instala, assim como tambem ja configura tudo para que
  funcione bem no projeto. Segue abaixo 2 bibliotecas para frontend:<br>
  Materialize: "<b>ng add @angular/material</b>" => https://material.angular.io/components/categories <br>
  Bootstrap: "<b>ng add ngx-bootstrap</b>" => https://valor-software.com/ngx-bootstrap/#/documentation <br>
  Firebase: "<b>npm install firebase @angular/fire --save</b>""<b>ng add @angular/fire</b>" => https://github.com/angular/angularfire <br>
  NGRX: "<b>npm install @ngrx/store --save</b>" "<b>ng add @ngrx/store@latest</b>"=> https://ngrx.io/ <br>
  O NGRX tem o Entity que facilita e muito a criacao de um NGRX: <b>"npm install @ngrx/entity --save"</b>
</p>
<hr>
<h2>Instalacao</h2>
<h3>Pasta environments</h3>
<p>
  Nessa pasta se tem dois arquivos, um tem configuracoes para rodar em ambiente de desenvolvimento e outro em ambiente de producao.<br>
  Nesse arquivo deve ficar as configuracoes do ambiente de desenvolvimento <a href="./advancedapp/src/environments/environment.ts">environment.ts</a>
  Nesse arquivo deve ficar as configuracoes do ambiente de producao <a href="./advancedapp/src/environments/environment.prod.ts">environment.ts</a>
</p>
<h3>parametro --prod</h3>
<p>
  Quando voce usa o parametro <pre>--prod</pre>, caso voce queira usar as configuracoes do enviroment.prod.ts ao inves do arquivo que esta configurado
  com o ambiente de desenvolvimento. ao rodar o comando <pre>ng build --prod</pre> voce compila para o ambiente de producao, e com <pre>ng serve --prod</pre>
  voce executa o ng serve em ambiente de producao, com base nesses dois arquivos o Angular sabe se ele vai rodar com as configuracoes do ambiente de producao
  ou desenvolvimento, entao coloque as configuracoes corretas nos arquivos correspondente. Repare que nos dois arquivos tem a mesma configuracao do firebase,
  que sera excluido quando isso for pro github, entao la deve estar esse tipo de configuracao por exemplo
</p>
<p>
Caso voce esteja baixando esse arquivo, use o "<b>npm i</b>", com o terminal dentro da pasta do projeto para instalar
todas as dependencias necessarias. Com o terminal aberto na pasta do projeto, como por exemplo o myapp, use o comando
"<b>npm i</b>", para que funcione na sua maquina.
</p>
<hr>
<h2>Erros do tipo: <b>ERROR in Could not resolve module</b></h2>
<p>caso voce tenha um erro do tipo: '<b>ERROR in Could not resolve module</b>'.
<br>
Nesse caso pode ser que exista algum caracter bizarro no path ate o projeto,
evite usar '#', @ e qualquer outro caracter bizarro. Primeira dica.<br> segunda dica:<br>
    Desinstalar a dependencia rxjs do projeto."<b>npm uninstall rxjs</b>"<br>
    Apagar a pasta node_modules. "<b>rm -rf node_modules</b>" <br>
    Apagar o arquivo package-json.lock e yarn.lock (se existir). "<b>rm package-json.lock yarn.lock</b>"<br>
    Instalar todas as dependencias novamente. "<b>npm i</b>"<br>
    Instalar a versao mais nova do rxjs. "<b>npm i rxjs</b>"<br>
    Tentar subir novamente. "<b>ng serve --open</b>"<br>
</p>
<h2>Erro do Tipo: Type T[K] does not satisfy the constraint installing angular fire</h2>
<p>
Vai ate o arquivo tsconfig.json, ele deve ficar semelhante a isso:
<pre>
{
  "compileOnSave": false,
  "compilerOptions": {
    "skipLibCheck":true,
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}

</pre>
Repare que adicionamos o atributo <pre>"skipLibCheck":true,</pre> dentro de <pre>compilerOptions</pre>, voce precisa fazer isso para evitar esse problema, ou seja, reconfigurar o seu Typescript.
</p>
