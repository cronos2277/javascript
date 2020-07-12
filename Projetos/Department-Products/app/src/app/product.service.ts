import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Product } from './product';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DepartmentService } from './department.service';

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
            p.departments = ids.map((id) => departments.find(dep => dep._id==id));
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
}
