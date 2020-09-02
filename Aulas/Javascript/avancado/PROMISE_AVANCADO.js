Promise.all(
    /*
        O metodo all recebe um array de promise, ele apenas
        exibe os valores no then, apenas quando todas as 
        promises sao resolvidas, se uma dar um erro, cai
        no catch, logo precisa que todas sejam resolvidas
        sem que nenhuma de reject.
    */
    [        
        new Promise((resolve) => resolve(3)),
        Promise.resolve(4), //Aqui resolvemos uma promise
        Promise.resolve(5),
        new Promise(resolva => resolva(6))
    ]    
).then(console.log).finally(() => console.log("Executando Promise.all, todas as promise resolvidas"));

//Experimental o metodo any apenas retorna erro se todas derem reject, no caso o contrario do all.
/*
Promise.any(
    [
        Promise.reject(null), //Aqui estamos dando um reject
        Promise.resolve(1)
    ]
).then(console.log)
*/

/*
    Retorna o primeiro resultado resolvido apenas, independente se é reject ou resolve, no caso o 
    reject resolve a questao da maneira mais rapida possivel.
*/
Promise.race(
    [   
        Promise.resolve(1),     
        Promise.reject(null),
        new Promise((_,falha) => falha(null)),
        Promise.resolve(2)
    ]
).then(
    console.log,
    console.warn //Aqui trataremos algum erro dentro do escopo desse then, caso essa callback de erro seja chamado o catch nao sera.
).catch(console.error) //Erros mais genericos.
.finally(() => console.log("Executando o metodo race"));

async function exemploAsyncAwait(){
    /*
        No nodejs o await apenas pode ser usado dentro de funcoes sinalizadas com o
        async, o await traz sincronicidade ao seu codigo, no caso o await traz o resultado
        ao inves de retornar a promessa.
    */
    const consoleAzul = e => console.log('%c '+e,'color:blue;background-color:yellow');
    await Promise.resolve("Sincrono 1").then(consoleAzul);
    Promise.resolve("Assincrono 1").then(consoleAzul);
    Promise.resolve("Assincrono 2").then(consoleAzul);
    await new Promise(r => r("Sincrono 2")).then(consoleAzul);
    /*
        Repare aqui, o await faz com que a promise seja resolvida antes de continuar 
        executando codigos. Repare que o console abaixo vai ter acesso ao valor
        da promisse, não sera executado nada até que a promise seja resolvida, uma
        vez resolvida essa linha: "await Promise.resolve("Valor pronto para ser processado!")"
        vira o resultado resolvido da promise.
    */
    console.log("Trazendo valor de promise: ",await Promise.resolve("Valor pronto para ser processado!"));
    console.log('so executo depois de resolvido a promise acima.');
}

exemploAsyncAwait().then();