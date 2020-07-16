//Aqui desustruturamos todos os metodos do gulp.
const {series,parallel,dest,src,task} = require("gulp");
const uglifycss = require("gulp-uglifycss");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass');
const html = require('gulp-htmlmin');
const webserver = require('gulp-webserver');
const watch = require('gulp-watch');

const app = {
    html: function(){        
        return src('src/**/**.html').pipe(
            html({
                collapseWhitespace:true //Precisa ser true para mimificar o html.
            })
        ).pipe(
            dest('build')
        );
    },

    css: function(){        
        return src('src/assets/sass/index.scss')
        .pipe(
            sass().on('error',sass.logError)
        ).pipe(
            uglifycss({
                "uglyComments":true
            })
        ).pipe(concat('app.min.css'))
        .pipe(dest('build/assets/css'));
    },

    javascript: function(){        
        return src('src/assets/js/**/*.js')
        .pipe(babel({presets:['ENV']}))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(dest('build/assets/js'));
    },

    image: function(){    
        return src('src/assets/imgs/**/*.*')
        .pipe(dest('build/assets/imgs'))
    }

};

const deps = {    
    styles:function(){
        return src(
            'node_modules/font-awesome/css/font-awesome.css'
        ).pipe(
            uglifycss({
                "uglyComments":false
            })
        ).pipe(
            concat('deps.min.css')
        ).pipe(
            dest('build/assets/css')
        );
    },

    fonts:function(){
        return src(
            'node_modules/font-awesome/fonts/*.*'
        ).pipe(
            dest('build/assets/fonts')
        )
    }
};

const server = {
    watching:function(cb){
        let arquivosMonitorados = [
            /*
                Aqui temos uma lista de arquivos a serem monitorados
            */
            'src/index.html',
            'src/paginas/cursos.html',
            'src/paginas/inicio.html',
            'src/paginas/sobre.html',
            'src/paginas/suporte.html',
        ];
        /*
            Na funcao watch, ou voce passa uma string ou um array de String
            contendo todos os arquivos a serem monitorados, depois uma callback
            que sera executado ao perceber alguma alteracao. Detalha a tarefa
            para que possa ser monitorada, ela deve ser definida em task()
            ou gulp.task() dependendo da forma como voce importa.
        */
        watch(arquivosMonitorados,() =>{
            series('appHtml')(); //Veja essa task eh envocada.
        });
        return cb();
    },

    run:function(){
        return src('build')
        .pipe(webserver({
            /*
                O webserver permite com que a aplicacao abra em uma determinada
                porta. 
                port => a porta ao qual deve abrir o projeto.
                open => se deve abrir o navegador padrao ao carregar.
                livereload => Se deve carregar automaticamente ao perceber alteracoes.
            */
            port:8080,
            open:true,
            livereload:true
        }));
    }
};

/*
    Aqui a task eh criada, uma vez criada,
    ela estara apta a ser chamada no watch
*/
task('appHtml', app.html);

module.exports.default = series(
    parallel(
        series(            
            app.css,            
            app.image),
        series(
            app.html,
            app.javascript
        ),
        series(
            deps.styles,
            deps.fonts
        )
    ),
    server.run,
    server.watching
);