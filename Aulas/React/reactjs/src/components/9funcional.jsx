import React from 'react';
export default function(props){
    let arr = [];        
    if(props && props.children && Array.isArray(props.children)){
        const times = props.repeat || 1;
        for(let i=0;i<times;i++){            
            arr[i] = <div key={`key-container-${i}`} id={`container-${i}`}>{props.children.map(
                (el,i) => React.cloneElement(<div key={`keya-${i}`} id={`el-${i}`}>{el}</div>,props)
            )}</div>;
            
        }         
    }else{
        const times = props.repeat || 1;
        for(let i=0;i<times;i++){            
            arr[i] = <div key={`container-${i}`} id={`container-${i}`}>{React.cloneElement(<div key={`keyb-${i}`} id={`el-${i}`}>{props.children}</div>,props)}</div>;
            
        }        
    }    
    const id = parseInt(Math.random() * 1000);
    return <div id={`cont-${id}`} key={`keyc-${id}`}>{arr}</div>;
}

export function Lista(props){
    const id = parseInt(Math.random() * 1000);
    return (<p key={`key-${id}`} id={id}>{props.value}</p>)
}
