const gulp = require('gulp');
const watch = require('gulp-watch'); //biblioteca gulp-watch
const webserver = require('gulp-webserver'); //biblioteca webserver.

gulp.task('monitorar',function(){
	watch('src/**/*.html', () => mimificarHtml());
	watch('src/**/*.scss', () => mimificarSass());
	watch('src/**/*.js', () => mimificarJavascript());	
	watch('src/assets/img/**/*.*', () => lidandoImagens());		
/*
	A função watch ela monitora os arquivos, e se acontecer alguma 
	alteração ele executa uma função, como as funções são globais,
	elas foram criadas em outro lugar.
	uso watch('diretório', função).	  
 */
});


gulp.task('servidor',gulp.parallel('monitorar',function(erro){
	return gulp.src('build').pipe(webserver({
			livereload:true,
			port:8083,
			open:true
	}));
	erro('Deu erro');
	/*
		a função webserver abre uma porta, uso: webserver({OBJETO});
		Nesse objeto você deve passar alguns parametros como, livereload:true
		que permite que arquivos sejam reabertos, o port:8083, que é a porta
		a ser aberta, e por fim temos o open que abre o navegador assim 
		que o servidor está pronto. É recomendável que o execute em serial,
		para que tudos os requisitos sejam carregados antes.
	 */
}));


