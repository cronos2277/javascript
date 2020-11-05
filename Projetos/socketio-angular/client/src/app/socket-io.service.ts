import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as socketio from 'socket.io-client';
import { Message } from './message';
@Injectable({
  providedIn: 'root'
})
export class SocketIoService{

  private readonly ip:string = 'localhost';
  private readonly tcp:string = '4444';
  private readonly url:string =`http://${this.ip}:${this.tcp}`;  
  private socket = socketio(this.url);
  private subjectMessages:Subject<Message> = new Subject<Message>(); 

  constructor() {        
    this.socket.on('message',(msg:Message) => this.subjectMessages.next(msg));
  }

  public send(msg:Message):void{
    this.socket.emit('message',msg);
  }

  public messages():Observable<Message>{
    return this.subjectMessages.asObservable();
  }
}
