import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-http-modulo',
  templateUrl: './http-modulo.component.html',
  styleUrls: ['./http-modulo.component.css']
})
export class HttpModuloComponent implements OnInit,OnChanges{

  public busca:string;  

  /* Por padrao procure deixar o static como True se quiser acessa-lo no template */
  @ViewChild("objetoBusca",{static:true}) objBusca:ElementRef;
  private readonly url = "http://127.0.0.1:9000";
  private keyup$:Subscription;
  private http$:Subscription;

  constructor(private http:HttpClient) {}

  ngOnInit() {
    console.log(this.objBusca);   
    console.log(this.http);
    this.consult();      
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes)    
  }

  private mountQuery(param:string = ""):string{
    if(!param){
      return this.url;
    }else{
      return this.url + "/" + param;
    }
  }
  
  private consult(){  
    
    this.keyup$ = fromEvent(this.objBusca.nativeElement,"keyup").pipe(
      debounceTime(500)
    ).subscribe(
      e => {
        this.http$ = this.http.get(this.mountQuery(this.busca)).subscribe(
          gets => {
            console.log(gets);
            console.log(this.busca);
          }
        );
      }
    );    
  }

  comando(){
    console.warn(this.busca)
  }
}
