import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Product } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseurl:string = 'http://localhost:3001/products';
  constructor(private snackBar:MatSnackBar, 
    private http:HttpClient) { }

  showMessage(msg: string,isError:boolean = false):void{
    this.snackBar.open(msg, 'Fechar', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition:"top",
      panelClass: isError?['msg-error']:['msg-success']
    });
  }

  errorHandler(e:any,msg:string):Observable<any>{
    console.error(e);        
    this.showMessage(msg,true);
    return EMPTY;
  }

  create(product:Product):Observable<Product>{
    return this.http.post<Product>(this.baseurl,product)
    .pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e,'Ocorreu um erro ao inserir!'))
    );
  }

  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseurl).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e,'Ocorreu um erro ao carregar os dados!'))
    );
  }

  readById(id:number):Observable<Product>{
    const url = this.baseurl+'/'+id;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e,'Ocorreu um erro ao procurar ID!'))
    )
  }

  update(product:Product):Observable<Product>{
    const url = this.baseurl+'/'+product.id;
    return this.http.put<Product>(url,product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e,'Ocorreu um erro ao atualizar!'))
    )
  }

  delete(id:number):Observable<Product>{
    const url = this.baseurl+'/'+id;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e,'Ocorreu um erro ao excluir!'))
    )
  }
}
