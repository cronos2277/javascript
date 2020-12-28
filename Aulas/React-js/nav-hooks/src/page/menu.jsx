import './menu.css';
import React from 'react';

export default function(props){
    let children = props.children.map((e,i) => <li key={i}>{e}</li>);
    return(
        <nav>
            <ol>{children}</ol>
        </nav>
    );
}