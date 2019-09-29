{
	const var1 = 10;
	const var2 = 20;
	/*
		A Tagged Template é uma função que dois parametos, 
		o primeiro é o texto e o segundo as variaveis,
		o negócio é intercalado, ou seja no texto abaixo
		texto[0] = 'Primeiro valor:';
		variaveis[0] = o valor de var1;
		variaveis[1] = o valor de var2;
		texto[1] = ',segundo valor';
	*/
	const taggedTemplate = function(texto, ...variaveis){
		console.log(`Texto digitado:${texto}`);
		console.log(`Valores do template String: ${variaveis}`);
		return 'String vazia';
	}
	//Repare que a função tagged Template é chamada sem parenteses e não funciona com variáveis, apenas com valores literais.
	console.log(taggedTemplate `Primeiro valor:${var1}, segundo valor ${var2}`); 
}
/*
 você pode criar uma Tag para colocar na frente da Template string, para que ela a prepare antes de virar String.
 Por exemplo let string = suaTag `seu texto ${variaveis}`; o Template string é feito dentro de ``, e a mesma é feita
 para aceitar formatações, como por exemplo, colocar R$ na frente de todos os números.
*/