<h1>Angular 2</h1>
<h2>Revisao</h2>
<p>A pasta <a href="./myapp/">myapp</a>, contem os exemplos mais basicos envolvendo Angular 2</p>
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
pelo npm, nao esqueca de incluir isso nesse arquivo varias vezes citado aqui: <a href="./myapp/src/app/app.module.ts">app.module.ts</a>
</p>
<hr>
<h2>Comandos basicos do ng</h2>
<h3>Exemplo de sintaxe:</h3>
<p><b>ng [UM_DOS_COMANDOS_ABAIXO] [PARAMETROS]</b></p>
<p>
  <b>add</b> Adiciona suporte para uma biblioteca externa ao seu projeto.<br>
  <b>analytics</b> Configura a coleta de métricas de uso da CLI angular. Veja: https://v8.angular.io/cli/usage-analytics-gathering.<br>
  <b>build (b)</b> Compila um aplicativo Angular em um diretório de saída chamado dist / no caminho de saída especificado. Deve ser executado de dentro de um diretório da área de trabalho.<br>
  <b>deploy (d)</b> Invoca o construtor de implementação para um projeto especificado ou para o projeto padrão na área de trabalho.<br>
  <b>config</b> Recupera ou define valores de configuração Angular no arquivo angular.json da área de trabalho.<br>
  <b>doc (d)</b> Abre a documentação oficial do Angular (angular.io) em um navegador e pesquisa uma determinada palavra-chave.<br>
  <b>e2e (e)</b> Cria e veicula um aplicativo Angular e, em seguida, executa testes de ponta a ponta usando o Transferidor.<br>
  <b>generate (g)</b> Gera e / ou modifica arquivos com base em um esquema.  <br>
  <b>lint (l)</b> Executa ferramentas de linting no código do aplicativo Angular em uma determinada pasta do projeto.<br>
  <b>new (n)</b> Cria um novo espaço de trabalho e um aplicativo Angular inicial.<br>
  <b>run</b> Executa um destino do Architect com uma configuração opcional do construtor personalizado definida em seu projeto.<br>
  <b>serve (s)</b> Cria e veicula seu aplicativo, reconstruindo com alterações de arquivo.<br>
  <b>test (t)</b> Executa testes de unidade em um projeto.<br>
  <b>update</b> Atualiza seu aplicativo e suas dependências. Veja: https://update.angular.io/<br>
  <b>version (v)</b> Emite a versão da CLI angular.<br>
  <b>xi18n</b> Extrai mensagens i18n do código fonte.<br>
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

<hr>

<h2>A respeito do NG add: </h2>

<p>
  Sempre que possivel use o ng add ao inves do npm install, uma vez que 
  esse comando nao so instala, assim como tambem ja configura tudo para que
  funcione bem no projeto. Segue abaixo 2 bibliotecas para frontend:<br>
  Materialize: "<b>ng add @angular/material</b>" => https://material.angular.io/components/categories <br>
  Bootstrap: "<b>ng add ngx-bootstrap</b>" => https://valor-software.com/ngx-bootstrap/#/documentation <br>
</p>
<hr>
<h2>Instalacao</h2>
<p>
Caso voce esteja baixando esse arquivo, use o "<b>npm i</b>", com o terminal dentro da pasta do projeto para instalar
todas as dependencias necessarias. Com o terminal aberto na pasta do projeto, como por exemplo o myapp, use o comando
"<b>npm i</b>", para que funcione na sua maquina.
</p>
<hr>
<h2>Erros do tipo: <b>ERROR in Could not resolve module</b></h2>
<p>caso você tenha um erro do tipo: '<b>ERROR in Could not resolve module</b>'.
<br>
Nesse caso pode ser que exista algum caracter bizarro no path ate o projeto,
evite usar '#', @ e qualquer outro caracter bizarro. Primeira dica.<br> segunda dica:<br>
    Desinstalar a dependência rxjs do projeto."<b>npm uninstall rxjs</b>"<br>
    Apagar a pasta node_modules. "<b>rm -rf node_modules</b>" <br>
    Apagar o arquivo package-json.lock e yarn.lock (se existir). "<b>rm package-json.lock yarn.lock</b>"<br>
    Instalar todas as dependências novamente. "<b>npm i</b>"<br>
    Instalar a versão mais nova do rxjs. "<b>npm i rxjs</b>"<br>
    Tentar subir novamente. "<b>ng serve --open</b>"<br>
</p>