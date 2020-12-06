import ReactDOM from 'react-dom';
import React from 'react';
import Primeiro from './components/1funcional'; 
import Segundo from './components/2funcional';
import Terceiro from './components/3funcional';

const titulo = <h1>Titulo</h1>;

ReactDOM.render(
    (
        <div>
            {titulo}
            <Primeiro></Primeiro>
            <hr />
            <Segundo></Segundo>
            <hr />
            <Terceiro 
                    prop1="valor1"
                    prop2={9.8}
                    prop3={true}
                    prop4={{'a':1,'b':2}}
                    prop5={[9,3,5]}>
            </Terceiro>
        </div>
    ),
    document.getElementById('root')
);