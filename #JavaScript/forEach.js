{
	let lista = ['primeiro','segundo','terceiro','quarto'];
	function imprimindoElementos(valor,chave,array){
		console.log(`No indice ${chave}, tem o valor: ${valor} isso no array: ${array}`);
	}

	lista.forEach(imprimindoElementos);

	console.log('criando o proprio forEach');
	//Adicionado esse método a todos os Arrays.
	Array.prototype.meuForEach = function(funcao){
		//Varredura por todos os elementos do array.
		for(let i=0;i<this.length;i++){
			//Aqui é chamada a callback passando (elemento,indice, próprio array)
			funcao(this[i],i,this);
		} //Não Há retornos aqui.
	}
	console.log('fazendo varredura com o meu proprio foreach');
	lista.meuForEach(imprimindoElementos);
}
/*
	Aqui é feito um clone da função ForEach e adicionado a todos os arrays.
	Essa função passa por todos os elementos dos arrays, ela apenas passa
	sem propósito algum, o seu uso é recomendável caso você queira apenas 
	fazer coisas como exibir os valores do array por exemplo, ou qualquer coisas
	que não altere o Array.
*/