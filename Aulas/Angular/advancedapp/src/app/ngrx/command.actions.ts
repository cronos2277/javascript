//Voce precisa importar a interface action daqui.
import {Action} from "@ngrx/store"; 
import { Model } from './command.model';

export enum Commands{ //Aqui estamos criando a nossa action
    GETTER_ALL = "[GETTER_ALL] Get all value",
    GETTER_NEW = "[GETTER_NEW] Add a new record",
    GETTER_UPDATE = "[GETTER_UPDATE] Update a record",
    GETTER_DELETE = "[GETTER_DELETE] Delete a record",
}
export class GetterAll implements Action{
    /*
        Quando voce implementa a interface Action, voce
        precisa definir qual sera o valor da constante
        type, com o type o NGRX sabe a qual action
        essa classe se refere, como nao ha parametros
        aqui, logo a implementacao eh simples como
        demonstrado abaixo.
    */
    readonly type = Commands.GETTER_ALL;    
}

export class GetterNew implements Action{
    readonly type = Commands.GETTER_NEW;
    /*
            Aqui temos um parametro, logo temos um 
        incremento a mais se compararmos com a classe
        acima. Geralmente se usa o nome payload para
        mas isso eh convencao, voce tambem pode ao
        inves de definir como parametro de entrada
        qualquer outra coisa, ou seja a assinatura
        do seu construtor nao precisa ser essa,
        eh justamente aqui que o NGRX vai pegar os 
        parametros.
    */
    constructor(public payload:Model){}
}

export class GetterUpdate implements Action{
    readonly type = Commands.GETTER_UPDATE;
    constructor(public payload:Model){}
}
export class GetterDelete implements Action{
    readonly type = Commands.GETTER_DELETE;
    constructor(public payload:Model){}
}

export type GetterActions = GetterAll | GetterNew | GetterUpdate | GetterDelete;