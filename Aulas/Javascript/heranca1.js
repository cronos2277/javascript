{
	Object.prototype.patriarca = 'bisavo';
	let avo = {paternidade: 'sim',parente:'avo',familia:'Familia do Avo', nora:'Familia do Sogro'}
	let pai = {parente: 'pai', __proto__: avo, paternidade:'sim', emprego:'Trabalho do Pai' }
	let filho = {parente:'filho', __proto__: pai, paternidade:'nao'}
	console.log(filho.familia);
	console.log(filho.patriarca);
	let mae = {parente: 'mae', maternidade:'sim',vontade:'coisas da mae'}
	Object.setPrototypeOf(mae,avo);
	let filha = {parente:'filha', __proto__: mae, maternidade: 'nao',vontade:'coisas da filha',lacrar: function(){return this.vontade}};
	console.log(filha.lacrar());
}
/*
	Aqui é explicado como funciona a Herença no Javascript.
	O padrão para qualquer Objeto é apontar como pai, o atributo
	prototype do Object, sendo o prototype do Object Null.
	Os pais da funções seriam Function.prototype que é filho
	de Object.prototype. Você pode setar o pai de um objeto de algumas formas,
	primeiro passando o objeto pai como atributo de __proto__, 
	o __proto__ pode ter o seu valor atribuido em uma classe, como é o caso ali.
	Também podemos atribuir o objeto como valor do prototype do objeto criado,
	e por fim temos: Object.setPrototypeOf(Objeto Filho,Objeto Pai)
*/
