    //Olhe o arquivo mybasic.components.ts para uma explicacao mais basica
import { Component } from "@angular/core";

@Component({
    selector: 'mycomposite', 
    /*
        o templateUrl ja eh mais recomendado quando se tem um 
        template html mais complexo. Diferente da tag tamplate,
        ao qual voce coloca direto o html, aqui voce referencia
        um arquivo html.
    */
    templateUrl: './mycomposite.components.html',
    /*
        Aqui eh referenciado um style externo.
    */
    styleUrls:['./mycomposite.components.css'],
})
export class MyCompositeComponent{
   
}

/*
    Eh sempre valido lembrar que o styleUrls aceita apenas
    um array de String, validacao feita pelo typescript inclusive,
    comecando a carregar apartir do indice zero do array e carregando
    na sequencia que for declarado.
*/