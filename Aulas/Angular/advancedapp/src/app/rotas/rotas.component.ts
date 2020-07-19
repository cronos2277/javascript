import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {

  ramdomico = 0;
  constructor() {     
    this.ramdomico = Math.round(Math.random() * 100);
    console.log(this.ramdomico);
  }

  ngOnInit() {
  }

}
