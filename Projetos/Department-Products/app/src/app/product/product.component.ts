import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {Product} from "../product";
import { DepartmentService } from '../department.service';
import { Department } from '../department';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('form',null) form: NgForm;
  productForm:FormGroup = this.fb.group({
    _id: [null],
    name: ['',[Validators.required]],
    stock: [0,[Validators.required, Validators.min(0)]],
    price: [0,[Validators.required, Validators.min(0)]],
    departments:[[],[Validators.required]]
  });

  private unsbscribe$:Subject<any> = new Subject<any>()
  constructor(
      private productService:ProductService, 
      private fb:FormBuilder,
      private departmentService:DepartmentService,
      private snackbar:MatSnackBar
      ) { }

  products:Product[] = [];
  departments:Department[] = [];
  ngOnInit() {
    this.productService.get().pipe(
      takeUntil(this.unsbscribe$)
    ).subscribe(
      prods => this.products = prods
      );
    this.departmentService.get().pipe(
      takeUntil(this.unsbscribe$)
    ).subscribe(deps => this.departments = deps);
  }

  ngOnDestroy(){
    this.unsbscribe$.next();
  }

  save(){
    let data = this.productForm.value;
    console.log(data);
    if(data._id != null){
      this.productService.update(data).subscribe();
    }else{
      this.productService.add(data).subscribe();
    }
    this.resetForm();
  }

  delete(p:Product){
    this.productService.del(p).subscribe(
      () => this.notify("Deleted!"),
      (err) => {
        this.notify("Error!");
        console.error(err);
      }
    );
  }

  edit(p:Product){
    this.productForm.setValue(p)
  }

  notify(msg: string){
    this.snackbar.open(msg, "OK", {duration:3000});
  }

  resetForm(){
    this.form.resetForm();
  }
}
