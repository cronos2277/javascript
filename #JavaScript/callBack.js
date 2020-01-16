function callback1(a,b,funcao){
	console.log(funcao(a,b));
}

callback1(2,6,(a,b) => a*b);
console.log('-------------------------------------');
const lista = [1,2,3,4,5,6,7,8,9,10,11,12];

selecionados = lista.filter(a => a % 2 == 0);
selecionados.forEach(a => console.log(a));
/*
No js funcao eh um tipo, assim como integer e string por exemplo.
Logo funcao de callback eh quando voce passa a funcao como parametro,
a propriedade de callback eh quando a funcao tem capacidade de se
comportar como um tipo de dado.
*/
