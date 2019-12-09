/*
    Esse comando abaixo substitui o classico.
    const express = require("express");
    const app = express();
    O express retorna uma funcao quando instanciado, 
    logo dessa forma abaixo voce ja tem acesso a essa
    funcao.
*/
const app = require("express")();
const consign = require('consign')
consign().then('./config/middleware.js').into(app);
app.listen(3000,()=>{
    console.log('Knowleadge Backend active!');
});
