import { Component, OnInit } from '@angular/core';
import {Department} from '../models/department.model';

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
  constructor() { }

  ngOnInit() {
  }

  public save():void{

  }

  public clear():void{

  }

}
