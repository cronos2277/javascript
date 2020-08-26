import { Component, OnInit } from '@angular/core';
import { Template } from './entity.model';
import { Store, select } from '@ngrx/store';
import { StateInterface,count,last } from './entity.state';
import { Observable } from 'rxjs';
import { ActionNew, ActionAll, ActionUpdate, ActionDelete } from './entity.actions';

@Component({
  selector: 'app-ngrx-entity',
  templateUrl: './ngrx-entity.component.html',
  styleUrls: ['./ngrx-entity.component.css']
})
export class NgrxEntityComponent implements OnInit {
  quantity$;
  constructor( private store:Store<StateInterface>) { }

  ngOnInit() {
    this.quantity$ = this.store.select(count);
  }

}
