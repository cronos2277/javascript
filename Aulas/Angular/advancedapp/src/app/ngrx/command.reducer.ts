import { Commands} from './command.actions';
/*
    Voce pode associar mais de um dado usando o as,
    No caso estamos dizendo, pegue todos os Objetos,
    funcoes, arrays e etc e os assimile a variavel
    fromGetter.
*/
import * as fromGetter from './command.actions';
import { Model } from './command.model';

/*
    O reducer trabalha com o conceito de funcao pura,
    ou seja ele nao modifica o objeto que recebe,
    ao inves disso ele devolve uma copia modificada,
    mas sem tocar ou alterar o arquivo que recebeu, 
    no caso a funcao reducer trabalha nesse parametro.
*/
export const initialState:Model[] = [];
export function reducer(state:Model[]=initialState,action:fromGetter.GetterActions):Model[]{
    console.log('%c'+action.type,"font-size:14px;background-color:green;color:white;");
    console.table(action);
    switch(action.type){        
        //Concat retorna um novo array com o novo elemento anexado.
        case Commands.GETTER_NEW: return state.concat(action.payload); 
        /* O filter ele filtra se true mantem o elemento no array, se false exclui.
                No caso o filter apenas da falso quando o elemento recebido na action
                Eh igual ao que deve ser excluido, fazendo com que o mesmo seja excluido
                do array retornado.
        */
        case Commands.GETTER_DELETE:return state.filter(cmd => cmd._id != action.payload._id);
        case Commands.GETTER_UPDATE:{
            const cmd = state.slice(); //Clonamos o array, para nao mexer no recebido.
            /* Procuramos por elemento a ser modificado na copia, usando o indice do payload.
                O payload se refere ao novo valor, o state e o cmd que eh uma copia do state,
                ambos se referem ao valor antigo, no caso o cmd recebe a modificacao, uma
                vez que o state nao pode ser alterado, ja que essa funcao eh pura.  */                                 
            cmd[action.payload.index] = action.payload;                     
            return cmd; //Sendo a copia criada fiel ou nao ao original, do mesmo modo eh retornado.
        }
        default: state; //Se nao cair no switch, entao retorna o proprio state.
    }
}