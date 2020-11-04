import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product:Product;
  constructor(
    private productService:ProductService,
    private router:Router,
    private param:ActivatedRoute
  ) { }

  ngOnInit() {
    const id:number = Number.parseInt(
      this.param.snapshot.paramMap.get('id')
    );
    this.productService.readById(id).subscribe(
      p => this.product = p,
      console.error
    );
  }

  updateProduct():void{
    this.productService.update(this.product)
    .subscribe(
      p => this.productService.showMessage(`Produto ${p.name} foi atualizado!`),
      console.error,
      () => this.router.navigate(['/products'])
    );
  }

  cancel():void{
    this.router.navigate(['/products']);
  }
}
