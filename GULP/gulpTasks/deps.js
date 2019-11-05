const gulp = require('gulp');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

const tratarCSS = function tratarCSS(){
	return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
		.pipe(uglifycss({"uglyComments":true}))
		.pipe(concat('deps.min.css'))
		.pipe(gulp.dest('build/assets/css'));
		/*
			Pega todos os arquivos css, une, mimifica e coloca nas build/assets/css
			e coloca dentro do arquivo deps.min.css.
		 * */
}

const pegarFontes = function pegarFontes(){
	return gulp.src(['node_modules/font-awesome/fonts/*.*'])
		.pipe(gulp.dest('build/assets/fonts'));
	/* Pega todas as fontes e coloca no diretório build/assets/css */
}

/*Executando as tasks.*/
gulp.task('deps.css',tratarCSS);
gulp.task('deps.fonts',pegarFontes);
/*
	Aqui as tasks são executadas em séries, veja que tanto em series como
	em paralel não precisam ter uma função, sendo facultativo.
 * */
gulp.task('deps',gulp.series('deps.css','deps.fonts'));
