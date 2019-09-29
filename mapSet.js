{
	const meu_array = ['primeiro','segundo','terceiro','quarto'];
	const meu_set = new Set(meu_array);
	console.log(meu_set);
	const meu_map = new Map();
	meu_map.set({attr:'valor'},'chave objeto');
	console.log(meu_map);
	meu_map.get({attr:'valor'}).delete;
	console.log(meu_map);
}
/*
	O Set é um tipo de lista ordenada, que não aceita valores repetidos.
	O Map é um tipo de lista chave-valor, mas diferente de um objeto javascript
	você pode usar muito mais do que Strings e numeros para chaves, você pode
	por exemplo usar como chave uma função ou um objeto por exemplo em um Map.
*/