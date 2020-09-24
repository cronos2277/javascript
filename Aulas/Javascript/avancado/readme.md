# Javascript Avançado e Funcional
## MAP, FILTER, REDUCE
### Aqui tem um exemplo de como funciona o método .map()
    Array.prototype.meumap = function(callback){
        const arr = [];
        for(i=0;i<this.length;i++){
            arr.push(callback(this[i],i,this));
        }
       return arr;
    }

### Aqui tem um exemplo de como funciona o método .filter()
    Array.prototype.meufilter = function(callback){
        const arr = [];
        for(let i = 0;i<this.length;i++){
            if(callback(this[i],i,this)){
                arr.push(this[i]);
            }
        }
        return arr;
    }

### Aqui tem um exemplo de como funciona o método .reduce()
    Array.prototype.meureducer = function(callback,acc=null){    
        let arr = callback(acc,this[0],0,this);
        for(let i=1;i<this.length;i++){
            arr = callback(arr,this[i],i,this);
        }
        return arr;
    }

### Observações.
Repare que o this nesses métodos acima, faz referência ao próprio array em questão, o **this[i]** é o elemento do array no índice **i**, e o **this** dentro daquele contexto, é o array inteiro. Já o método reduce antes de entrar no **for**, ele executa essa linha: `let arr = callback(acc,this[0],0,this);` aqui ele faz a interação entre o acumulador e o índice zero, uma vez que essa interação seja concluída, entra-se no laço, caso o array tenha mais de um elemento.

## Promise
Você pode ver exemplos avançados de Promise, clicando aqui [PROMISE_AVANCADO](PROMISE_AVANCADO.js)

Promise são promessas, ou seja você só tem o dado quando o processamento é concluído com sucesso **resolve** ou com falha **reject**, além disso exceto que você faça uso de um **await**, você precisa fazer a interação com o dado dentro de um **.then()**, esse método aceita duas callbacks a primeira para resolve e a segunda caso de um erro dentro do escopo daquele **then**. Com **.catch()** você trata erros mais genéricos e com o **.finally()**, você executa uma instrução após todos os **then** ou algum **catch**. O **catch** mais genérico é ignorado, caso o erro seja tratado dentro do **then**. Funcões sinalizadas com **async**, sempre retornam uma promise, detalhe no nodejs você só pode usar um **await** dentro de uma função sinalizada com o async.

## Função pura
[Arquivo exemplo](FUNCAO_PURA.js)
### Exemplo de função pura
    const pura = (a,b) => a + b;
    console.log("Funcao pura: ", pura(2,2));
### Exemplo de função impura
    const comprimento = raio => 2 * Math.PI * raio;
    console.log("Comprimento de 314:",comprimento(314));
### O que é uma função pura?
#### Uma função pura tem três características:
##### 1 - Não deve ser influenciada por variáveis de escopo externos. 
Ou seja a função não pode ter influência externa.
##### 2 - Não deve influenciar valores de escopo externo.
Ou seja as funções não podem alterar valores fora do escopo dela.
##### 3 - Deve haver retorno de valores deterministicos. 
Ou seja deve ser possível saber a saida com certeza dos valores dela, o **NÃO** inclui por exemplo acesso a banco de dados ou acesso a arquivos, uma vez que pode haver algum problema e o acesso aos dados negado, ou seja qualquer o valor não deve ser oriundo de locais aos quais podem haver problemas que podem ou devem ser tratados por um **catch** por exemplo.

## CURRYING
[Arquivo exemplo](CURRYING.js)
### Exemplo
    function somalazy(valor1){
        const fim = Date.now() + 1000;
        while(Date.now() < fim){}
        return function(valor2) {
            return valor1 + valor2
        };
    }
### O que é?
O Curring é uma estratégia de passar N parametros um por vez, de modo que se torna possível aumentar o reuso e a execução da mesma de forma *Lazy*. Chamando a função acima:

    const lazy = somalazy(1);
    lazy(1);
    lazy(2);

