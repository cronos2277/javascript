import { Component, OnInit } from '@angular/core';
import { Template } from './entity.model';
import { Store, select } from '@ngrx/store';
import { StateInterface,selectIds, selectAll, selectEntities, selectTotal,templateStates,count} from './entity.state';
import { Observable } from 'rxjs';
import { ActionNew, ActionAll, ActionUpdate, ActionDelete } from './entity.actions';
import * as reducer from './entity.reducer'

@Component({
  selector: 'app-ngrx-entity',
  templateUrl: './ngrx-entity.component.html',
  styleUrls: ['./ngrx-entity.component.css']
})
export class NgrxEntityComponent implements OnInit {
  quantity$;
  constructor( private store:Store<StateInterface>) { 
    
  }

  ngOnInit() {    
    //this.quantity$ = this.store.select(selectAll);
    //console.log(reducer.initialState)
  }

  addnew(){
    this.store.dispatch(new ActionNew({template:{_id:'1',value:"",index:0}}));
    //console.log(reducer.initialState)
    this.quantity$ = this.store.select(count).subscribe(n => console.log(n),e => console.log("erro",e))
  }

}
