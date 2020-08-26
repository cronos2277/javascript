import { Template } from './entity.model';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromReducer from './entity.reducer';
export interface StateInterface{
    template:fromReducer.ReducerState
}

export const StateReducers:ActionReducerMap<StateInterface> = {
    template:fromReducer.reducer
}

export const count:(param:StateInterface)=>number = (face:StateInterface) => (face.template)?face.template.ids.length:0;



export const last = createSelector(count,
    function(count){ 
        return `We have ${count} register(s)`; 
    }
)
