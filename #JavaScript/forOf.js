{
	let arr = [1,2,3,4,5,6,7,8,9,10];
	const func = a => a * 2;
	arr = arr.map(func);
	for(valor of arr){
		console.log(valor);
	}
}
/*
	No caso do For Of, diferente do for in, o For Of retorna o valor
	e não a chave, ou seja ele é o contrario do for in. Use o método
	"keys" do array caso queira usar como for in.
*/