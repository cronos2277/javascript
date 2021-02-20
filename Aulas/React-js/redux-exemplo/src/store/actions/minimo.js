import ACTIONS from './actions';
export function changeMinimo(novo){
    return{
        type:ACTIONS.MIN,
        payload:novo
    }
}