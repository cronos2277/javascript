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
    caso nao haja nenhuma dependencia, com o auxilio dos dois
    objetos abaixo.

`const series  = gulp.series;` **A series eh uma atributo do gulp**

`const parallel = gulp.parallel;` **Assim como o parallel tambem eh**

   
    Aqui a magica contece, ou seja essa funcao assim como qualquer 
    outra sera passado para o GULP, no entanto a sua funcao deve
    receber um parametro e esse parametro sera uma callback, que
    o gulp ira executar quando essa tarefa aqui, for executada.
    Aqui abaixo temos um exemplo de como a coisa deve ser estruturada
    no GULP 4, aqui a tarefa eh simplismente imprimir algo no console.


`function tarefa1(quandoConcluido){`

   `console.log("Exemplo basico de tarefa");`

   `quandoConcluido();` **Callback vai ser executada quando a tarefa for concluida.**

`}`


    Aqui que acontece a execucao. Voce basicamente da um module.exports e exporta
    o resultado da funcao series ou parallel. Cada tarefa a ser executado deve 
    ser informado dentro dos parenteses. Lembrando que o Gulp exige uma task 
    default, logo voce precisa atribuir o resultado da funcao series ou parallel para:
    module.exports.default
    No exemplo abaixo estamos executando a mesma tarefa duas vezes e de maneira serial.
    Vamos la:

    1) Uma tarefa eh nada mais que uma funcao que recebe uma callback do gulp e que
    sera executada apos a execucao do gulp (semelhante ao express e os seus next).

    2)voce deve passar ao module.exports.default como valor o resultado de uma
    funcao do gulp, podendo ser serial ou parallel por exemplo.

    3)Voce deve informar cada tarefa, no caso a funcao que voce criou e que recebe
    como parametro uma callback que o gulp vai injetar e executar quando encerrar a
    tarefa, como parametro para a funcao series ou parallel e a mesma sera executada
    na ordem passada.


`module.exports.default = series(tarefa1,tarefa1);` 

ou

 `module.exports.default = parallel(tarefa1,tarefa1);`