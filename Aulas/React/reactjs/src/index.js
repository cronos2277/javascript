import ReactDOM from 'react-dom';
import React from 'react';
import Primeiro from './components/1basico'; 
import Segundo from './components/2basico';

const titulo = <h1>Titulo</h1>;

ReactDOM.render(
    (
        <div>
            {titulo}
            <Primeiro></Primeiro>
            <Segundo></Segundo>
        </div>
    ),
    document.getElementById('root')
);