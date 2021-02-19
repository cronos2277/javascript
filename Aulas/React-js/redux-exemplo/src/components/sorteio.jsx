import React from 'react';
import Card from './Card';

export default props => {
    return(
        <Card title="Sorteio dos Números" purple>
            <div className="Intervalo">
                <span>
                    <span>Resultado:</span>
                    <strong>6</strong>                    
                </span>                
            </div>
        </Card>
    );
}