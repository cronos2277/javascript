{
	let lista = ['primeiro','segundo','terceira','quarta'];
	console.log(lista);
	lista.push('ultimo'); //adicionando elemento ao final do array
	console.log(lista);
	lista.pop(); //apaga ultimo elemento do array.
	console.log(lista);
	lista.unshift('antes do primeiro'); //adicionando elemento ao começo do array
	console.log(lista);
	lista.shift(); //apaga primeiro elemento do array.
	console.log(lista);
	//O Splice aceita 2 inteiros que é refente a dimensão a ser excluído e do terceiro parametro para frente é o conteúdo adicionado.
	lista.splice(2,3,'adicionado depois de excluido 3rd e 4th');
	console.log(lista);
	let parte = lista.slice(2); //pega valores apartir do indice 2, pode se colocar um segundo parametro para critério de parada.
	console.log('---- <slice> ----');
	console.log(parte);
	console.log('---- <slice> ----');
	console.log(lista);
	lista.pop();
	lista[2] = 'terceiro';
	lista[4] = 'quinto';
	console.log(lista);
}
/*Array.push() = adiciona elemento ao final do array, Array.pop() apaga o ultimo, Array.shift() apaga o primeiro e unshift adiciona ao primeiro.*/

