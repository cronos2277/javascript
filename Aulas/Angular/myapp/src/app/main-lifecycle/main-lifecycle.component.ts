import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-lifecycle',
  templateUrl: './main-lifecycle.component.html',
  styleUrls: ['./main-lifecycle.component.css']
})
export class MainLifecycleComponent implements OnInit {
  private foods:string[] = ["Rice","Beans","Pizza"];
  constructor() { }

  ngOnInit() {
  }

}
