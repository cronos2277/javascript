class ExemploGatterSetter1{
    /*
        Esse recurso tambem funciona no javascript puro.
        primeiramente voce cria uma variavel, nesse caso
        foi criado a _var1, e ai um metodo get e ser para ela,
        o set eh chamado na hora que o valor da variavel eh modificada
        e o get na hora da leitura.
        primeiro repare que o get e o set substitui a palavra reservada
        function. 
        Segundo, repare que o set escreve uma variavel existente, e o
        get retorna ela, no caso voce poderia colocar uma regra de negocio
        impedindo que seja atribuido certos valores se for no set, ou 
        ajeitando a saida, se for no get por exemplo.
        Terceiro, na visao de quem esta de fora existe 2 variaveis, primeiro
        o _var1, uma vez que ela eh publica, se escrito nela, o valor eh simplesmente
        alterado, e o var1 sem o underline, o var1 se comporta como uma variavel normal,
        mas se atribuido valor, ela executa o set e nesse caso o set apenas escreve
        na variavel _var1, apenas se o valor for maior que zero, uma vez que a mesma
        vai executar as instrucoes contidas ali dentro. Caso seja leitura chamara o get,
        e o mesmo tambem sera chamado caso se deseje ler o valor da variavel.
        Quarto, diferente das linguages orientadas a objeto, o valor de set eh atribuido
        como se fosse atribuido a qualquer variavel, como nesse exmplo abaixo:
        ///////getterSetter1.var1 = 10; => Seria na pratica: getterSetter1.setVar1(10)
        Nessa linha acima, existe um get e um set para a var1, no caso como estamos tentando
        colocar o valor 10 nesse atributo, sera executado o set, uma vez que existe o set com
        esse nome, eh valido lembrar que nao eh permitido ter um set e um get com o nome de 
        um atributo existente, por isso _var1 e var1, o get e o set pode ter o mesmo nome,
        mas nem o get e nem o set podem ter o nome de uma variavel existente. Repare que 
        o set eh executado quando voce tenta passar um valor a ela. Ou seja o setter assim
        como o getter eh acessado como uma variavel. Agora com o getter.
        ////// console.log(getterSetter1.var1); => Seria na pratica: getterSetter1.getVar1().
        repare que o getter na hora da definicao tem o mesmo nome que o set, porem o nome
        tanto de get quando de set eh diferente da variavel ao qual fazem referencia.
        Quinto, funciona de maneira semelhante no javascript puro, mas para isso precisa
        tirar os recursos adicionais do TS do codigo.
    */

    //Nao eh ela que eh chamada na execucao, mas sera ela a ser usada indiretamente pelo
    //get e set.
    public _var1:number = 0;

    //Assim se faz um get, estrutura no TypeScript.
    public get var1():number{
        console.log("Esse metodo sera chamado na hora da leitura da var1");
    //Ela esta retornando o _var1 caso a regra de negocio seja verdadeira.    
        return this._var1; 
    }

    //Assim se faz um set, estrutura no TypeScript.
    public set var1(var_a:number){
        let n = (var_a > 0)?var_a:0;
        console.log("Esse metodo sera chamado na hora da escrita da var1");
    //o set apenas colocara o valor informado se for maior que zero, do contrario 
    //fara nada, uma vez que essa eh a regra de negocio.    
        this._var1 = n;
    }
} 

const getterSetter1 = new ExemploGatterSetter1();
//Em operacoes desse tipo que sera chamado o set,
//repare que esta sendo chamado var1 ou seja o nome informado no set
//e nao _var1
getterSetter1.var1 = 10;
//Em operacoes desse tipo se chama o get, 
//repare que esta sendo chamado o var1 ou seja o nome informado no get
//e nao _var1
console.log(getterSetter1.var1);
//Getter e setter podem ter nomes diferentes, mas nao eh o comum.
/*
    Getter e setter no javascript tem um comportamento muito mais
    parecidos com os ponteiros no C, ou seja referenciando outras variaveis
    do que os getter e setter de um Java por exemplo.
*/