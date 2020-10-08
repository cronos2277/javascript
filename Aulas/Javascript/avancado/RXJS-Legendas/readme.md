# Projeto Contar palavras de Legendas.
## O que é?
Essa apliação pega uma legenda, conta as palavras de toda a legenda e as exibem de acordo com a frequência com que aparecem, sendo as mais usadas ficando mais ao topo. Com essa aplicação é possível saber quais palavras determinado seriado usa, e quantas vezes cada palavra aparece.

## Funções do arquivo de funções.
[functions.js](functions.js)

## Breve explicação sobre as funções.

`readDir` => le um diretorio e retorna um array de String com o nome de todos os arquivos do diretorio.

`filterBy` => filtra os arquivos com base na extensão.

`readFiles` => lê todos os arquivos.

`joinArrayInString` => Une to conteudo de todos os arquivos em uma String

`joinArrayInString` => separa os aquivos com base na quebra de linha

`removeEmpty` => remove os espacos em branco.

`removeNumberLine` => Exclui toda a linha que possui um digito.

`removeChars` => remove os caracteres especiais encontrado na string com base em uma regex, veja o atributo regexSymbols do function.js

`removeTag` => se passado uma string em branco, remove qualquer tag, caso contrario, informe ali a tag que quer excluir.

`removeByPattern` => Remove toda a linha que tenha aquela String

`byWord` => Pega um texto e transforma em um array de palavras.

`countElements` => Retorna o número de ocorrência de uma String dentro de um array.

`ordering` => conta o número de ocorrência com base no valor passado no parametro.