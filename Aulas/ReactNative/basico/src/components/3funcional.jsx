import React from 'react';
export default function(propriedade){
    console.log(propriedade);
    return(
        <div> 
            <p>{propriedade.prop1}</p>
            <p>{propriedade.prop2}</p>
            <p>{propriedade.prop3}</p>
            <p>{propriedade.prop4.a}</p>
            <p>{propriedade.prop4.b}</p>
            <p>{propriedade.prop5}</p>
            <p></p>
        </div>
    );
}