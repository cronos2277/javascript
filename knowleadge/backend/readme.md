<h1> Projeto Instrucoes.</h1>
<h2>Mongo DB</h2>
O mongo precisa estar devidamente instalando precisa estar em execucao, caso tenha
problemas com isso no linux, tente o seguinte comando "<b>sudo service mongod start</b>"
<h2>Seguranca</h2>
Nao esqueca de alterar a chave do arquivo "<b>.env</b>", na aplicacao, essa chave
garante seguranca na aplicacao, eh obrigatorio mudar o valor caso use essa solucao,
por questoes de seguranca, mude a String de altenticacao e cuidado com esse arquivo
para nao cair em maos erradas. Caso a chave usada para criptografar vaze a terceiros,
qualquer um pode acessar a sua aplicao como se estivesse logado, quebrando assim
a seguranca <br>
<h2>POSTGRES</h2>
1 - iniciar usando o comando "<b>sudo su - postgres</b>".<br> 
2 - depois "<b>psql</b>". <br>
3 - uma vez feito isso criaremos o banco de dados "<b>CREATE DATABASE knowleadge</b>".<br>
4 - caso tenha problemas com a conexao com o Postgres no linux, tente o seguinte:<br>
Inicialmente entre com o seguinte comando <b>su postgres</b> a senha deve ser a mesma informada
na hora da instalacao.
<br>
Depois: <b>psql -c "ALTER USER postgres WITH PASSWORD '[a sua senha]'" -d template1</b> 
a senha usada nesse projeto eh a 123456, que pode ser alterada no arquivo knexfile.js
o comando em questao eh toda a parte em negrito, e a <b>[a sua senha]</b> deve ser substituida
pela mesma senha do knexfile.js
<hr>
<h2>Knex</h2>
para instalar globalmente, o que eh necessario para executar esses comandos:
"<b>npm install knex -g</b>"
<h3>Migrations</h3>
Uma vez que o knex seja instalado globalmente, voce pode criar migrations pelo terminal,
usando o seguinte comando "<b>knex migrate:make [nomeDaTabela]</b>", sendo que a parte
correspondente a <b>[nomeDaTabela]</b> deve ser substituido pelo nome da tabela. <br>
<h3>Lidando com as migrations</h3>
Esse comando executa os metodos up das migrations, aplicando updates na estrutura do seu banco de dados
comando: "<b>knex migrate:latest</b>"<br>
Esse comando executa os metodos down das migrations, aplicando downgrade na estrutura do seu DB,
bom para reverter problemas com atualizacoes por exemplo.
comando "<b>knex migrate:rollback</b>"
<h3>Criando um Knex File</h3>
use o comando "<b>knex init</b>" para criar um novo arquivo knex file padrao.




