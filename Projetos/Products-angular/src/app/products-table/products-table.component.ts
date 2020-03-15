import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductTableComponent implements OnInit {

  public products:Product[];
  public prodColumns:string[] = ["id","prodname","price","description","department"]; 
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
