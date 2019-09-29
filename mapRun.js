{
	let colecao = [1,2,3,4,5,6,7,8,9,10,11,12];
	const func1 = a => a/2;
	const func2 = b => b*3;

	let resultadoMap = colecao.map(func1).map(func2);
	console.log(resultadoMap);

	console.log('agora com o MAP customizado');

	Array.prototype.meuMap = function(funcao){ //Vale para todos os Arrays
		let newArr = [];
		for(let i=0;i<this.length;i++){ //Varrendo todos os elementos
		//Nessa varredura é adicionado o resutado da função como elemento
			newArr.push(funcao(this[i],i,this)); 
		}
		return newArr; //aqui o retorno é o array modificado.
	}

	let resultadoCustomizadoMap = colecao.meuMap(func1).meuMap(func2);
	console.log(resultadoCustomizadoMap);
}
/*
	Esse método, o map ele faz uma varredura com propósito, diferente do filter que
	precisam que calbacks retornem booleanos, aqui o retorno é o atributo alterado
	pela callback, a callback faz a alteração e retorna o valor modificado como elemento.
	O parametro da callback deve ser (elemento, indice, o própio array).
*/