//Quando for criar um componente no Angular, importe isso.
import { Component } from "@angular/core";
/*
    Preste a atenção com relação aos nomes dos componentes, 
    inicialmente temos o mesmo deve seguir a seguinte ordem:
    nome.oque eh.extensao, no caso aqui temos:
    mybasic.components.ts
*/

@Component({
    selector: 'mybasic', //Aqui o seletor html, no caso como ele sera usado, nesse caso sera <mybasic></mybasic>. Leia mais abaixo.
    template: `<H2>Meu Componente Basico</H2>`, //Essa seria uma forma de voce colocar um html mais simples.
    styles:[`*{color:red}`] //Aplicando estilo ao componente, detalhe, quando declarado aqui, ele tera o escopo apenas do componente.
})
export class MyBasicComponent{
    /* 
        A notacao do angular para a classe eh:
    O nome do componente em camelcase com o que ele eh,
    no caso temos: "MyBasic"Component, o que esta entre
    aspas duplas eh o nome da classe, o que esta fora
    eh a identificacao do componente no Angular.
    */
}
/*
    Quando for aplicar estilo, da forma mencionada acima, lembre-se de colocar todo o css, dentro da string, que por sua vez 
    estara dentro de um array. Os estilos dentro das strings sao carregados na ordem que foram declarados, no caso comecando
    no indice 0 do array string. Geralmente apenas estilos mais simples sao declarados dessa forma, o que tambem vale para o HTML
    essa ultima observacao.
    Sobre seletores, se estiver dentro de colchetes, como nesse caso [mybasic], nos temos uma diretiva, que seria um atributo do html,
    se tivesse um '.' por exemplo, esse seletor seria uma classe, e por ai vai seguindo os padroes css e js. Nesse caso o mybasic
    eh uma tag html, uma vez que tag eh referenciado dessa forma.
*/