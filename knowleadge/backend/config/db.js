const config = require('../knexfile.js');
const knex = require('knex')(config)
module.exports = knex;
/*
Explicando o KNEX.
Se faz necessario instalar essa biblioteca de forma global
comando: "sudo npm i -g knex" 
o Knex faz a comunicacao entre as tabelas dos bancos de dados 
Obs Apenas para a criacao de um novo projeto
Quando for usar essa tecnologia em algum projeto, de no terminal 
o comando "knex init", uma vez feito isso voce edita o knexfile.js 
ate conter os parametros do(s) seu(s)banco(s) de dados, 
lembrando que essa api permite a comunicacao entre diferentes banco de dados 
e o arquivo knexfile.js ja vem estruturado, bastando apenas modificar.
agora vem o comando: 
1 -> "knex migrate:make create_table_users"
2 -> "knex migrate:make create_table_categories"
3 -> "knex migrate:make create_table_articles"
Que foram os comandos acimas o necessario para criar as migrations
Com as migrations voce controla e faz um certo versionamento do seu
banco de dados.Voce pode ter mais detalhes de como funciona uma migration
acessando a pasta migrations na raiz e lendo os comentarios dos arquivos,
porem a ideia geral, eh que as migrations vai executando em ordem cronologica,
com base na data que foi feita, comandos ddl, permitindo que o seu banco de dados
exclua ou inclua estruturas DDL a cada versionamento, sendo o metodo up o que vai
incluir e o down o que vai excluir estruturas DDL do seu banco de dados. Essa eh
uma forma de fazer um certo "versionamento" do banco de dados relacional que sera
usado no projeto, permitindo que o mesmo tenha a estrutura necessaria caso seja 
adicionado ou removido recursos.
Apos configurar as migrations, use o comando:
knex migrate:latest
que vai persistir todas as configuracoes da sua migrations no DB
*/