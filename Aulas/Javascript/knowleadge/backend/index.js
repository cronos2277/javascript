const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const mongoose = require('mongoose');
/*
    Esse comando abaixo substitui o classico.
    const express = require("express");
    const app = express();
    O express retorna uma funcao quando instanciado, 
    logo dessa forma abaixo voce ja tem acesso a essa
    funcao.
*/
require('./config/mongodb');
/*
    O consign muda a forma com que voce trabalha com a importacao
    dos modulos. O Consign ele carrega os modulos ao iniciar, e 
    uma vez carregado, voce pode usar eles sem precisar ficar 
    importando nos arquivos JS. O consign trabalha com o padrao
    Middleware, exemplo de uso:
    const consign = require('consign');
    consign().then('diretorio do modulo/modulo.js').into(A variavel a ser usada nas middleware);
    Nesse caso o consign usa a variavel app. Veja os arquivos de modulos tambem.
    Todos esses modulos que o consign carrega aqui, serao carregados globalmente
    podendo ser acessado pela estrutura do consign, sem a necessidade de importar,
    tudo isso acontece ao inicializar com o projeto com o npm start, no terminal havera
    algumas informacoes do consign quando tudo for inicializado.
*/
app.db = db;
app.mongoose = mongoose;
/*
    Aqui eh implementado a conexao do banco de dados com o objeto
    global criado pelo consign com o nome de app, logo gracas
    a esta linha abaixo a conexao com o banco de dados passa a 
    ser um atributo desse objeto global criado pelo consign.
*/
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app);
//A Aplicação esta rodando na porta 4000
app.listen(4000, () => {
    console.log('Backend executando...')
});