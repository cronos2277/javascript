import React from 'react';
export default function(props){
    const [variavel,funcao] = React.useState(props.value);    
    const mudanca = event => funcao(event.target.value);
    return(
        <div style={{
                backgroundColor:'purple',
                color:'white',
                border:'2px solid violet',
                boxShadow:'0px 0px 25px violet',
                padding:'10px'   
            }}>        
            <h2>{variavel}</h2>
            <input type='text' value={variavel} onChange={mudanca}/>            
        </div>
    );
}