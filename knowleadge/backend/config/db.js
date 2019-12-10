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
2 ->"knex migrate:make create_table_categories"
3 ->"knex migrate:make create_table_articles"
Que foram os comandos acimas o necessario para criar um migrate.
*/