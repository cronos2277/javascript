import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Person} from './person';
import { Product } from './product';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {  
  readonly url:string = 'http://localhost:3030/api';
  constructor(private http:HttpClient) { }

  public getPeople():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.url}/people`)
    .pipe(catchError(e => throwError(e)));
  }

  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/products`)
    .pipe(catchError(e => throwError(e)));
  }
}
