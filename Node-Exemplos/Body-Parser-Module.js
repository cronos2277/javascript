//Esse modulo eh necessario para habilitar o body parser
const body = require("body-parser");

//aqui nessa funcao sera habilitado o uso do body parser
const init = function init(app){
//aqui voce habilita com que o body parser para pegar dados de formulario.
    app.use(body.urlencoded({extended:true})); 
//Aqui habilita o texto.       
    app.use(body.text());
//E aqui habilita para que os dados seja exibido como json    
    app.use(body.json()); 
}
const exemploBody = function exemploBody(req,resp,next){     
    /*
        No caso o body parser ele coloca o conteudo de toda
        a requisicao, seja vindo por formulario, ou seja vindo
        por outra forma dentro do atributo body dentro da requisao,
        devidamente formatado, porem para isso eh necessario
        habilitar o body-parse na instancia do express e 
        nesse caso o mesmo eh feito pelo metodo acima aceitando
        uma instancia do body parser como paramtero,
        para acessar o conteudo voce pega-o dentro da requisicao,
        dentro das funcoes middlewares que voce cria para o
        express. Aqui no caso eh um atributo do "req" 
    */
    resp.send(req.body);
    next();
};
module.exports = {bodyExemplos: exemploBody,init};
/*
    module.exports torna publico qualquer dado passado ali,
    por exemplo ali eh exportado um objeto que contem os
    metodos. Analizando o caso acima temos:
    A funcao aqui chamada de exemploBody sera reconhecida
    como bodyExemplos, sempre no padrao 
    {nomeVariavelPublico:nomeVariavelAqui}, ja no caso do
    init o mesmo eh reconhecido aqui e fora daqui como "init".
*/