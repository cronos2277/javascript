import React from 'react';
export function se(props){    
    if(props && props.test && props.children){
        if(Array.isArray(props.children)){
            return(
                <>
                {props.children.map(el => React.cloneElement(el,props))}
                </>
            );            
        }else if(props && !props.test){
            return(
                <>
                    {React.cloneElement(props.children,props)}
                </>
            );
        }else{
            return(<></>);
        }
    }else{
        return(<></>);
    }    
}

export default {se};