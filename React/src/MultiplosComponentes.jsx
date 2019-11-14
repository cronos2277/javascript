//Aqui nós temos um arquivo JSX, é a mesma coisa que o js, mas com suporte a JSX.
import React from 'react'

export const Primeiro = props => <h2>Componente não padrão, primeiro componente.</h2>
export const Segundo = function Segundo(){
	return <h2>Componente não padrão, segundo elemento.</h2>;
}
//export default Ultimo;
export default {Primeiro,Segundo};
