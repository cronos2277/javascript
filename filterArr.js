{
	let arr = [1,2,3,4,5,6,7,8,9,10,11,12];
	let arr2 = [1,2,3,4,5,6,7,8,9,10,11,12]
	const por2 = a => a % 2 == 0;
	const por3 = b => b % 3 == 0;
	console.log(arr.filter(por2).filter(por3));
	//Função adicionado para todo e qualquer Array.
	Array.prototype.filtro = function(funcao){
		let meuArr = []; //criando um array novo.
		for(i=0;i < this.length;i++){
			if(funcao(this[i],i,this)){
				//Adicionando elemento ao final do array.
				meuArr.push(this[i]); 
			}
		}
		return meuArr; //A função retorna um novo array.
	}

	console.log('Agora iniciando o filter customizado');
	console.log(arr2.filtro(por2).filtro(por3));
}
/* 
	Aqui é foi feito o método filter os Array.
	O Filter ele pega uma função de callback, cria um novo array com o mesmo tamanho do próprio array,
	basta ver a chamada do This, que nesse caso é o próprio objeto, no caso todos os Arrays são Objetos,
	ao chamar a função de callback, esse método pega a função de callback e passa (primeiro o elemento,
	representando pelo this[i], depois o indice, e ai por fim o próprio conjunto de array, no caso o This.
	O filter apenas adiciona valores no novo array, caso a mesma seja submetida a uma comparação booleana,
	logo o ideal é que a função de callback seja capaz de retornar verdadeiro ou falso, depois de analisado
	todos os elemento, é retornado o array, após ser submetido a uma verificação booleana.
*/