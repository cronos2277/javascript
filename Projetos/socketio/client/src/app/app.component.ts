import { Component } from '@angular/core';
import {SocketIoService} from './socket-io.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nickname:string;
  message:string;

  constructor(
    private socket:SocketIoService
  ){}

  ngOnInit(){
    this.socket.messages().subscribe(
      console.log
    );
  }

  public send():void{
    this.socket.send({
      message:this.message,
      from:this.nickname
    });
    this.message = '';
  }
}
