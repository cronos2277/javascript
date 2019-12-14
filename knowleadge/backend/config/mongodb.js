/*
    o metodo mongoose faz a conexao entre
    o banco de dados Mongo DB e a aplicacao.
*/
const mongoose = require('mongoose');
/*
    Esse metodo connect faz a conexao com o mongo DB,
    o primeiro parametro eh uma string no seguinte
    padrao:
    'mongodb://<IP>/<banco_de_dados>', entao temos
    o segundo parametro, para que o Mongo DB
    faca a conexao usando a sintaxe acima.
    {useNewUrlParser:true}, coloque isso como
    o segundo parametro do connect e evite maiores
    dores de cabeca.
*/
mongoose.connect('mongodb://localhost/knowledge_stats',{useNewUrlParser:true})
.catch(e => {
    const msg = "Erro! Nao foi possivel conectar ao Mongo DB";
    /*
        Essa String estranha eh um comando shell script 
        para alterar a cor de fundo no terminal.
    */
    console.log('\x1b[41m%s\x1b[37m',msg,'\x1b[0m');
})
