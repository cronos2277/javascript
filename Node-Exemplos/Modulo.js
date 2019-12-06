function funcao(){
    return function(requisicao, resposta,proxima_funcao){
        console.log('Carregando pagina');
    //Esse modulo funciona no padrao chain of responsability ou popularmente
    //conhecido como middleware, o terceiro parametro eh uma callback que 
    //permitira a que outros metodos use, sem essa funcao o express processara
    //essa callback e ignorara qualquer outra chamada do metodo use, uma
    //vez que esse metodo nao eh restrito a url e roda de maneira em qualquer
    //url. O terceiro parametro sempre sinalizara ao metodo que ele devera
    //processar a outra chamada dele durante o codigo, formando assim uma corrente,
    //ou seja essa callback executara, depois outra callback de outra chamada
    //do metodo use(), get() ou post() formando assim uma corrente, ate que
    //nao se tenha mais a solicitacao de uma proxima chamada. Abaixo eu explicarei
    //o Chain of responsability ou middleway (ambos se refere ao mesmo project pattern)     
        proxima_funcao();
    }
} 
/*
    O node js trabalha com o sistemas de modulos, ou seja cada arquivo
    no node js eh um modulo, porem para que um determinado arquivo possa
    ser lido por outros arquivos, voce precisa exportar o modulo.
    Sintaxe module.exports = <o dado a ser exportado>
    No exemplo abaixo foi exportado uma funcao, mas se for o caso voce pode
    exportar outros tipos de dados como String, inteiros, ou ate mesmo uma
    funcao como eu fiz abaixo.
*/
module.exports = funcao;