import React from 'react';

const initial = {
    number: 0,
    text: ""
}

const func = function(state,action){
    switch(action.type){
        case 'number': return {...state, number: action.payload};
        case 'text': return {...state, text: action.payload};
        default: return state;
    }
}

export default function(props){
    const [state,dispatch] = React.useReducer(func, initial);
    return(
        <div className="reduce">
            <div className="reduce-display">
                <p>Número informado no reducer: {state.number}</p>
                <p>{state.text}</p>
            </div>
            <hr />
            <div className="reduce-inputs">
                <input type="number" value={state.number} onChange={e => dispatch({payload:e.target.value,type:'number'})} />
                <br />
                <textarea type="text" value={state.text} onChange={e => dispatch({payload:e.target.value,type:'text'})} />
            </div>
        </div>
    );
}