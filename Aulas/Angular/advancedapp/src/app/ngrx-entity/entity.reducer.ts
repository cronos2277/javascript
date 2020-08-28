import { Actions} from './entity.actions';
import * as ActionGetter from './entity.actions';
import { Template } from './entity.model';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface ReducerState extends EntityState<Template>{
    /*
        Aqui herdaremos os metodos de EntityState, passando dentro do diamante,
        o tipo do nosso modelo, com isso aqui nos herdamos os atributos do
        nosso modelo mais os metodos do EntityState, que vao nos auxiliar na
        criacao de um EntityAdapter, do estado inicial dos dados.
    */
    
}
export const reducerAdapter:EntityAdapter<Template> = createEntityAdapter<Template>(
    /*
        Aqui basicamente informamos a estrutura, no caso no objeto abaixo estamos 
        informando por meio de uma callback que o nosso id eh na verdade um _id.
        Se faz interessante usar isso caso a sua Pk nao se chame id.
    */
    {selectId:(instance:Template) => instance._id}
);

/*
    Aqui definimos a condicao inicial do state, voce pode preencher com as informacoes
    iniciais passando um objeto do tipo do seu template dentro do getInitialState.
*/
export const initialState:ReducerState = reducerAdapter.getInitialState({});

export function reducer(state=initialState,action:ActionGetter.ActionsAll):ReducerState{
    console.log('%c'+action.type,"font-size:14px;background-color:yellow;color:black;");
    console.table(action);    
    switch(action.type){                
        /* Para adicionar se usa o objeto em questao e o estado no metodo .addOne()*/
        case Actions.ACTION_NEW: return reducerAdapter.addOne(action.payload.template,state); 
        /* Para excluir se usa o id e o estado */
        case Actions.ACTION_DELETE:return reducerAdapter.removeOne(action.payload._id,state); 
        /* 
            Para atualizar se usa o id e o changes que eh do tipo partitial, no caso o
            update espera receber um diff contento o changes que eh o alterado e o state
            que eh o antigo e ai ele devolve um novo estado com um novo array preenchido
            com as mudancas do change.
         */
        case Actions.ACTION_UPDATE: return reducerAdapter.updateOne({
                id:action.payload._id, changes:action.payload.changes
            },state);
        default: return state;
    }
}