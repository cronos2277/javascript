///<reference path="00tipos.ts" />
/*
    O javascript entende essa linha abaixo como comentario,
    porem nao o typescript, essa seria uma forma de voce dar
    import em um arquivo typescript.
*/

//Namespace.

/*
    A minhavariavel esta em dois escopos, o primeiro
    fora do escopo do namespace e o segundo, fora do namespace.    
*/
const minhavariavel:string = "variavel externa";
namespace MeuNomeSpace{
    //Voce precisa exportar se quiser usar externamente.
    export const minhavariavel:string = "variavel do namespace";
    const varM:string = 'Variavel para uso interno do namespace.';
    export const func1:()=>void = () => console.log(varM);    
    /*
        Voce pode criar um namespace, dentro de outro namespace.
        Lembre-se de usar o export, se voce quiser que esse namespace
        interno esteja visivel externamente.
    */
    export namespace NameSpaceInterno{
        export const varM:string = "variavel dentro do Namespace Interno";
    }
} 

console.log(minhavariavel);
/*
    se for usar algum dado do namespace, voce
    deve referencia-lo, como no exemplo abaixo.
*/
console.log(MeuNomeSpace.minhavariavel);
MeuNomeSpace.func1();
/*
    Dessa forma abaixo voce acessa o namespace interno,
    no exemplo abaixo temos:
    NamespaceExterno.NamespaceInterno.Variavel.
*/
console.log(MeuNomeSpace.NameSpaceInterno.varM);
//acessando variaveis do arquivo 00.tipos.ts, incluido na linha 01.
console.log(numero);