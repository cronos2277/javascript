import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServService {
  public observable$ = of([0,1,2,3,4,5,6,7,8,9]);
  constructor(private http:HttpClient) { }

  public getIp():Observable<any>{    
    return this.http.get('http://ip.jsontest.com/');
  }

  public post():Observable<any>{
    return this.http.post('http://headers.jsontest.com/',{valor1:'valor1',valor2:'valor2'})
    .pipe(
        tap(e => console.log(`%c Origem da requisicao: ${e['Origin']}`,'background-color:black;color:white')),
        tap(e => console.log(`%c Navegador: ${e['User-Agent']}`,'background-color:black;color:white'))
        );
  }
}
