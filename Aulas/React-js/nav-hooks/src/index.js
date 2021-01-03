import React from 'react';
import './components/components.css';
import ReactDOM from 'react-dom';
import Menu from './page/menu';
import Content from './page/content';
import {BrowserRouter,Link} from 'react-router-dom';
import Context from  './components/createContext';

ReactDOM.render(    
    <Context>
        <BrowserRouter>        
            <Menu>
                <Link to="/exemplo">Exemplo</Link>                        
                <Link to={"/exemplo/"+Math.random()}>Parametros</Link>
                <Link to="/state">Hook: useState</Link>
                <Link to="/effect">Hook: useEffect</Link>
                <Link to="/ref">Hook: useRef</Link>
                <Link to="/memo">Hook: useMemo</Link>
                <Link to="/callback">Hook: useCallback</Link>
                <Link to="/context">Hook: useContext</Link>
                <Link to="/reducer">Hook: useReducer</Link>
            </Menu>,
            <Content/>               
        </BrowserRouter>
    </Context>
    ,
    document.getElementById('root')
);



