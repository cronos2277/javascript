import React from 'react';
/*Essas são as 3 formas de você implementar multiplos componentes na pagina html.*/
//Inicialmente você pode postar dentro de outras tags, no caso é criado a ul com as li dentro do node selecionado.
export const Composto1 = props => <ul><li>Composto1.1</li><li>Composto1.2</li></ul>
//Uma segunda forma é você colocar os elementos jsx dentro de um array, como o exemplo abaixo.
export const Composto2 = props => [<p>Paragrafo 2.1</p>,<p>Paragrafo 2.2</p>];
//A terceira forma é colocar dentro do atributo React.Fragment, no caso o exemplo abaixo funciona como o array acima.
export const Composto3 = props => <React.Fragment><h2>Fragmento1</h2><h2>Fragmento2</h2></React.Fragment>
/*
	O React.Fragment pode ser desesturado do objeto ao qual o atributo pertence, no caso
	se no import acima, fizessemos: import React {Fragment} from 'react';
	o fragment seria desestruturado e se tornaria um objeto a parte, dentro da variavel
	Fragment, assim sendo poderiamos substituir <React.Fragment></React.Fragment> por
	<Fragment></Fragment>, o mesmo também vale para o Component, mas lembrando que o 
	nome dentro das {} deve existir dentro do módulo que você está desestruturando para isso
	funcionar, no caso funciona com o Fragment por que no modulo do react existe esse objeto.
*/
