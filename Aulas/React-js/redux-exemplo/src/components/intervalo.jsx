import './intervalo.css';
import React from 'react';
import Card from './Card';
import {connect} from 'react-redux';
import {changeMinimo} from '../store/actions/minimo';
import {changeMaximo} from '../store/actions/maximo';

const Intervalo = props => {
    const {min,max} = props;    
    return(
        <Card title="Intervalo de Números" blue>
            <div className="Intervalo">
                <span>
                    <strong>Mínimo:</strong>
                    <input type="number" value={min} 
                        onChange={evento => props.setMin(evento.target.value)}
                    />
                </span>
                <span>
                    <strong>Máximo:</strong>
                    <input type="number" value={max} 
                        onChange={evento => props.setMax(evento.target.value)}
                    />
                </span>
            </div>
        </Card>
    );
}

function mapActionCreatorsToProp(dispatch){
    console.log('%cDISPATCH CHAMADO','font-size:14;color:red;background-color:cyan');
    return{
        setMin:function(novoDado){            
            const action = changeMinimo(novoDado);
            dispatch(action);
        },
        setMax:function(novoDado){            
            const action = changeMaximo(novoDado);
            dispatch(action);
        }
    }
}


export default connect(state => state.numeros,mapActionCreatorsToProp)(Intervalo);