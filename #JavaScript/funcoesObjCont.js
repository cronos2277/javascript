class classe
{
	constructor(atributo,valor){
		var privado = 'attr';
		this.atributo = atributo;
		this.valor = valor;
	}

	retorna(){
		return 'Atributo: '+this.atributo+", valor: "+this.valor;
	}


}

const minha = new classe('Attr','valor');
console.log(minha.retorna());

const fabrica = function(nome, idade){
	return{
		nome,idade,registro: 7823678

	}
}
console.log(fabrica('Joao',38));
/*

Eh dessa forma que se cria uma classe em javascript, o construtor se cria dessa forma tambem.
O que muda e muito eh o comportamento do this, qualquer variavel criado dentro de classe eh
privada, exceto que voce a chame com o this seguido da notacao ponto.
this.attr eh publica  eh privada ou let, var const attr
*/
