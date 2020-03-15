import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-product-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductTableComponent implements OnInit {

  @ViewChild(MatTable) datable: MatTable<any>;

  public products:Product[];
  public prodColumns:string[] = ["id","prodname","price","description","department"]; 
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.onNewProduct.subscribe((p)=>{
        this.datable.renderRows();
    });
  }

}
