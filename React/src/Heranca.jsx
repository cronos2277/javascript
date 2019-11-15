import React from 'react';
export const ElementoFilho = e => <p>{e.primeiro}</p>; 
export default elemento => <div>
<hr/>
{/* 
	Aqui nos temos um caso de heranca envolvendo o react, o elemento acima
	e um elemento filho desse criado abaixo. No caso eh possivel criar um 
	componente filho e exportar ele dentro de um componente pai, porem algumas
	coisas devem ser observadas, inicialmente o operador spread. No caso
	ele carrega o valor do pai nos filhos, nesse caso. Como o operador 
	spread ele carrega os valores pego da tag jsx la no index.js e 
	passa aos filhos, porem como no caso do ultimo filho, com a escrita
	do parametro primeiro, ele foi escrita apos a importacao por meio
	do spred, logo ele pega o novo valor, mas isso nao aconteceria se o
	spread estivesse depois do elemento filho. Resumindo o spread aqui o sprad
	carrega dados do elemento pai, e quando escrito apos as tags filhas
	ele reescreve todas as filhas e quando antes, a mesma passa ser reescrita pelas
	filhas, ou seja se spread carregar depois da primeira tag e antes da segunda, por exemplo
	apenas as duas pegaram a tag do pai, mas se a primeira e segunda tag reescreverem
	o valor do pai, isso apenas funcionara com a segunda, pois o spread vem depois da primeira.
*/}
<ElementoFilho {...elemento }>{elemento.primeiro}</ElementoFilho>
<br/>
<ElementoFilho  primeiro="Elemento com valor de Filho">{elemento.primeiro}</ElementoFilho>

</div>;
