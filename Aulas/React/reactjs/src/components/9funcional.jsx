import React from 'react';

export default function(props){    
        let arr = [];
        const times = props.repeat || 1;
        for(let i=0;i<times;i++){
        arr[i] = <li key={i} id={i}>{props.children.props.value}</li>                        
        }
        
    return(<ul key='1'>{arr}</ul>);
    
}
