import React from 'react';

export default function(props){
    const [num,setNum] = React.useState(1);
    const [sqrt,setSqrt] = React.useState(1);
    React.useEffect(function(){         
        setSqrt(Math.sqrt(num));
    },[num]);

    return(
        <div className="effect">
            <div className="effect-show">
                A raiz quadrada de {num}: {sqrt}
            </div>
            <div className="effect-input">
                <input type="number" value={num} onChange={event => setNum(event.target.value)} />
            </div>
        </div>
    );
}