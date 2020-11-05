import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren,AfterViewInit } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { Message } from './message';
import {SocketIoService} from './socket-io.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{
  nickname:string;
  message:string;
  messages:Message[] = [];
  private subscription:Subscription;
  private moving:Subscription;

  @ViewChild(MatList, {read:ElementRef, static:true}) list:ElementRef;
  @ViewChildren(MatListItem) listItems:QueryList<MatListItem>;

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

  ngAfterViewInit(){
    this.moving = this.listItems.changes.subscribe(
      _ => this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.moving.unsubscribe();
  }
}
