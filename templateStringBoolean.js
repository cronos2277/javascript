console.log(false||0||'Isso serve para exibir um valor padrao caso as operacoes booleanas seja falsas');
let valor = '<12>';
let templateStr = `o valor a ser exibido eh: ${valor}`;
console.log(templateStr);
/*
	Qualquer valor pode ser convertido a booleano. 
	Valor1 || Valor2, nesse caso se valor 1 for falso,
	vazio, nulo, zero, undefinded o mesmo usará o valor 2,
	caso não seja falso será usado o valor 1, se não ele passará
	ao próximo valor verdadeiro.
*/