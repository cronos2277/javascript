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
    templateUrl: './mycomposite.components.html'
})
export class MyCompositeComponent{
   
}