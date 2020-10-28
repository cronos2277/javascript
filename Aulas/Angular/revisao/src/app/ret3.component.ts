import { Component} from '@angular/core';
@Component({
    selector: 'ret3',
    template:"<div class='visual'>{{valor}}<div>",
    styles:['.visual{background-color:blue;color:white;font-size:24px;width:100%;border:2px solid black}']
})
export class AppRet3{
    public valor:string = "valor3";
}