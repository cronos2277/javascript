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