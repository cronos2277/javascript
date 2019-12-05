/*
    Express, inicialmente eh necessario dar um require e depois
    passar em alguma variavel ou constante o resultado que ele
    retorna como funcao.
*/
const express = require('express');
const app = express();

const funcaoCallbackSucesso = function funcaoCallbackSucesso(){
    console.log("Sucesso na conexao");
}

/* 
    Ouvindo na porta 3000, o metodo listen faz com que ouca nessa porta.
    alem disso a mesma aceita uma funcao de callback caso a porta seja 
    aberta.
*/
app.listen(3000,funcaoCallbackSucesso);
