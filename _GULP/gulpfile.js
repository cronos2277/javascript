const {series, parallel, src, dest } = require('gulp');
const del = require('del') 
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

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
    .plugin(tsify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(dest('dest'));    
}

//Cria o Javascript pronto para producao.
const createJavaScriptProduction = function createJavaScriptProduction(){
    return src('dest/app.js').pipe(rename('app.min.js')).pipe(uglify()).pipe(dest('dest'));
}

exports.default = series(
    cleanDirectory,
    parallel(createJS,copyHTML),
    createJavaScriptProduction
)
