import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './models/product.model';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataFromServer:any[] = [
    {id:1, name:"laptop", department_id:4, price:4000, description: "laptop product"},
    {id:2, name:"Shirt", department_id:1, price:10, description: "laptop product"},
    {id:3, name:"Polo", department_id:1, price:50, description: "laptop product"},
    {id:4, name:"Mouse", department_id:3, price:40, description: "laptop product"},
  ];
  private products:Product[] = [];
  private nextID:number;
  onNewProduct:EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private departmentService:DepartmentService) {
    for(let p of this.dataFromServer){
      this.products.push(
        {
          id:p.id,
          name:p.name,
          description: p.description,
          price:p.price,
          department: this.departmentService.getDepartmentById(p.id)
        });
        this.nextID = p.id+1;
    }
    
  }
  public getProducts():Product[]{
    return this.products;
  }

  public addProduct(product:Product):void{
    let newProduct:Product = {id:this.nextID++,...product};
    this.products.push(newProduct);
    console.log(this.products);
    this.onNewProduct.emit(newProduct);
  }
}
