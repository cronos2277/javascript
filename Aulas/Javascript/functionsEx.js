//funcao que retorna funcao.
const exemplo1 = function(a,b){
	return function exemplo1Interno(c){
		return (a+b)-c;
	}
}
//o primeiro parenteses e da funcao, o segundo eh da funcao retornado
let resultadoDoRetornoDefuncaoDafuncao = exemplo1(5,4)(3);
console.log(resultadoDoRetornoDefuncaoDafuncao);
//funcao nomeada.
const exemplo2 = function(){
	console.log('argumentos pego pelo arguments');
	for(i in arguments){
		console.log(arguments[i]);
	}
	console.log('Fim de de argumentos;');
}
exemplo2(2,4,6,8,10);
//funcao anonima restrida em variavel.
const funcaoParaExemplo = function(a,b){
	return a*b;
}
const exemplo3 = function (umaFuncao){
	return umaFuncao;
}

const resultado = exemplo3(funcaoParaExemplo(3,5));
console.log(resultado);
/* Nesse tipo de funcao o valor do This autera de acordo com o contexto que ela foi chamada. */
