//os erros sao criados de uma funcao, contendo um atributo de mensagem e com o nome, o nome que eh usado para lancar.
function MeuThrow(mensagem){
	this.message = mensagem;
	this.name= 'MeuThrow';
}

const opt = function($numero){
	switch($numero){
		case 10: case 9: console.log('esta perfeito');break;
		case 8: case 7: console.log('acima da media');break;
		case 6: console.log('na media');break;
		case 5: case 4: console.log('na recuperacao');break
		case 3: case 2: case 1: case 0: ('esta reprovado');break;
		// assim que lanca
		default: throw new MeuThrow('Valor Invalido, lançando erro... ');
	}
}
//try e catch estrutura.
try{
	opt(-1);
}catch(error){
	console.error(error.message);
}finally{
	console.log('execução encerrada');
}
