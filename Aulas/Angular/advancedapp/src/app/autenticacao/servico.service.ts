import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {User} from './User.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {  
  readonly url:string = 'http://localhost:3030/';  
  constructor(private http:HttpClient) { }

  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}`)
    .pipe(        
      tap(e => console.log(e)),
      catchError((e:HttpErrorResponse) => {          
          return throwError(e);          
        }
      )
    );    
  }

  public register(user:User):Observable<User>{
    return this.http.put<User>(`${this.url}`,user);
  }

  
} 
  

