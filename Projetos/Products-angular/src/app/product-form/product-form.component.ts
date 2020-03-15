import { Component, OnInit } from '@angular/core';
import {Department} from '../models/department.model';
import { ProductService } from '../product.service';
import { DepartmentService } from '../department.service';
import { Product } from '../models/product.model';

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
  public products:Product[];
  constructor(private service:ProductService, private departmentService:DepartmentService) { 
    this.departments = this.departmentService.getDepartments();
  }

  ngOnInit() {
  }

  public save():void{
    this.service.addProduct({
      name:this.name,
      description:this.description,
      price:this.price,
      department:this.department,
    });
    this.products = this.service.getProducts();
    console.log(this.products);
    this.clear();
  }

  public clear():void{
    this.name="";
    this.description="";
    this.price = 0;
    this.department = null;
  }

}
