<h1>Angular 2</h1>
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
<p>
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
<h2>Erros do tipo: <b>ERROR in Could not resolve module</b></h2>
caso você tenha um erro do tipo: '<b>ERROR in Could not resolve module</b>'.
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