### Exemplo
Repare que aqui a função foi executado em duas etapas, primeiro chamamos um **somalazy** e atribuimos o resultado a função a uma constante `const lazy = somalazy(1);`, como o **lazy** é uma função que ja resultando do processo da **somalazy** e justamente por essa flexibilidade é possível como o reuso, como nesse caso aqui: `lazy(1);lazy(2);`, graças a essa característica foi permitido o reuso, como nesse caso acima que pudemos usar o **lazy** duas vezes.

## Higher Order Functions
[Arquivo](COMPOSICAO_FUNCAO.js)
#### Criando uma função que aceite função como parametro de função e retorne uma função.
    function composta(...fns){
        return function(arg){
            return fns.reduce((acc,fn) => {
                return fn(acc);
            },arg)
        }
    }

#### Usando a função composta acima
    const somar = s => s + s;
    const multiplicar = m => m * m;
    composta(somar,multiplicar,somar,multiplicar,console.log)(1);

### O que é Higher Order Function?
É justamente a capacidade que a linguagem tem de aceitar uma função como parametro de outra função e a possibilidade de pode retornar uma função.

## Função de primeira classe.
Esse é um conceito ao qual se pode tratar a função como um tipo de dados qualquer, assim como acontece com *String* e *Boolean* por exemplo, como por exemplo: `const funcao = f => console.log(f);`, repare que aqui criamos uma função assim como criamos um tipo de dado qualquer.

### Exemplo de função de primeira classe e Higher Order Function
[Higher Order e First Class arquivo](HIGHER_ORDER_FN-FIRST_CLASS-FN.JS)

## Closure
### Exemplo de Closure
    const d = 4;
    function externo(){
        const a = 1;
        interno();
        function interno(){
            const b = 2;
            intimo();
            function intimo(){
                const c = 3;
                console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
            }
        }
    }

    const a = -1; 
    const b = -2;
    const c = -3;
    externo();

### O que é Closure?
Essa é uma característica que faz com que a função lembre do contexto lexico da onde ela foi escrita, nesse exemplo por mais que exista três variáveis **a**, **b**,**c**  com valores positivos dentro da função e fora da função existe essas mesma variáveis, mas com valores negativos. No caso, como essas três variaveis foram criados dentro da função com valores positivos, logo quando a função é executada a função trabalha com os valores positivos, uma vez que no contexto lexico da função os valores foram definidos como positivos, agora isso não se aplica a **d**, uma vez que essa variável não está dentro do da função **externo** por mais paradoxico que possa parecer. [CLOUSURE](CLOSURE.js)

## Flat, FlatMap
[Exemplo](FLAT-FLATMAP.js)
### Flat
Esse processo consiste colocar todos os dados de dentro de um array no mesmo nível, por exemplo esse array `[1,[2],[[3]],[[4]],[5],6];` se fossemos achatar esse array em **1 nível** ficaria: `[ 1, 2, [ 3 ], [ 4 ], 5, 6 ]` repare que todos os elementos subiram um nível, ou seja o que era um sub-array ficou no nível de array e o que estava dentro de um sub-array agora está no nível de sub-array. Para conseguirmos isso usamos o método **flat**, assim sendo: `[1,[2],[[3]],[[4]],[5],6].flat(1)`, no caso você poderia substituir o **1** pelo nível de achatamento que você deseja, caso que você queira que todos os valores estejam no mesmo nível, por exemplo tranformar isso `[1,[2],[[3]],[[4]],[5],6]` nisso `[ 1, 2, 3, 4, 5, 6 ]` ou seja colocar todos os elementos no mesmo nível então voce pode substituir o numero pelo **infinity**, ficando: `[1,[2],[[3]],[[4]],[5],6].flat(Infinity)`, assim é tudo planificado ou achatado ao mesmo nível dentro do array.

### FlatMap
Você também pode associar uma função durante ao processo de achatamento, no caso é possível executar uma função map em paralelo com o achatamento, nesse exemplo abaixo o array será achatado e terá os seus valores duplicados:

    const array = [1,[2],[[3]],[[4]],[5],6];
    funcaoFlatMap = e => e*2;
    console.log(array.flatMap(funcaoFlatMap));
    
#### Output
Nesse exemplo, o output seria: `[ 2, 4, 6, 8, 10, 12 ]`, ou seja o valor é achatado ou planificado e depois cada valor é dobrado devido a função ` funcaoFlatMap = e => e*2;` passada por parametro.