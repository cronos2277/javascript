import { Component, OnInit } from '@angular/core';
import {Client} from '../client';

@Component({
  selector: 'app-main-lifecycle',
  templateUrl: './main-lifecycle.component.html',
  styleUrls: ['./main-lifecycle.component.css']
})
export class MainLifecycleComponent implements OnInit {
  private foods:string[] = ["Rice","Beans","Pizza"];
  private clients:Client[] = [];
  private name:string;
  private age:number;
  private food:string;
  private editClient:Client = null;
  constructor() { }

  ngOnInit() {
  }
  save(){
    if(this.editClient != null){
      //O push insere um novo registro no array.
        this.clients.push({
          name: this.name,
          age: this.age,
          food: this.food
        });
    }    
  }
}
