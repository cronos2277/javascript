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
    constructor(public payload:Template){}
}

export class ActionUpdate implements Action{
    readonly type = Actions.ACTION_UPDATE;
    constructor(public payload:{id:string,changes:Partial<Template>}){}
}
export class ActionDelete implements Action{
    readonly type = Actions.ACTION_DELETE;
    constructor(public payload:Template){}
}

export type ActionsAll = ActionAll | ActionNew | ActionUpdate | ActionDelete;