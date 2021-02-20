import ACTIONS from './actions';
export function changeMaximo(novo){
    return{
        type:ACTIONS.MAX,
        payload:novo
    }
}