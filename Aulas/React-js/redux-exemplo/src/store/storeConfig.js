import {createStore, combineReducers} from 'redux';
import reducer from './reducers/reducer';

const reducers = combineReducers({numeros:reducer});

function storeConfig(){
    return createStore(reducers);
}

export default storeConfig;