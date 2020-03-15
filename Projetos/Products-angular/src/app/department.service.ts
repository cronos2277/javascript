import { Injectable } from '@angular/core';
import { Department } from './models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }
  private departments:Department[] = [
    {id:1,name:"Clothing"},
    {id:2,name:"Books"},
    {id:3,name:"Eletronics"},
    {id:4,name:"Computers"}
  ];
  private nextID:number = 5;
  public getDepartments():Department[]{
    return this.departments;
  }

  public addDepartment(department:Department):void{
    this.departments.push({id:this.nextID++, ...department});
    console.log(this.departments);
  }

  public getDepartmentById(id:number):Department{
    return this.departments.find(d => d.id == id);
  }
}
