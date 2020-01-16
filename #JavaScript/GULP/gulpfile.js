//Biblioteca padão GULP
const gulp = require('gulp');

//incluindo bibliotecas
require('./gulpTasks/app');
require('./gulpTasks/deps');
require('./gulpTasks/servidor');


gulp.task('default',gulp.series('deps','app','servidor', function(done){   
	done(); //função executada se tiver erros. a callback não precisa ter parametros.
}));

/*
	O método gulp.task aceita 2 parametros, o nome da task e a uma função
	* gulp.task('nome_da_task',funcão());
	* gulp.series("tasks de dependencias", função) ou gulp.series(função)
	* Essa função faz com que seja executada em série e não em paralelo,
	* gulp.parallel("tasks de dependencias", função) ou gulp.parallel(função)
	* já a função parallel permite que seja executada em paralelo.
  
 */
