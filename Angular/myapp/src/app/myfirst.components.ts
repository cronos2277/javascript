import { Component } from "@angular/core";

/*
    Preste a atenção com relação aos nomes dos componentes, 
    inicialmente temos o mesmo deve seguir a seguinte ordem:
    nome.oque eh.extensao, no caso aqui temos:
    myfirst.components.ts
*/

@Component({
    selector: 'myfirst',
    template: `<h1>My First Component</h1>`
})
export class MyFirstComponent{
    /* 
        A notacao do angular para a classe eh:
    O nome do componente em camelcase com o que ele eh,
    no caso temos: "MyFirst"Component, o que esta entre
    aspas duplas eh o nome da classe, o que esta fora
    eh a identificacao do componente no Angular.
    */
}