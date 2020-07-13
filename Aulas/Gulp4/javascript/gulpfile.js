const gulp = require('gulp');
const {series} = require("gulp");
const concat = require("gulp-concat"); //Pipe do concat
const uglify = require('gulp-uglify'); //Pipe do Uglify
const babel  = require('gulp-babel'); //Pipe do Babel

function padrao(callback){    
    /*
        "**" => manda ele analisar em qualquer subdiretorio.
        *.js => manda ele pegar qualquer arquivo .js
    */
    gulp.src('src/**/*.js').pipe(
        babel({ //Aqui fazemos o uso do babel, dentro de um pipe
            comments:false, //Quando false remove os comentarios.
            /* 
                Esse preset transforma o javascript atual na versao 
                mais antiga e compativel com varios navegadores antigos.
            */
            presets:["env"],
        })
    ).pipe(
        /*
            Esse pipe mimifica o codigo. 
            Voce pode passar um objetos com parametros se desejar
        */
        uglify()
    ).on('error',
        /*
            No metodo .on do Gulp voce pode tratar erros, no caso
            aqui nos estamos tratando eventos de erros.
        */
        erro => console.error(erro) //Se tiver erro ele vai imprimir no console.
    ).pipe(
        /* 
            Concat ele concatena todos os arquivos dentro de um so.
            Essa funcao recebe como parametro uma String contendo
            o nome com a devida extensao do arquivo de saida.
        */    
        concat("codigo.min.js") 
    ).pipe(
        /*
            Apos todo o processamento, aqui nesse pipe estamos
            usando a funcao que vai pegar esse arquivo compilado
            para uma versao mais antiga do javascript, mimificado
            e com todos eles concatenado em um arquivo so e mover 
            para essa pasta.            
        */
        gulp.dest('build')
    );
    return callback();
}

module.exports.default = series(padrao);