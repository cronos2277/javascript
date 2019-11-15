//Aqui nós temos um arquivo JSX, é a mesma coisa que o js, mas com suporte a JSX.
import React from 'react'
/*
	Aqui tem um outro exemplo, caso a função não seja padrão, você precisa
	colocar "const, let ou var", além disso uma das formas de exportar essas
	funções é criando um objeto, com todas as funções que você quer importar
	dentro, lembrando que o publico aqui no caso é o que vai para o export.
	Assim como eu enviei um objeto, você poderia enviar uma função ou qualquer
	coisa no export.
*/
export const Primeiro = props => <h2>Componente não padrão, primeiro componente.</h2>
export const Segundo = function Segundo(){
	return <h2>Componente não padrão, segundo elemento.</h2>;
}

//No caso para usar essas funções aqui, você usa como se fosse um metodo.
//Lá no JS você tem o import, supondo que seja import Componente from './MultiplosComponentes',
//será algo do tipo <Componente.Primeiro /> ou Componente.Segundo /> é como se o import
//criasse um objeto no padrão singleton.
export default {Primeiro,Segundo};
