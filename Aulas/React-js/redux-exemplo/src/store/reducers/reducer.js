import initial from './initial';
import ACTIONS from '../actions/actions';

export default function(state,action){
    switch (action.type) {
        case ACTIONS.MIN:
            return{
                ...state,
                min:action.payload
            };

        case ACTIONS.MAX:
            return{
                ...state,
                max:action.payload
        }

        default: return initial;            
    }
}