{
	let array_a = [];
	for(let i=0;i<10;i++){
		array_a[i] = i*10;
	}
let primeiro, quinto, oitavo;
[primeiro,,,,quinto,,,oitavo,,] = array_a;
console.log(primeiro);
console.log(quinto);
console.log(oitavo);
let meuObj = {nome: "Joao",idade:29};
let{nome, idade: id}  = meuObj;
console.log(nome);
console.log(id);
}
/*
	Aqui tem um exemplo de destrutores, no caso voce cria uma variavel apartir de um elemento de um array.
sintaxe "[elemento,,outro_elemento] = seu_array; nesse caso saira o elemento contendo o valor do primeiro indice 
do "seu array" , dai pula o segundo, porque o segundo foi pulado, ou seja quando voce nao poe variavel ele cria a 
proxima variavel com base no proximo elemento do array, por exemplo {[crie_variavel],[pule porque so tem virgula],
[crieoutravariavel]}
*/


