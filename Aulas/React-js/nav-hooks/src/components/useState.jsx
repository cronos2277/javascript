import React from 'react';

export default function State(props){
    const [getter,setter] = React.useState(0);
    return(
        <div className="state">
            <h2>Componente controlado</h2>
            <div className="state-input">
                <h2 className="state-getter">{getter}</h2>
                <input value={getter} onChange={e => setter(e.target.value)} />
            </div>
            <button className="state-btn" onClick={() => setter(() => getter - 1)}>-1</button>            
            <button className="state-btn" onClick={() => setter(() => getter + 1)}>+1</button>
        </div>
    );
}