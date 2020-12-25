import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public bgColor:string = 'light';
  public selectColor:string = 'light';
  public random:number = Math.round(Math.random() * (9 - 1) + 1);
  public selectInterface = 'alert';
  public checkbox:string;    
  public toggle:boolean = true;
  public radio:string;
  public agora = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()       
        ).toDateString();
  
  constructor() {}

  public changeBgColor(color:string):void{
    this.bgColor = color;
  }

  public selectBlurFocus(bool:boolean):void{
    if(bool){
      this.selectColor = 'dark';      
    }
    else{
      this.selectColor = 'light';      
    }
  }

  public message(value):void{
    console.log(value, this.agora);    
  }

  public segmentChanged(value):void{
    console.log(value)
  }

  public search(value):void{
    console.log("Evento de busca:",value);
  }

}
