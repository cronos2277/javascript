//Funcao tipo Arrow, aqui o this eh fixo e tem o mesmo contexto de quando foi criado
const func1 = a => console.log(a); //quando so tem um parametro pode se tirar os parenteses
const func2 = (a,b=0) => console.log(a+b);//zero eh vazio os parenteses e mais de um precisa de parenteses.

func1('Imprima isso');
func2(2);

func3 = function(nome1){this.nome = nome1;}
func3.nome = 'Funcao como objeto';
console.log(func3.nome);

let objeto = {key:"Meu Valor Bixo",funcao:function(){console.log(this.key)}}
objeto.funcao();

