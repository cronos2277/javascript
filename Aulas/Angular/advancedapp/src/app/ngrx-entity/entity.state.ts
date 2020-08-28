import { Template } from './entity.model';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './entity.reducer';
export interface StateInterface{
    /*
        No caso agora nao trabalhamos mais com um 
        array do modelo, agora trabalhamos com o 
        ReducerState que foi definido la no
        arquivo enitiy.reducer.ts. No caso o
        EntityState<Template> quando extendido,
        ele herda dessa interface os metodos
        que serao usados para controlar estados 
        e para definir o comportamento dos estados.
    */
    template:fromReducer.ReducerState
}

export const StateReducers:ActionReducerMap<StateInterface> = {
    template:fromReducer.reducer //Aqui estamos pegando da funcao reducer la no arquivo entity.reducer.ts
}

//Seletores
export const count:(param:StateInterface)=>any = (state:StateInterface) => (state.template && state.template.ids && state.template.ids.length)?state.template.ids.length:0;

export const templateStates = createFeatureSelector<fromReducer.ReducerState>('template');

export const{selectIds, selectAll, selectEntities, selectTotal} = fromReducer.reducerAdapter.getSelectors(templateStates);