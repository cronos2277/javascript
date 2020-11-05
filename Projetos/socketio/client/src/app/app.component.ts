import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from './message';
import {SocketIoService} from './socket-io.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  nickname:string;
  message:string;
  messages:Message[] = [];
  private subscription:Subscription;

  constructor(
    private socket:SocketIoService
  ){}

  ngOnInit(){
    this.subscription = this.socket.messages().subscribe(
      msg => this.messages.push(msg),
      console.error
    );
  }  

  public send():void{
    this.socket.send({
      message:this.message,
      from:this.nickname
    });
    this.message = '';
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
