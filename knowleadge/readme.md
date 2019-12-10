<h1> Projeto Instrucoes.</h1>
<h2>Mongo DB</h2>
O mongo precisa estar devidamente instalando precisa estar em execucao
<h2>Knex.js</h2>
Se faz necessario instalar essa biblioteca de forma global<br>
comando: "<b>sudo npm i -g knex</b>" <br>
o Knex faz a comunicacao entre as tabelas dos bancos de dados <br>
<span style="color:red">
<b>Obs Apenas para a criacao de um novo projeto</b>
<i>Quando for usar essa tecnologia em algum projeto, de no terminal o comando<br>
"<b>knex init</b>", uma vez feito isso voce edita o knexfile.js ate conter os parametros
do(s) seu(s)banco(s) de dados, lembrando que essa api permite a comunicacao entre 
diferentes banco de dados e o arquivo knexfile.js ja vem estruturado, bastando apenas modificar.<br>
agora vem o comando: <br>
"<b>knex migrate:make create_table_users</b>"<br>
depois o comando:<br>
"<b>knex migrate:make create_table_categories</b>"<br>
"<b>knex migrate:make create_table_articles</b>"
</i>
</span>

<h2>POSTGRES</h2>
1 - iniciar usando o comando "<b>sudo su - postgres</b>".<br> 
2 - depois "<b>psql</b>". <br>
3 - uma vez feito isso criaremos o banco de dados "<b>CREATE DATABASE knowleadge</b>".<br>



