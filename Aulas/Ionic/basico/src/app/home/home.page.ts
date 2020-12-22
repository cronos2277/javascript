import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public bgColor:string = 'light';
  public selectColor:string = 'light';
  private random:number = Math.round(Math.random() * (9 - 1) + 1);
  public selectInterface = 'alert';
  
  constructor() {
    console.log(this.random)
  }

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
    console.log(value);
    console.log('interface:', this.selectInterface)
  }
}
