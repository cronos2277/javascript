import React from 'react';

export const value = {
    number:0,
    text:""
}

export const Context = React.createContext(null);

export default function(props){
    const [state,setState] = React.useState(value);
    const setNumber = number => setState({...state,number}); 
    const getNumber = () => state.number;
    const setText = text => setState({...state,text});
    const getText = () => state.text;    
    return(
        <Context.Provider value={{setNumber,getNumber,setText,getText}} >
            {props.children}
        </Context.Provider>
    )
} 