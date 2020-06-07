import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-observables-rxjs-avancado',
  templateUrl: './observables-rxjs-avancado.component.html',
  styleUrls: ['./observables-rxjs-avancado.component.css']
})
export class ObservablesRxjsAvancadoComponent implements OnInit, OnDestroy {

  constructor() { }  
  public cima:number = 3700;
  public esquerda:number = 40;

  public mousedown$:Subscription;
  public mousemove$:Subscription;
  /* 
    ViewChild pode servir como um seletor do javascript,
    no caso ele pega o elemento que tem o atributo
    #arrastavel, fazendo acesso ao elemento DOM da
    maneira mais performatica possivel. Aqui estamos usando
    o ElementRef
   */
  @ViewChild('arrastavel', {static:true}) elemento:ElementRef;

  
  ngOnInit() {    

    /*
      O ElementRef tem um atributo dentro dele, chamado
      nativeElement, que eh o no html pelo pelo seletor
      do ViewChild
    */
    console.log(this.elemento.nativeElement);    
    let mousedown = fromEvent(this.elemento.nativeElement,"mousedown");
    let mousemove = fromEvent(document,"mousemove");
    let mouseup = fromEvent(document,"mouseup");    

    this.mousedown$ = mousedown.subscribe(
      (mouse:MouseEvent) => {  
        let mouseDownX = mouse.pageX;      
        let mouseDownY = mouse.pageY;              
        this.mousemove$ = mousemove.pipe(
          takeUntil(mouseup) //O criterio de parada eh o takeuntil do moseup.
        ).subscribe(
          (evento:MouseEvent) => {
            let offsetX = mouseDownX - evento.screenX;
            let offsetY = mouseDownY - evento.screenY;
            this.cima -= offsetY;
            this.esquerda -= offsetX;
            mouseDownX = evento.screenX;
            mouseDownY = evento.screenY;            
          }          
        );
      },
      error => console.error("erro"+error),
      () => console.warn("MouseDown Concluido")
    );    
  }

  ngOnDestroy(){ //Eh sempre bom desiscrever os subscriptions no onDestroi
    this.mousedown$.unsubscribe();
    this.mousemove$.unsubscribe();
  }

  voltar(){
    this.cima = 3700;
    this.esquerda = 40;
  }
}
