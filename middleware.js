{

	function somar(proximo,valor,indice,total,tamanho){
		total += valor[indice];
		indice += 1;
		console.log('somando... = '+ total);
		if(indice < tamanho){
			 proximo[indice](proximo,valor,indice,total,tamanho);
		}
	}

	function subtrair(proximo,valor,indice,total,tamanho){
		total -= valor[indice];
		indice += 1;
		console.log('subtraindo... = '+total);
		if(indice < tamanho){
			proximo[indice](proximo,valor,indice,total,tamanho);
		}
	}

	function multiplicar(proximo,valor,indice,total,tamanho){
		total *= valor[indice];
		indice += 1;
		console.log('multiplicando... = '+total);
		if(indice < tamanho){
			proximo[indice](proximo,valor,indice,total,tamanho);
		}
	}

	function dividir(proximo,valor,indice,total,tamanho){
		total /= valor[indice];
		indice += 1;
		console.log('dividindo... = '+total);
		if(indice < tamanho){
			proximo[indice](proximo,valor,indice,total,tamanho);
		}
	}

	function exibir(proximo,valor,indice,total,tamanho){
		console.log('-----------------------');
		console.log(`O valor eh: ${total}`);
		indice += 1;
		if(indice < tamanho){
			proximo[indice](proximo,valor,indice,total,tamanho);
		}
	}


	function executar(valores,funcoes){
		let tam = funcoes.length;
		let total = 0;
		console.log('tamanho array: '+tam);
		funcoes[0](funcoes,valores,0,total,tam);
	}

	let valores = [0,10,20,30,40,50,60,70,80,90,100];
	let funcoes = [somar,somar,subtrair,multiplicar,multiplicar,dividir];
	funcoes.push(exibir);
	executar(valores,funcoes);
}
/*
	Esse é o padrão de projeto também conhecido como Chain of Responsability, 
	ou Middleware. Esse padrão funciona assim, você executa uma função e após
	a execução ela pode ou não chamar a próxima. Um exemplo:
	funcao(parameto){
		//regra de negocio...
		if(condicao para chamar a proxima funcao){
			parametro.metodo();
		}else{
			encerre a execução.
		}		
	}
	repare que a lógica se aproxima a de uma corrente, existe um método que funciona
	como uma corrente entre a função do exemplo e o parametro passado, sendo que esse parametro
	pode chamar outro método dentro dele, e isso pode acontecer N vezes até que a condição para o
	else ocorra. Nesse padrão, as funções ou métodos podem executar outras funções e métodos, todos unidos e passando
	um parametro como padrão, todos unidos por esse parametro, ocorre a execução de diversos métodos em série
	até a condição de parada seja acionada, como se fosse uma corrente.
*/