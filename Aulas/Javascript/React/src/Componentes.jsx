//Aqui nós temos um arquivo JSX, é a mesma coisa que o js, mas com suporte a JSX.
import React from 'react'

//o export default exporta uma função por padrão, lembrando que ela não precisa ser arrow.
//Além disso você pode passar parametros da função usando as chaves e colocando o atributo.
//Funciona assim: você coloca o "parametro da funcao".o atrributo que espera receber no jsx, 
//colocando entre {} voce tem acesso a esses atributos, por exemplo:
//<SuaTag atributo1="valor" />, para pegar o valor na função usando como parametro "p" fica assim:
// function p => p.atributo1 <-assim você pega o valor. 

export default parametros => <h2>Tag Padrão com 2 parametros, sendo o primeiro: {parametros.primeiro}, e o segundo: {parametros.segundo}</h2>;


