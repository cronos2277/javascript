import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  /*
    Outputs permite que um evento seja capturado pelo elemento
    pai, o seletor desse componente eh <app-upload>, no caso
    voce pode chamar esses eventos da sguinte forma:
    <app-upload (dropFiles)="funcaoDoPai()" 
    (resetSignal)="funcaoDoPai()" (submitSignal)="funcaoDoPai()">
    </app-upload>
    alem disso voce pode capturar o elemento valor emitido atraves
    do parametro $event, sim precisa ser esse nome, ficando assim
    essas funcoes: (resetSignal)="funcaoDoPai($event)",
    se voce quiser mudar o nome do resetSignal para um outro nome
    voce pode passar um valor aonde esta o null ou mudando o nome
    da variavel, dessa forma voce cria um evento no angular.
    O evento eh emitido quando voce chama o metodo .emit(), lembrando
    que o emit deve emitir o valor especificado dentro do diamante,
    nesse caso o dropfiles deve emitir um FileList e os outros dois
    um valor string. 
  */
  @Output(null) dropFiles = new EventEmitter<FileList>();  
  @Output(null) resetSignal = new EventEmitter<string>();
  @Output(null) submitSignal = new EventEmitter<string>();
    
  constructor() { }
  public isdragging:boolean = false;
  ngOnInit() {
  }

  public ondragover(event:DragEvent){
    /*
      Executado quando o usuario arrasta um arquivo dentro do bloco
    */
    event.preventDefault();    
    this.isdragging = true;
  }

  public ondragleave(event:DragEvent){
    /*
      Executado quando o usuario larga o botao
      do mouse.
    */
    event.preventDefault();
    console.log("Event no dragleave: ",event);
    this.isdragging = false;
  }

  public ondrop(event:DragEvent){
    /*
      Executado quando o elemento eh largado
    */
    event.preventDefault();
    console.log("Event no ondrop: ",event);
    console.log("DroppedFiles", event.dataTransfer);   
    this.dropFiles.emit(event.dataTransfer.files); 
    this.isdragging = false;        
  }
  
  /*
    Aqui estamos emitidindo o evento de reset e submit,
    no caso o resetSignal e o submitSignal, qualquer
    elemento pai que chame esse componente tem acesso
    a esses valores chamando o evento "resetSignal" e
    "submitSignal" e podendo pegar os valores passados
    aqui atraves do parametro "$event" na funcao de 
    tratamento do componente pai.
  */
  public reset(){
    this.resetSignal.emit("Reset event was triggered");
  }

  public submit(){
    this.submitSignal.emit("Submit event was triggered");
  }

}
