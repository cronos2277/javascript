import React from 'react';
import './global.css';
import {Context} from '../components/createContext'

export default function(props){
    const state = React.useContext(Context);
    return(
        <div className="global">
            <p className="global-text">
                <span className="global-span-begin">Numero: {state.getNumber()}</span>
                <span className="global-span-end">Texto: {state.getText()}</span>
            </p>
        </div>
    );
}