const {series, parallel, src, dest } = require('gulp');
const del = require('del') //para deletar pastas
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');

//Essa funcao limpa o diretorio
const cleanDirectory = function cleanDirectory(){   
    return del(['dist']);
}

 //Copia o html ao destino.
const copyHTML = function copyHTML(){
    return src('public/**/*').pipe(dest('dest'));
}

//cria o arquivo app.js
const createJS = function createJS(){
    return browserify({
        basedir:'.',
        entries: ['src/main.ts']
    })
    .plugin(tsfy)
    .bundle()
    .pipe(source('app.js'))
    .pipe(dest('dest'));    
}

exports.default = series(
    cleanDirectory,
    parallel(createJS,copyHTML)
)
