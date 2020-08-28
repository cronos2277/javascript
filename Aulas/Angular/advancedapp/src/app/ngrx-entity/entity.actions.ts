import {Action} from "@ngrx/store"; 
import { Template } from './entity.model';

export enum Actions{ 
    ACTION_ALL = "[ACTION_ALL] Get all value",
    ACTION_NEW = "[ACTION_NEW] Add a new record",
    ACTION_UPDATE = "[ACTION_UPDATE] Update a record",
    ACTION_DELETE = "[ACTION_DELETE] Delete a record",
}
export class ActionAll implements Action{   
    readonly type = Actions.ACTION_ALL;    
}

export class ActionNew implements Action{
    readonly type = Actions.ACTION_NEW;   
    constructor(public payload:{template:Template}){}
}

export class ActionUpdate implements Action{
    readonly type = Actions.ACTION_UPDATE;
    /*
        O Update muda um pouco se voce for usar entidades, no caso
        voce precisa usar o changes para isso o changes eh um objeto
        do tipo partial contendo dentro do diamante o tipo do seu
        template. O Partial eh um Generics
    */
    constructor(public payload:{_id:string,changes:Partial<Template>}){}
}
export class ActionDelete implements Action{
    readonly type = Actions.ACTION_DELETE;
    constructor(public payload:{_id:string,template:Template}){}
}

export type ActionsAll = ActionAll | ActionNew | ActionUpdate | ActionDelete;