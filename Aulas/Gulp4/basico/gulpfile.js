const gulp = require("gulp"); 
const series  = gulp.series; 
const parallel = gulp.parallel;

function tarefa1(quandoConcluido){
/*
    Aqui a magica contece, ou seja essa funcao assim como qualquer 
    outra sera passado para o GULP, no entanto a sua funcao deve
    receber um parametro e esse parametro sera uma callback, que
    o gulp ira executar quando essa tarefa aqui, for executada.
    Aqui abaixo temos um exemplo de como a coisa deve ser estruturada
    no GULP 4, aqui a tarefa eh simplismente imprimir algo no console.
*/
    console.log("Exemplo basico de tarefa");
    quandoConcluido(); //Callback vai ser executada quando a tarefa for concluida.
}

function copiandoArquivo(cb){
    gulp.src([ //O metodo .src ele importa arquivos a serem processados.
        'pastaA/arquivo1.txt',
        'pastaA/arquivo2.txt'        
    ]).pipe(
        /*
            O Pipe ele faz processamento de dados, ou seja a ideia eh que
            ele pegue os arquivos importados do metodo src e faca o procesamento
            aqui. Cada pipe desses funcoes que voce importa do node js ou cria.
            Aqui estamos operando sobre o padrao PIPE and Filters:
            https://pt.wikipedia.org/wiki/Pipes_e_filtros
            Abaixo estamos usando um metodo dest, que deve ser usado dentro de um pipe.
            Esse metodo ele mode os arquivos do src para o destino informado como
            parametro do metodo, essa String passada eh o nome e path da pasta de destino
        */
        gulp.dest('pastaB') //Esse pipe ele cria o arquivo processado na pastaB
    );
    return cb();
}

module.exports.default = series(
    parallel(tarefa1,tarefa1), //Voce pode executar o parallel dentro da funcao series e vice-versa
    copiandoArquivo //Aqui esta a funcao que vai copiar arquivos.
    );