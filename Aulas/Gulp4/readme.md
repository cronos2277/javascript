# Gulp
## Instalação
Você pode instalar o gulp de maneira global, uma vez que você tenha o nodejs instalado `npm i -g gulp-cli`.

## Usando o GULP 4.
Após instalado você pode ir no terminal e digitar `gulp`, por padrão ele vai procurar por um arquivo chamado
"**gulpfile.js**" caso não seja informado um arquivo, caso você queira que o gulp execute um arquivo que não
tem esse nome você deve usar a flag "**-f**", ficando `gulp -f 'NOME_DO_ARQUIVO'`, sendo o **'NOME_DO_ARQUIVO'**
o nome do arquivo que você deseja executar.

## Exemplo de Uso básico de como criar uma tarefa

`const gulp = require("gulp");` **Importando o gulp para o projeto.**

    O gulp pode executar tarefas tamnto em series como em paralelo,
    caso não haja nenhuma dependência, isso com o auxílio dos dois
    objetos abaixo.

`const series  = gulp.series;` **A series é um atributo do gulp**

`const parallel = gulp.parallel;` **Assim como o parallel tambem é**

   
    Aqui a mágica acontece, ou seja essa função assim como qualquer 
    outra sera passado para o GULP, no entanto a sua função deve
    receber um parâmetro e esse parâmetro sera uma callback, que
    o gulp ira executar quando essa tarefa aqui, for executada.
    Aqui abaixo temos um exemplo de como a coisa deve ser estruturada
    no GULP 4, aqui a tarefa eh simplismente imprimir algo no console.


`function tarefa1(quandoConcluido){`

   `console.log("Exemplo basico de tarefa");`

   `quandoConcluido();` **Callback vai ser executada quando a tarefa for concluída.**

`}`

`function tarefa2(quandoConcluido){`

   `console.log("Exemplo basico de tarefa");`

   `return quandoConcluido();` **Callback vai ser executada quando a tarefa for concluída, tambem pode retornar algo, se lhe for útil.**

`}`


    Aqui que acontece a execução. Você basicamente da um module.exports e exporta
    o resultado da função series ou parallel. Cada tarefa a ser executado deve 
    ser informado dentro dos parenteses. Lembrando que o Gulp exige uma task 
    default, logo voce precisa atribuir o resultado da função series ou parallel para:
    module.exports.default
    No exemplo abaixo estamos executando a mesma tarefa duas vezes e de maneira serial.
    Vamos la:

    1) Uma tarefa é nada mais que uma função que recebe uma callback do gulp4 e que
    sera executada após a execucao do gulp4 (semelhante ao express e os seus next).

    2)você deve passar ao module.exports.default como valor o resultado de uma
    função do gulp, podendo ser serial ou parallel por exemplo.

    3)Você deve informar cada tarefa, no caso a função que voce criou e que recebe
    como parâmetro uma callback que o gulp vai injetar e executar quando encerrar a
    tarefa. Coloque-a como parâmetro para a funcao series ou parallel e a mesma 
    sera executada na ordem passada.


`module.exports.default = series(tarefa1,tarefa1);` 

ou

 `module.exports.default = parallel(tarefa1,tarefa1);`

 ou

 `module.exports.default = series(parallel(tarefa1,tarefa1),tarefa2 );` **voce pode colocar a funcao parallel dentro de series**

 ou

 `module.exports.default = parallel(series(tarefa1,tarefa1),tarefa2 );` **ou o contrário.**

 ## Exemplos:
 [Copia de Arquivo](./basico/gulpfile.js)