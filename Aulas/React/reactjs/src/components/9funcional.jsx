import React from 'react';
export default function(props){        
    const times = props.repeat || 1;
    const child = [props.children];
    for(let i=1;i<times;i++){
        child[i] = props.children;
    }
    return(<ol>{child}</ol>);                
}
