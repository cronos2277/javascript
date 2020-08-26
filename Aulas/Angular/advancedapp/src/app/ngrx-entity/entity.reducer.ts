import { Actions} from './entity.actions';
import * as ActionGetter from './entity.actions';
import { Template } from './entity.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface ReducerState extends EntityState<Template>{

}
export const reducerAdapter:EntityAdapter<Template> = createEntityAdapter<Template>();

export const initialState:ReducerState = reducerAdapter.getInitialState({});

export function reducer(state=initialState,action:ActionGetter.ActionsAll){
    console.log('%c'+action.type,"font-size:14px;background-color:yellow;color:black;");
    console.table(action);
    switch(action.type){                
        case Actions.ACTION_NEW: return reducerAdapter.addOne(action.payload,state);        
        case Actions.ACTION_DELETE:return reducerAdapter.removeOne(action.payload._id,state);
        case Actions.ACTION_UPDATE: return reducerAdapter.updateOne({
                id:action.payload.id, changes:action.payload.changes
            },state);
        default: state;
    }
}