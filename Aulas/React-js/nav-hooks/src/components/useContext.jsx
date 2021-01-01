import React from 'react';
import {Context} from  './createContext'

export default function(props){
    const state = React.useContext(Context);    
    console.log(`Numero: ${state.getNumber()}`);
    console.log(`Texto: ${state.getText()}`);
    return(
        <div className="context">
            <input value={state.getNumber()} onChange={e => state.setNumber(e.target.value)} type="number" />
            <input value={state.getText()} onChange={e => state.setText(e.target.value)} type="text" />
        </div>
    )
}