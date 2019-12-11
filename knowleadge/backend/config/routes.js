/*
    Esse app esta referenciado pelo consign, logo quando
    for chamado a funcao la no index essa variaveis tera
    os artibutos carregado pelo consign, repare que o
    app -> a variavel estipulada dentro o metodo into
    do consign, e api faz referencia a pasta api,
    user faz faz referencia ao user.js e por fim o
    save faz referencia ao metodo que foi exportado
    pelo arquivo user.js O consign muda a forma
    com que voce trabalha com os modulos tratando
    arquivos e diretorios como atributos e evitando
    a necessidade de importar modulos.
*/
module.exports = app =>{
    app.route('/users').post(app.api.user.save)
    .get(app.api.user.get);
    app.route('/users/:id').put(app.api.user.save);
}