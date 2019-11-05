const gulp = require('gulp');
//Essa biblioteca transforma funcionanlidades novas do JS para ser compativel com as antigas.
const babel = require('gulp-babel');
//Tira comentários e espaços em branco.
const uglify = require('gulp-uglify');
//aqui trata os arquivos sass transformando os em css.
const sass = require('gulp-sass');
//aqui para mimificar css.
const uglifycss = require('gulp-uglifycss');
//concatena varios arquivos em um.
const concat = require('gulp-concat');
//mimifica html.
const htmlmin = require('gulp-htmlmin');

/*
 *gulp.src() é uma função que importa arquivos, como abaixo é usado o caracter
 * coringa, logo se é pego todos os que possuem tal extensão e estão em 
 * determinado diretório.
 * .pipe(), são forma de encadear funções, ou seja ela pega o resultado
 * das funções anteriores e aplicam-se em cima delas.
 * */

global.mimificarHtml = function mimificarHtml(){
	return gulp.src('src/**/**/*.html')
	.pipe(htmlmin({collapsewhitespace:true}))
	.pipe(gulp.dest('build'));
	/*Pega-se todos os html, tiram o espaço em branco e jogam na pasta build*/
}
 
global.mimificarSass = function mimificarSass(){
	return gulp.src('src/assets/sass/index.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(uglifycss({"uglifyComments":true}))
	.pipe(concat('app.min.css'))
	.pipe(gulp.dest('build/assets/css'));
	/*Pega-se o arquivo index.scss, analisa se tem erros, estando tudo certo,
	 tira os comentários, mimifica e joga tudo dentro de um arquivo chamado app.min.css
	 depois move para a pasta build.
	 * */
}

global.mimificarJavascript = function mimificarJavascript(){
	return gulp.src('src/assets/js/**/*.js')
	.pipe(babel({presets:['env']}))
	.pipe(uglify()).pipe(concat('app.min.js'))
	.pipe(gulp.dest('build/assets/js'));
	/*
	 Pega todos os javascripts, usando o babel converte-se em um código 
	 compatível com os padrões antigo, o env ele escolhe a melhor forma 
	 de conversão mas você pode definir isso manualmente, depois ele mimifica,
	 o uglify mimifica o arquivo, depois concatenas tudo dentro de app.min.js
	 * e por fim move para a pasta build/assets/js
	 * */
}

global.lidandoImagens = function lidandoImagens(){
	return gulp.src('src/assets/imgs/**/*.*')
	.pipe(gulp.dest('build/assets/imgs'));	
	/* Simplesmente move as imagens para o diretório build/assets/imgs */
} 


/*
 * Tasks: aqui é definido o nome das tasks e o função, lembrando que as
 * funções são todas globais.
 * */
gulp.task('app.html',mimificarHtml);
gulp.task('app.css',mimificarSass);
gulp.task('app.js',mimificarJavascript);
gulp.task('app.imgs',lidandoImagens);
/*Aqui as tasks são executadas de maneira paralela*/
gulp.task('app',gulp.parallel('app.html','app.css','app.js','app.imgs'));
