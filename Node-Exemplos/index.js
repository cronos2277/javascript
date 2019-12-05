/*
    Express, inicialmente eh necessario dar um require e depois
    passar em alguma variavel ou constante o resultado que ele
    retorna como funcao.
*/
const express = require('express'); //importando.
const app = express(); //Instanciando
/*
    Mais informacoes:
    https://expressjs.com/pt-br/4x/api.html#app
*/

const funcaoCallbackSucesso = function funcaoCallbackSucesso(){
    console.log("Sucesso na conexao");
}

function callbackRequisicaoResposta(requisicao,resposta){
/*
    A funcao de callback do use aceita 4 parametros
*/
//Esse metodo pode retornar texto plano ou html.
resposta.send("Estou <b>bem</b>");    
//Nada sera processado depois dessa instrucao acima, ou seja ponha o seu codigo antes
}
function callbackRequisicaoCustomizada(requisicao,resposta){
//Esse pode retornar em formato json transformando o objeto abaixo:
    resposta.json({
        name:"Exemplo de Nome",
        valor:384.67,
        verdadeiro:true
    });
//Nada sera processado depois dessa instrucao acima, ou seja ponha o seu codigo antes    
}
function callbackReqResGet(requisicao,resposta){
    resposta.send("<b>Esta No GET</b>");
//Nada sera processado depois dessa instrucao acima, ou seja ponha o seu codigo antes    
}
function callbackReqResPost(requisicao,resposta){
    resposta.send("<b>Esta No Post</b>");
//Nada sera processado depois dessa instrucao acima, ou seja ponha o seu codigo antes    
}
/*
    QUalquer requisicao a pagina caira dentro do metodo use.
    quando o usuario acessar a pagina o metodo use sera 
    acionado e com isso todo o algoritimo da funcao de callback dela.
    app.use('url',suaCallBack); caso omitido a url, executara independente
    da url do cliente no caso o use eh invocado no get e no post   
*/
//Outro exemplo do metodo use, nesse caso se voce colocar /mude sera
// chamado essa callback, lembrando que todas as excecoes deveram ser
//chamadas antes do caso generico, no caso do metodo use.
app.use('/mude',callbackRequisicaoCustomizada);
app.get('/method',callbackReqResGet);
app.post('/method',callbackReqResPost);



//Em qualquer outro caso que nao se quadre acima, chama essa callback
app.use(callbackRequisicaoResposta);

/* 
    Ouvindo na porta 3000, o metodo listen faz com que ouca nessa porta.
    alem disso a mesma aceita uma funcao de callback caso a porta seja 
    aberta.
*/
app.listen(3000,funcaoCallbackSucesso);



