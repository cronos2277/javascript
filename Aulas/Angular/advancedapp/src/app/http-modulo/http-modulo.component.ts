import { Component, OnInit, ViewChild, ElementRef, SimpleChanges, Input, DoCheck} from '@angular/core';
import {debounceTime, mergeMap, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subscription, fromEvent, interval, timer, Observable } from 'rxjs';

@Component({
  selector: 'app-http-modulo',
  templateUrl: './http-modulo.component.html',
  styleUrls: ['./http-modulo.component.css']
})
export class HttpModuloComponent implements OnInit{

  public busca:string;  

  /* Por padrao procure deixar o static como True se quiser acessa-lo no template */
  @ViewChild("objetoBusca",{static:true}) objBusca:ElementRef;
  private readonly url = "http://127.0.0.1:9000";
  private results$;
  public isServerOnline:Boolean;
  

  constructor(private http:HttpClient) {
    
  }

  ngOnInit() {          
    console.log(this.http);
    this.checking();
    this.consult();      
  }

  private mountQuery(param:string = ""):string{
    if(!param){
      return this.url;
    }else{
      return this.url + "/" + param;
    }
  }
  
  private checking(){
    let check:Observable<any> = timer(0,500);
    check = check.pipe(
      mergeMap(
        () => this.http.get(this.mountQuery("@"))
      )
    );

    const inscricao:Subscription = check.subscribe(
      _ok => this.isServerOnline = true,
      _erro => {
          this.isServerOnline = false;
          console.error("Desconectado do servidor");
      }
    );

    const intervalo = setInterval(
      () => {
        if(inscricao.closed){
          inscricao.unsubscribe();
          clearInterval(intervalo);
        }
      }
    );
  }

  private consult():void{        
    this.results$ = fromEvent(this.objBusca.nativeElement,"keyup");
    this.results$ = this.results$.pipe(
      debounceTime(500),
      switchMap(
        () => this.http.get(this.mountQuery(this.busca))
      )
    );    
  }

  comando(){
    console.warn(this.isServerOnline)
  }
}
