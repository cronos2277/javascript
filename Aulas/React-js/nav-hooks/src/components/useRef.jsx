import React from 'react';

export default function(props){
    const count = React.useRef(0);
    const element = React.useRef(null);    
    React.useEffect(function(){
        console.log('contador: ',count);
        console.log('element: ',element)
    },[count])

    console.log(count)
    return(
        <div className="ref">
            <div className="ref-inner">
                Contador: {count.current}, Aqui não muda mas no console muda.
                <hr/>                
                <button className="ref-btn" onClick={() => count.current += 1} ref={element}>Mudar Referencia</button>
            </div>
        </div>
    );

}