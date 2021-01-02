import './menu.css';
import React from 'react';
import Global from './global';

export default function(props){
    let children = props.children.map((e,i) => <li key={i}>{e}</li>);
    return(
        <React.Fragment>
            <nav>
                <ol>{children}</ol>
            </nav>
            <Global />    
        </React.Fragment>
    );
}