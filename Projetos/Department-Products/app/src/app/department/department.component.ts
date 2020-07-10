import { Component, OnInit } from '@angular/core';
import { Department } from '../department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  depName:String = "";
  departments: Department[] = [{name:"dep1"},{name:"dep2"}];
  constructor() { }

  ngOnInit() {
  }

  save(){

  }

  cancel(){

  }

  edit(dep:Department){

  }

  delete(dep:Department){
    
  }

}
