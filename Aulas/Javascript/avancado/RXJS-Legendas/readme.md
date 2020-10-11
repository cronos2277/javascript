# Projeto Contar palavras de Legendas.
## O que é?
Essa apliação pega uma legenda, conta as palavras de toda a legenda e as exibem de acordo com a frequência com que aparecem, sendo as mais usadas ficando mais ao topo. Com essa aplicação é possível saber quais palavras determinado seriado usa, e quantas vezes cada palavra aparece. Esse é feito usando como base o RXJS.


## Funções do arquivo de funções.
[functions.js](functions.js)

[index.js](functions.js)

## Lodash
Para importar a biblioteca `const _ = require('lodash')` e para usar, uma forma de uso é dentro do operador *map* de um observable: `map(array => _.sortBy(array, el => -el.q))` o método sortBy exige dois parametros, o primeiro é o array a ser trabalhado e o segundo é uma callback que deve definir a forma de ordenação, no caso você deve selecionar um atributo dentro do objeto a ser ordenado e o lodash fará essa ordenação, quando acompanhado do sinal de menos o mesmo tem a sua lógica invertida.

## Operador toArray()
Coloca todas as saídas de dados dentro de um único array.
