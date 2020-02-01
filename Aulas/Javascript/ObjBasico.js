{
	const obj1 = {attr:'meu atributo',funcao:function(){console.log(this.attr)}}
	obj1.funcao();
	const atributo = 'atributo';
	const valor = 'meu valor';
	const obj2 = {[atributo]: valor};
	console.log(obj2);
	const obj3 = {};
	obj3[atributo] = valor;
	console.log(obj3.atributo);
	//JSON.parse transforma JSON em Objeto.
	const obj4 = JSON.parse('{"attr":"attr"}');
	console.log(obj4);
	const obj5 = new Object();
	obj5['attr'] = 'valor intocavel';
	//o método freeze transforma o atributo em constante, impedindo-o de mudanças.
	Object.freeze(obj5);
	obj5.attr = 'teste com o freeze';
	console.log(obj5.attr);
}
