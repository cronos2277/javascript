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

## Pipes
O gulp trabalha com o padrão pipe and filter, nesse caso você precisa apenas começar a importar o arquivo que você quer manipular, tratar ele com os pipes e apos isso mover para o destino.

### Exemplo de uso de pipes
`gulp.src('src/**/*.js')` => Aqui estamos importando todos os arquivos nas subpastas que tem a extensão **JS**

`gulp.src('src/**/*.js').pipe(uglify())` => Aqui estamos executando um pipe no arquivo importado, no exemplo estamos executando o uglify, no arquivo importado pelo metodo src.

`gulp.src('src/**/*.js').pipe(uglify()).on('error',erro => console.error(erro))` => Aqui alem de executar o pipe, estamos tratando um evento, nesse exemplo nós estamos tratando o evento de erro. No caso qualquer erro que ocorra até esse ponto será tratado ali no on, como apenas tem um pipe com o uglify, logo é caso aconteça um erro no uglify mesmo.

`gulp.src('src/**/*.js').pipe(uglify()).on('error',erro => console.error(erro)).pipe(gulp.dest('build'));` => Aqui temos um segundo PIPE, esse ultimo Pipe ele move o arquivo importado pelo.`.src()` , processado pelo primeiro `.pipe(no caso o uglify)` e com o evento tratado pelo metodo `.on(Que esta tratando o erro de todo o pipe do uglify)`, e move para a pasta build.

### Funções ou métodos para serem usados dentro do método gulp.pipe()
#### Lembre-se que se faz necessário importar usando o metodo src do gulp, uma vez importado, ai você pode usar o método pipe e algumas dessas funções dentro do método pipe.

`uglify()` => mimifica arquivos.

`concat("nomeDoArquivoConcatenado.extensao")` => Une todos os arquivos de entrada do método src nesse único arquivo.

`babel()` => Converte códigos na nova codificação do javascript, para códigos que funcione em navegadores mais antigos.

`gulp.dest('build')` => Essa função deve ser a ultima do pipe, aqui informamos a pasta aonde deve estar o arquivo de output importado pelo `.src()` e processado pelo `.pipe()`

 ## Exemplos:
 [Copia de Arquivo](./basico/gulpfile.js) => Exemplo básico de como funciona o gulp.

 [Preparar aquivos JS](./javascript/gulpfile.js) => Exemplo de como preparar um arquivo javascript para produção.