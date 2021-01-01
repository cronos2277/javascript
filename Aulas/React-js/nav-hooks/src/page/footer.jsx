import React from 'react';
import {Context} from '../components/createContext'

export default function(props){
    const state = React.useContext(Context);
    return(
        <div className="footer">
            <p>Numero: {state.getNumber()}</p>
        </div>
    );
}