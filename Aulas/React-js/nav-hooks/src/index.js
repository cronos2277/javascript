import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './page/menu';
import Content from './page/content';
import {BrowserRouter,Link} from 'react-router-dom';

ReactDOM.render(    
    <BrowserRouter>        
        <Menu>
            <Link to="/exemplo">Exemplo</Link>            
            <Link to={"/exemplo/"+Math.random()}>Parametros</Link>
        </Menu>,
        <Content/>       
    </BrowserRouter>,
    document.getElementById('root')
);



