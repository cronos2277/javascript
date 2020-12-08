import React from 'react';
import './5funcional.css';
export default props => {
    return(        
        <div className='classe'>
            <h1>{props.title}</h1>
            {props.children}
        </div>        
    );
}