import { Component, OnInit } from '@angular/core';
import {DepartmentService} from '../department.service';
@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  public depName:string;
  constructor(private service: DepartmentService) { }

  public save():void{
    this.service.addDepartment({      
      name:this.depName
    });
    this.clear();
  }

  public clear():void{
    this.depName = "";
  }

  ngOnInit() {
  }

}
