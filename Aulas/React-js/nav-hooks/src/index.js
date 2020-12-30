import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './page/menu';
import Content from './page/content';
import {BrowserRouter,Link} from 'react-router-dom';
import './components/components.css';

ReactDOM.render(    
    <BrowserRouter>        
        <Menu>
            <Link to="/exemplo">Exemplo</Link>                        
            <Link to={"/exemplo/"+Math.random()}>Parametros</Link>
            <Link to="/state">Hook: useState</Link>
            <Link to="/effect">Hook useEffect</Link>
        </Menu>,
        <Content/>       
    </BrowserRouter>,
    document.getElementById('root')
);



