import {createStore, combineReducers} from 'redux';
import ACTIONS from './actions/actions';
const reducers = combineReducers({
    numeros: function(state, action){
        console.log('%cREDUCER CHAMADO','font-size:14;color:yellow;background-color:blue');
        console.log(state," ",action);

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
            default:return {
                min: 0,
                max: 1
            };
        }

    }
});

function storeConfig(){
    return createStore(reducers);
}

export default storeConfig;