import { Component} from '@angular/core';
@Component({
    selector: 'ret2',
    template:"<div class='visual'>{{valor}}<div>",
    styles:['.visual{background-color:green;color:white;font-size:24px;width:100%;border:2px solid black}']
})
export class AppRet2{
    public valor:string = "valor2";
}