/*
    Dessa maneira abaixo voce tem acesso ao recurso de construtor
    no javascript, inicialmente voce precisa habilitar no arquivo
    de coniguracao do typescript o "tsconfig.json" o suporte a 
    esse recurso, e por fim criar uma funcao para esse recurso.
    Acima da classe voce coloca a notacao '@' com um nome, e apos
    isso voce cria uma funcao para essa anotacao que voce criou.
    Abaixo a anotacao: @exemploDecorator1.
*/
@exemploDecorator1
class Decorator1{    
    constructor(public var1:string){        
        console.log(var1);
    }
}

//Aqui a funcao relacionada a anotacao: @exemploDecorator1.
function exemploDecorator1(constructor: Function){
    console.log(constructor);
}

new Decorator1("Instanciando decorator 1");
/*
    Aqui abaixo um exemplo mais complexo de decorator com 
    parametros. Uma funcao para o decorator precisa retornar
    uma outra funcao, porem pode ou nao ter argumentos como
    eh o caso aqui.
*/
@exemploDecorator2("Meu Texto",1)
class Decorator2{    
    constructor(public var1:string){        
        console.log(var1);
    }
}
/*
    Aqui um exemplo de uma funcao decorator, aqui voce
    recebe dois parametros, os parametros passado na anotacao,
    e apos isso voce retorna uma funcao que tem um parametro,
    sendo esse parametro a classe
*/
function exemploDecorator2(texto:string,numero:number){
    /* 
        Uma funcao decorator retorna uma funcao, o parametro
        `_` dessa funcao faz alusao a classe. A funcao interna
        eh o retorno.
    */
    return function interna(_:Function):void{
        console.log(texto);
        console.log(numero);
        console.log(_);
    }
    /*
        A regra eh, se tem parametro, precisa usar argumentos
        a funcao decoradora precisa retornar uma funcao, e essa
        funcao que sera retornada, deve ter um parametro, como
        a funcao interna acima.
    */
    
}