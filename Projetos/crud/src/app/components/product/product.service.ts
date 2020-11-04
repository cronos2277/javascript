import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseurl:string = 'http://localhost:3001/products';
  constructor(private snackBar:MatSnackBar, 
    private http:HttpClient) { }

  showMessage(msg: string):void{
    this.snackBar.open(msg, 'Fechar', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition:"top"
    });
  }

  create(product:Product):Observable<Product>{
    return this.http.post<Product>(this.baseurl,product);
  }

  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseurl);
  }

  readById(id:number):Observable<Product>{
    const url = this.baseurl+'/'+id;
    return this.http.get<Product>(url);
  }

  update(product:Product):Observable<Product>{
    const url = this.baseurl+'/'+product.id;
    return this.http.put<Product>(url,product);
  }

  delete(product:Product):Observable<Product>{
    const url = this.baseurl+'/'+product.id;
    return this.http.delete<Product>(url);
  }
}
