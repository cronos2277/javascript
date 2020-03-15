import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  public depName:string;
  constructor() { }

  public save():void{

  }

  public clear():void{

  }

  ngOnInit() {
  }

}
