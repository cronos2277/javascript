import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Router} from '@angular/router';
import { Product } from '../product.model';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product:Product = {
    name: '',
    price: null
  }

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit() {
    
  }

  createProduct():void{
    this.productService.create(this.product)
    .subscribe(
      p => this.productService.showMessage(`${p.name} criado com sucesso!`),
      console.error,
      () => {
        this.product.name = '';
        this.product.price = null;        
      }
    )
    
  }

  cancel():void{
    this.router.navigate(['/products']);
  }
}
