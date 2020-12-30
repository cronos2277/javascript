import React from 'react';

export default function(props){
    let [num1,setNum1] = React.useState(0);
    let [num2,setNum2] = React.useState(0);
    const soma = React.useMemo(function(){
        console.log(num1,num2);
        return (parseFloat(num1) || 0) + (parseFloat(num2) || 0);
    },[num1,num2]);

    return(
        <div className="memo">
            <div className="memo-result">
                <h2>Soma: {soma}</h2>
            </div>
            <div className="memo-btn">
                <label>Valor 1: </label>
                <input onChange={event => setNum1(event.target.value)} type="number"/>
            </div>
            <div className="memo-btn">
                <label>Valor 2: </label>
                <input onChange={event => setNum2(event.target.value)} type="number"/>
            </div>
        </div>
    );
}