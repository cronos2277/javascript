{
	const inicial = 0;
	let arr1 = [10,20,30,40,50,60,70,80,90];
	let arr2 = [10,20,30,40,50,60,70,80,90];
	console.log(arr1.reduce((a,b)=>a+b,inicial));
	console.log('agora com o reduce customizado');
	//Método para todos os Arrays.
	Array.prototype.reduce2 = function(funcao,inicial = 0){
		//Diferente dos outros, aqui temos um acumulador, ou seja tudo vira um só.
		let acumulador = this[0] + inicial;
		for(i=0;i<this.length;i++){
			//Acumulado recebe o resultado da função de callback.
			acumulador = funcao(acumulador,this[i],i,this);
		}
		return acumulador; //retorna o acumulador.
	}

	console.log(arr2.reduce((a,b)=>a+b,inicial));
}
/*
	Esse método de varredura trabalha com um acumulador, uma vez que 
	todos os métodos viram um elemento só, um exemplo do uso disso seria
	por exemplo somar todos os elementos de um array, por exemplo.
	A funcao de callback deve ter 4 parametros: (acumulador, elemento, indice, array inteiro).
	Além disso a reduce pode aceitar um valor inicial, por exemplo Array.reduce(sua callback, o valor inicial);
*/