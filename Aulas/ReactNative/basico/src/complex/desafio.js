import React from 'react';

function arrnums(qtde = 1){
    let arr = [];
    for(let i=0;i<qtde * 2;i++){        
        arr[i] = parseInt(Math.random() * 59 + 1);
    }

    arr = Array.from(new Set(arr))
        .sort((a,b) => a - b)
        .filter((_,i) => i< qtde);

    return arr.join(', ');
}

export default function(props){
    const defaultqtde = props.qtde || 6;
    let [qtde,func] = React.useState(defaultqtde);
    const update = value => (value > 0 && value < 10)?func(value):func(defaultqtde);
    let [exec,nums] = React.useState(arrnums(qtde));
    const uptfunc = () => nums(arrnums(qtde));
    return(
        <div>
            <h2>{`Megasena Componente Desafio: ${qtde} numeros`}</h2>
            <h3>{exec}</h3>
            <button onClick={() => update(qtde + 1)}>{'+1 Numero'}</button>
            <button onClick={() => update(qtde - 1)}>{'-1 Numero'}</button>
            <button onClick={() => uptfunc()}>{'Gerar Numeros'}</button>
        </div>
    );
}
