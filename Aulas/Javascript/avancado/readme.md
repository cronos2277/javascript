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