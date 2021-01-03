import './content.css';
import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Param from '../components/useParams';
import State from '../components/useState';
import Effect from '../components/useEffect';
import Ref from '../components/useRef';
import Memo from '../components/useMemo';
import Callback from '../components/useCallback';
import Context from '../components/useContext';
import Reduce from '../components/useReduce';

export default function(props){           
    return(
        <article>
            <main>
                <Switch>                    
                    <Route path='/exemplo/:param'>
                        <h1>Rota com parametros</h1>                                               
                        <Param />
                    </Route>
                    <Route path="/exemplo">
                        <h1>Rota /exemplo </h1>                        
                    </Route>
                    <Route path="/state">
                        <State />
                    </Route>
                    <Route path="/effect">
                        <Effect />
                    </Route>
                    <Route path="/ref">
                        <Ref />
                    </Route>
                    <Route path="/memo">
                        <Memo />
                    </Route>
                    <Route path="/callback">
                        <Callback />
                    </Route>
                    <Route path="/context">
                        <Context />
                    </Route>
                    <Route path="/reducer">
                        <Reduce />
                    </Route>
                    <Route exact path="/">
                        <h1>Página Raiz</h1>
                    </Route>
                    <Route path="*">
                        <h1>Página 404</h1>
                    </Route>
                </Switch>                
            </main>
        </article>
    );
}