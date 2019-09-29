{
	let arr = [1,2,3,4,5,6,7];
	let obj = {nome:'nome', idade:29}
	for(a in arr){
		console.log('Indice: '+a+', Valor: '+arr[a]);
	}
	for(o in obj){
		console.log('Artibuto: '+o+', Valor: '+obj[o]);
	}
}
/*
	No For In a variavel a esquerda do array na varredura se refere ao indice e não ao valor, 
	cuidado para evitar confusão com isso.
*/