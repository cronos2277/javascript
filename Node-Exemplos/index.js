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

function callbackRequisicaoResposta(requisicao,resposta){
    resposta.send("Estou <b>bem</b>");
}
function callbackRequisicaoCustomizada(requisicao,resposta){
    resposta.send("<b>MUDOU</b>");
}
function callbackReqResGet(requisicao,resposta){
    resposta.send("<b>Esta No GET</b>")
}
function callbackReqResPost(requisicao,resposta){
    resposta.send("<b>Esta No Post</b>")
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



