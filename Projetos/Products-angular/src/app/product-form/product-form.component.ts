import { Component, OnInit } from '@angular/core';
import {Department} from '../models/department.model';
import { ProductService } from '../product.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public name:string;
  public department:Department;
  public price:number;
  public description:string;
  public departments:Department[];
  constructor(private service:ProductService, private departmentService:DepartmentService) { 
    this.departments = this.departmentService.getDepartments();
  }

  ngOnInit() {
  }

  public save():void{

  }

  public clear():void{

  }

}
