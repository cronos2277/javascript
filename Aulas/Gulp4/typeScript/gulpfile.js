const {series} = require("gulp");
const gulp = require("gulp");
const uglify = require("gulp-uglify");

//Esse modulo abaixo permite que voce execute tarefa como gulp.
const ts = require("gulp-typescript");
//Aqui estamos informando o arquivo de configuracao do TypeScript
const tsProject = ts.createProject('tsconfig.json');

function transformacaoTS(){
    /*
        A inclusao de um arquivo Typescript eh diferente, uma vez
        que o TS precisa ser transpilado para javascript primeiro,
        nesse caso podemos usar o objeto criado com base no metodo
        createProject, para fazer a importacao. 
    */
    return tsProject.src()
    .pipe(
        /*
            Aqui invocamos o objeto criado com base no createProject
            para fazer a transpilacao para javascript. Quando invocado
            ele se torna uma funcao que transpila os typescripts com
            base no arquivo de configuracao que ele mesmo importou.
        */
        tsProject()
    ).pipe(
        uglify()
    ).pipe(        
        gulp.dest("build")
    );
}

module.exports.default = series(transformacaoTS);