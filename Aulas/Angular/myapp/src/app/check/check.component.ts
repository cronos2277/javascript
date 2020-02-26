import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent{

  @Input() test : string;
  public doCheck:number=0;
  private name: string = "";
  private age: number = 0;


  
  
}
