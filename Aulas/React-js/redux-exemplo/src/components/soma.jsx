import React from 'react';
import Card from './Card';

export default props => {
    return(
        <Card title="Soma dos Números" green>
            <div className="Intervalo">
                <span>
                    <span>Resultado:</span>
                    <strong>10</strong>                    
                </span>                
            </div>
        </Card>
    );
}