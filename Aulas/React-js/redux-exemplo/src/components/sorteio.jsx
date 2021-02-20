import React from 'react';
import Card from './Card';
import {connect} from 'react-redux';

const Sorteio = props => {
    const {min,max} = props;
    const random = parseInt(Math.random() * (max - min))+ min;
    return(
        <Card title="Sorteio dos Números" purple>
            <div className="Intervalo">
                <span>
                    <span>Resultado:</span>
                    <strong>{random}</strong>                    
                </span>                
            </div>
        </Card>
    );
}

function mapStateToProps(state){    
    return {
        min: state.numeros.min,
        max: state.numeros.max
    };
}

export default connect(mapStateToProps)(Sorteio);