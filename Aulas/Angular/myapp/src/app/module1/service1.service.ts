//Esse modulo precise ser importado caso voce queria trabalhar com injecao de dependencia
import { Injectable } from "@angular/core";

@Injectable() //Aqui voce indica que o Angular pode injetar essa classe nas outras
export class Service1 {
    /*
        Um servico no angular eh uma classe injetavel. Ou seja ao inves de voce instanciar
        um objeto do tipo service 1 a cada requisicao, voce apenas instancia uma vez e 
        aproveita essa mesma instancia quando houver qualquer nova requisicao.
    */
    public num: number; //O Atributo num, sera o atributo que todos os componentes que o requisitam irao usar.
    constructor() {
        /*
        Esse atributo num eh gerado randomicamente quando um objeto eh instanciado, repare que sera apenas,
        um numero randomico para todas as instancias, lembrando um atributo estatico, porem diferente do
        mesmo, esse eh um atributo de classe. Perceba olhando o console.log, na secao de:
        "Servicos exemplo de funcionamento",
        quando voce habilita o primeiro componente, o mesmo exibe: 
        "Service1 - constructor() service1.service.ts:12:16 
        Service 2 - constructor()",
        uma vez exibida essa mensagem, independente de quantos componentes voce habilite naquela secao, ou 
        por mais que voce desabilite todos, o numero gerado randomicamente nao se altera, deixando claro
        que o mesmo foi instanciado apenas umas vez, sendo que tanto o numero randomico assim como a mensagem
        acima sao exibidas apenas quando o objeto eh instanciado.
        Para se criar um servico, voce precisa importar o Injectable e implementar a mesma como uma anotacao
        de classe, assim o angular entendera que essa classe pode ser injetavel. Alem disso o nome do arquivo
        ao qual contem essa classe decorada com essa anotacao, deve ter a seguinte nomenclatura:
        "suaClasseEmMinusculo.service.ts" -> Apenas nao esqueca que esse arquivo eh uma classe decorada com o 
        @Injetable.
        */
        this.num = Math.round(Math.random()*1000);
        console.log('Service1 - constructor()')
    }
}