
    /*
    O bind serve justamente para mudar o comportamento this,
    ou seja em qualquer lugar que for referenciado o this
    sera chamado o objeto passado como parametro no bind();
    por exemplo funcao.bind(obj1), significa que todas vez
    que aparecer um this dentro da funcao, o objeto referenciado
    sera o obj, um exemplo mais claro:
    */
    function bindF(){      
    //Aqui temos uma referencia do this dentro do console.log();
    //quando a funcao bind for chamada, o parametro do bind ficara
    //no lugar desse this      
        console.log(this); 
    }
    //A bind tem um retorno e nesse caso esta sendo armazenada no thisExemplo1
    //repare que esta sendo passada uma string como parametro do bind(),
    //ou seja quando for executado a funcao thisExemplo1, o this de dentro
    //da funcao vai ser substituido por essa string.
    const thisExemplo1 = bindF.bind('ola mundo');
    thisExemplo1(); //Aqui devera ser exibido o 'ola mundo'.
    //lembrando sempre que o bind, nao eh compativel com funcoes arrow.
    //no caso de funcao arrow o bind eh ignorado.
    //Assim como foi colocado uma string 'ola mundo' poderia ter tambem
    //um objeto, um numero ou qualquer coisa.


