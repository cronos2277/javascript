import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {debounceTime, mergeMap, switchMap, retry} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subscription, fromEvent, timer, Observable } from 'rxjs';

@Component({
  selector: 'app-http-modulo',
  templateUrl: './http-modulo.component.html',
  styleUrls: ['./http-modulo.component.css']
})
export class HttpModuloComponent implements OnInit{

  public busca:string;  

  /* Por padrao procure deixar o static como True se quiser acessa-lo no template */
  @ViewChild("objetoBusca",{static:true}) objBusca:ElementRef;  
  @ViewChild("novo_ultimo_nome",{static:true}) novo_ultimo_nome:ElementRef;
  @ViewChild("novo_email",{static:true}) novo_email:ElementRef;
  @ViewChild("novo_cidade",{static:true}) novo_cidade:ElementRef;
  @ViewChild("novo_pais",{static:true}) novo_pais:ElementRef;
  @ViewChild("tbody",{static:true}) tbody:ElementRef;
  private readonly url = "http://127.0.0.1:9000";
  private results$;
  public isServerOnline:Boolean;
  
  /*
    HttpClient => Essa classe pode criar um observer com base no metodo HTTP, almejado.
    Por exemplo ele contem um metodo get e post que faz a conexao via backend com o
    servidor. No caso temos o get(Parametro). Aonde esta o parametro voce passa a
    url com a devida porta para conexao junto com os parametros, se necessario.
    Os metodos que os objetos dele tem retornam um observable.
    No caso aqui esta sendo pego pela injecao de dependencia, para pegar essa classe
    voce precisa importar aqui:  import { HttpClient } from '@angular/common/http';
    e tambem importar no app.module.ts: import { HttpModuloComponent } from './http-modulo/http-modulo.component';
    Tambem nao esqueca de colocar o HttpClientModule no imports la no app.module.ts
  */
  constructor(private http:HttpClient) {
    this.isServerOnline = true;        
  }

  ngOnInit() {          
    console.log(this.http);
    this.checking();
    this.consult();      
  }
  
  private mountQuery(param:string = ""):string{
    if(!param){
      return this.url;
    }else if(/\/|\\|\*/i.test(param)){ //Evitar que certos caracteres quebrem a execucao.
      return this.url;
    }else{
      return this.url + "/" + param;
    }
  }
  
  private checking(){
    let check:Observable<any> = timer(0,500);
    check = check.pipe(
      mergeMap(
        /*
          margeMap eh um operador para lidar com
          um observable interno, No caso o http
          aqui eh um Observable, o que o margemap
          faz eh retornar um Observable com
          a devida inscricao. No caso, ele faz
          um subscription no observer http e retorna
          o mesmo inscrito. Ou seja o mergeMap 
          eh util quando voce tem que lidar com
          um observer interno, evitando assim o 
          callback hell, uma alternativa a esse
          comando seria:
          map(() => this.http.get(this.mountQuery("@")) => {
            parametro => funcao(parametro),
            erro => funcaoErro(erro),
            () => funcaoCompleta()
          })
          O mergeMap eh interessante para usar com o 
          async no modelo.
        */
        () => this.http.get(this.mountQuery("@"))        
      ),
      retry(2)      //2 tentativas de tentativa de reconexao
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
      debounceTime(100), //Da um delay, caso o usuario digite muito rapido, o texto eh ignorado.
      switchMap(
        /*
          O SwitchMap eh parecido com o MargeMap, porem o mesmo ele contem
          filtros, ou seja se ja tiver tido uma requisicao anterior ao
          Observable, ele cancela o outro observable e apenas deixa esse
          funcionando. Ele garante apenas um subscription, diferente do
          MargeMap que pode ter varios Observables rodando.
        */
        () => {          
          return this.http.get(this.mountQuery(this.busca));
        }
      )
    );    
  }
  public deleteRem(p):void{    
    const codigo = p._id;
    this.http.delete(
      this.url+"/"+p._id
    ).subscribe(
      _ => {
        document.getElementById(codigo).remove();            
        console.table(codigo+" => apagado com sucesso");
          },
      erro => console.error(erro)
    );
  }
  
  public addNew():void{            
    const novapessoa = {      
      lastname:this.novo_ultimo_nome.nativeElement.value,
      email:this.novo_email.nativeElement.value,
      city:this.novo_cidade.nativeElement.value, 
      country:this.novo_pais.nativeElement.value
    }
    console.log(novapessoa);
    this.http.post(this.url,novapessoa).subscribe(
      mensagem => {        
        const tr = document.createElement('tr');
        tr.appendChild(this.createTH(mensagem['_id']));
        tr.appendChild(this.createTH(novapessoa.lastname));
        tr.appendChild(this.createTH(novapessoa.email));
        tr.appendChild(this.createTH(novapessoa.city));
        tr.appendChild(this.createTH(novapessoa.country));        
        this.tbody.nativeElement.appendChild(tr);
      },
      erro => console.error(erro)
    );
    console.log(this.tbody.nativeElement)
  }

  createTH(valor:string){
    let th = document.createElement('th');
    th.textContent = valor;
    return th;
  }
  
}
