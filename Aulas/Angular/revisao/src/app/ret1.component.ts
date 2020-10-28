import { Component} from '@angular/core';
@Component({
    selector: 'ret1',
    template:"<div class='visual'>{{valor}}<div>",
    styles:['.visual{background-color:red;color:white;font-size:24px;width:100%;border:2px solid black}']
})
export class AppRet1{
    public valor:string = "valor1";   
}