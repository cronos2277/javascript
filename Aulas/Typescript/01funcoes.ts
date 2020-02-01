//:[typescriptTipo] apos os parenteses indica o tipo de dados que a funcao retorna.
function funcao1():void{ //Nao recebe nada, nao retorna nada. Void = Vazio.
    console.log('Funcao nao retorna nada');    
} 
function funcao2():number{ //Retorna um numero e nao recebe nada.
    return 0;
}

//Voce pode definir a insercao de tipos na entrada de parametros.
function funcao3(var1: any):void{ //Recebe qualquer
    console.log(var1);
}

//Voce pode ter entrada e saida de dados diferentes.
function funcao4(var1:number,var2:number,var3:string):any{
//Recebe 3 parametros e retorna qualquer coisa.
    return var3 + (var1+var2);
}
//Definindo no TypeScript o tipo de dados do tipo funcao.
let funcao5: () => number; //Estrutura para definir um tipo funcao.
funcao5 = () => 1+1; //Funcao arrow que nao recebe parametros.
/*
    A funcao 5, apenas pode receber uma funcao que nao tenha
    parametros e retorna dados do tipo numerico, se a funcao
    tiver parametros ou retornar qualquer outra coisa, ou
    nao retornar nada, a mesma nao pode ser atribuida a funcao 5.
*/
const funcao6: (param1:string) => void = function(param1):void{
//A funcao 6 ela pode receber apenas uma funcao que tenha 1 parametro
//e sem algum retorno.    
    console.log(param1);
}

var funcao7: () => string;
funcao7 = function funcao7():string{
//A funcao7 Ela pode receber apenas uma funcao
//que nao recebe parametro e retorna uma string.    
    return "mensagem";
}

let funcao8: (va1:number,var2:number) => number;
funcao8 = function funcao8(x,y):number{
/* 
    O nome dos parametros eh irrelevante, 
    mas a ordem e quantidade devem ser mantidas.    
 */    
    return x+y;
}
const function9:(tupla:[number,string]) => [string,number] = function(a:[number,string]){    
    return [a[1],a[0]];
/*
    Voce tambem pode tanto ter como parametro de entrada ou de saida, tuplas.
    Repare que a entrada eh [number,string] e a saida [string,number].
    Lembre-se que constante, deve ter o seu conteudo informado, assim que a 
    mesma eh declarada, diferente do javascript que voce pode passar conteudo
    para ela depois, no TypeScript voce deve fazer na hora da declaracao.
*/    
}
const function0:(param1:number,param2:number)=>number = (param1:number = 3,param2:number = param1 + 2){
    return param1 + param2;
}
/*
    Voce tambem pode ter um valor padrao para a funcao, como eh o caso do param1 e ainda ter
    um parametro padrao, como parte de um parametro padrao, como eh o caso do param2,
    que usa o param1 somado de dois como parametro padrao. No caso se nao for informado um 
    numero no param1 o valor sera 3 no param1 e 3+2 no param2, sendo assim 5. Agora se for
    informado um zero no param1, o param1 fica com 0 e o param2 com 0+2, nesse caso 2.
    caso seja informado por exemplo 1 no param1 e 2 no param2, ai fica esses valores mesmo
    1 para o param1 e 2 para o param2. No caso os valores padroes so entram em cena caso
    eles nao sejam informados. A ordem dos parametros eh sempre da esquerda para a direita, ou
    seja se for informado apenas um parametro, o mesmo sera usado como param 1. No javascript
    puro voce poderia passar um valor para o param2 omitindo o primeiro o valor usando a , na 
    frente, no caso ficaria assim: `functio0(,2)` nesse caso o parametro 2 iria para o param2,
    uma vez que foi usado a virgula na frente, mas no typescript isso nao eh permitido.
*/
