import React from 'react';
export function Se(props){
    const senao = (Array.isArray(props.children)) ? props.children.filter(
        child => child.type && child.type.name === 'Senao'
    )[0]:(props.children.type.name === 'Senao') && props.children;

    const se = (Array.isArray(props.children)) ? props.children.filter(
        (child) => child !== senao
    ): (props.children !== senao) && props.children;

    if(props.test){
        return <div style={{backgroundColor:'blue',color:'white',padding:'10px'}}>{se}</div>;
    }else{
        return senao;
    }
}

export const Senao = props => <div style={{backgroundColor:'red',color:'white',padding:'10px'}}>{props.children}</div>;

export default {Se,Senao};
    