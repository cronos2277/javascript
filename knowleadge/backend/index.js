/*
    Esse comando abaixo substitui o classico.
    const express = require("express");
    const app = express();
    O express retorna uma funcao quando instanciado, 
    logo dessa forma abaixo voce ja tem acesso a essa
    funcao.
*/
const app = require("express")();
/*
    O consign muda a forma com que voce trabalha com a importacao
    dos modulos. O Consign ele carrega os modulos ao iniciar, e 
    uma vez carregado, voce pode usar eles sem precisar ficar 
    importando nos arquivos JS. O consign trabalha com o padrao
    Middleware, exemplo de uso:
    const consign = require('consign');
    consign().then('diretorio do modulo').into(A variavel a ser usada nas middleware);
    Nesse caso o consign usa a variavel app. Veja os arquivos de modulos tambem.
    Todos esses modulos que o consign carrega aqui, serao carregados globalmente
    podendo ser acessado pela estrutura do consign, sem a necessidade de importar,
    tudo isso acontece ao inicializar com o projeto com o npm start, no terminal havera
    algumas informacoes do consign quando tudo for inicializado.
*/
const consign = require('consign')
consign().then('./config/middleware.js').then('./api').then('./config/routes.js').into(app);
app.listen(3000,()=>{
    console.log('Knowleadge Backend active!');
});
