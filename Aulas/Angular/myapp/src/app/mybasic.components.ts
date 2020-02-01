//Quando for criar um componente no Angular, importe isso.
import { Component } from "@angular/core";
/*
    Preste a atenção com relação aos nomes dos componentes, 
    inicialmente temos o mesmo deve seguir a seguinte ordem:
    nome.oque eh.extensao, no caso aqui temos:
    mybasic.components.ts
*/

@Component({
    selector: 'mybasic', //Aqui o seletor html, a tag que sera usado, nesse caso sera <mybasic></mybasic>
    template: `<h1>Meu Componente Basico</h1>` //Essa seria uma forma de voce colocar um html mais simples.
})
export class MyBasicComponent{
    /* 
        A notacao do angular para a classe eh:
    O nome do componente em camelcase com o que ele eh,
    no caso temos: "MyFirst"Component, o que esta entre
    aspas duplas eh o nome da classe, o que esta fora
    eh a identificacao do componente no Angular.
    */
}