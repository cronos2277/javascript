import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private router:Router,
    private param:ActivatedRoute
  ) { }

  product:Product;

  ngOnInit() {
    const id = Number.parseInt(
      this.param.snapshot.paramMap.get('id')
    );
    this.productService.readById(id)
    .subscribe(
      p => this.product = p,
      console.error
    )
  }

  deleteProduct():void{
    if(confirm(`Deseja realmente excluir '${this.product.name}' ?`)){
      this.productService.delete(this.product.id)
      .subscribe(
        _ => this.productService.showMessage(`Produto ${this.product.name} excluído com sucesso!`),
        console.error,
        () => this.router.navigate(['/products'])
      );
    }
  }

  cancel(){
    this.router.navigate(['/products']);
  }
}
