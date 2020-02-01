<h1> Instalacao</h1>
<h2>Voce deve ter o NPM instalado</h2>
<p>Entre com o teminal no diretorio do arquivo, e:</p>
<p> 1) Execute o comando: '<b>npm i</b>'</p>
<p> 2) Para mimificar arquivos: '<b>npm run build</b>'</p>
<p> 3) Para executar um servidor na porta 9000: '<b>npm start</b>'</p>
<h2>Observacoes:</h2>
<p>
Observacao, o gulp eh inteligente o bastante para ignorar modulos que nao sao utilizados,
entao se voce referencia algum modulo e nao usa, o webpack ignora, alem disso voce pode adicionar
mais configuracoes editando o arquivo '<b>webpack.config.js</b>'.
</p>
<ol>
    <li>Coloque os seus html na pasta public.</li>
    <li>A pasta <b>dist</b> eh a pasta de saida, sendo o que contem o min no meio do nome o arquivo mimificado</li>
</ol>
