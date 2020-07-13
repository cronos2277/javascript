import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Product } from './product';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DepartmentService } from './department.service';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly url = "http://localhost:3027/products";
  private productSubject$:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded:boolean = false;
  constructor(private http:HttpClient, private departmentService:DepartmentService) { 
    
  }

  get():Observable<Product[]>{   
    if(!this.loaded){      
      combineLatest(
        this.http.get<Product[]>(this.url),
        this.departmentService.get()
      ).pipe(
        map(([products,departments]) => {
          for(let p of products){            
              let ids = (p.departments as string[]);            
              p.departments = ids.map((id)=>departments.find(dep=>dep._id==id));         
            
          }
          return products;
        }),
        tap(products => console.log(products))
      ).subscribe(
        this.productSubject$
      );
      this.loaded = true;
    }
    return this.productSubject$.asObservable();
  }

  add(prod:Product):Observable<Product>{
    let departments = (prod.departments as Department[]).map(d => d._id);
    return this.http.post<Product>(this.url, {...prod, departments:departments})
    .pipe(
      tap((p) => {
        this.productSubject$.getValue().push({...prod, _id:p._id})
      })
    );
  }

  del(prod:Product):Observable<any>{
    return this.http.delete(`${this.url}/${prod._id}`)
    .pipe(
      tap(() => {
        let products = this.productSubject$.getValue();
        let i = products.findIndex(p => p._id === prod._id);
        if(i>0){
          products.splice(i,1);
        }
      })
    );
  }
  update(prod:Product):Observable<Product>{
    let departments = (prod.departments as Department[]).map(d => d._id);
    return this.http.patch<Product>(`${this.url}/${prod._id}`, {...prod, departments})
    .pipe(
      tap(() => {
        let products = this.productSubject$.getValue();
        let i = products.findIndex(p => p._id === prod._id);
        if(i>0){
          products[i] = prod;
        }
      })
    );
  }
}
