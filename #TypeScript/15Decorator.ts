/*
    Dessa maneira abaixo voce tem acesso ao recurso de construtor
    no javascript, inicialmente voce precisa habilitar no arquivo
    de coniguracao do typescript o "tsconfig.json" o suporte a 
    esse recurso, e por fim criar uma funcao para esse recurso.
    Acima da classe voce coloca a notacao '@' com um nome, e apos
    isso voce cria uma funcao para essa anotacao que voce criou.
    Resumindo, um decorator intecepta a classe na hora da instanciacao
    e a modifica de acordo com a funcao decoradora, que eh a funcao
    como o mesmo nome do que a funcao que tem um @.
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
    //Aqui sera impresso a classe, lembrando que uma classe no JS
    //eh uma funcao.    
        console.log(_); 
    }
    /*
        A regra eh, se tem parametro, precisa usar argumentos
        a funcao decoradora precisa retornar uma funcao, e essa
        funcao que sera retornada, deve ter um parametro, como
        a funcao interna acima.
    */
    
}

/*
    Aqui no terceiro exemplo, temos um exemplo mais resumido,
    do exemplo2 acima.
*/
@exemploDecorator1 //Voce pode colocar multiplos decoradores
@exemploDecorator3("NOME",0)
class Decorator3{    
    constructor(public var1:string){        
        console.log(var1);
    }
}

function exemploDecorator3(name:string,numero:number){
     return function(_:Function){}     
     //Essa funcao nao fara nada.
}
/*
    Como a mesma tem argumentos, precisa retornar uma funcao,
    que tenha um argumento, contendo dentro desse ultimo a classe.
*/
new Decorator3("exemplo");

class Decorator4{
    @decoratorAtributo //Atribuindo decorador em atributo.
    public atributo:string = "Valor do atributo";

    @decoradorMetodo //Atribuindo decorador em metodo.
    public metodo():void{
        console.log('regras de negocios');
    }

    public metodoParam(@params1rule x:string, @params1rule y:number){

    }
}
//Funcao decoradora de atributo
function decoratorAtributo(classe:any,nomeAtributo:string):any{
    /* 
        A funcao  de decorador de atributo, e o mesmo tem a seguinte assinatura:
        2 argumentos, o primeiro sendo a classe do tipo any, e o segundo o nome do atributo,
        com esses dois parametros voce pode fazer a sua regra de negocio, usando
        o primeiro caso voce queira fazer checagem de valores e implementar uma 
        restricao, e o segundo que faz referencia ao nome do atributo, independente
        do uso a assinatura deve ter 2 argumentos, e nao deve ter retorno e em caso de
        retorno o mesmo deve retornar do tipo any. Essa funcao por exemplo nao tem retorno
    */
   console.log('-----------------------');    
    console.log('Decorator em Atributos');    
    console.log("valor de classe: ",classe);    
    console.log("Nome do atributo: "+nomeAtributo);
    console.log('-----------------------');        
}

function decoradorMetodo(classe:any,nomePropriedade:string,descricao:PropertyDescriptor):any{
    /*
        semelhante ao decorador de objeto, os dois primeiros parametros sao identicos, assim
        como o retorno. O que difere aqui seria o terceiro parametro, que permite com que 
        voce modifique certas estruturas do comportamento do metodo, que seria a descricao,
        essa descricao eh um objeto que contem os seguintes atributos:
            {
                value: [Function], //Valor
                writable: true, //Pode ser reescrito?
                enumerable: true, //Pode ser exibido, no console.log por exemplo.
                configurable: true //Pode ter atributos modificados?
            }
    */
    
    console.log(descricao);
}
function params1rule(classe:any,nomeDoMetodo:string,posicaoDoatributo:number){
    /*
        O primeiro atributo refencia a classe, o segundo o nome do metodo,
        ao qual tem como assinatura esse parametro, e o terceiro parametro,
        refere-se a posicao do parametro, nesse caso temos:
            public metodoParam(x:string, @params1rule y:number){}
            repare que no codigo acima, o @param1rule esta sendo usado no segundo
            parametro, logo o terceiro parametro retorna o valor 1, se no caso
            esse decorador estivesse no primeiro parametro retornaria zero.
            No caso voce nao precisa usar essa anotacao em apenas um parametro,
            nesse exemplo esta sendo usado nos dois parametros.
    */
    console.log("---------------------------");
    console.log(nomeDoMetodo);
    console.log(posicaoDoatributo);
    console.log("---------------------------");
}