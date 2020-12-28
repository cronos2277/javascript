# React Navegação
Inicialmente se faz necessário, para usar rotas no react, instalar a biblioteca **react-router-dom**, para isso no terminal, já dentro do diretório da aplicação: `npm i react-router-dom`



## react-router-dom
### Arquivos
[index](./src/index.js)

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

Toda vez que for usado **rotas** tudo deve estar envolto do `<BrowserRouter>`, esse é o componenente raiz, ao qual deve englobar todo o redirecionamento.

### Link

`<link>` essa tag retorna uma tag `<a>` no arquivo final, porém diferente desse ele possuí mais opções de configurações, o `<link>` tem um atributo que é o `to`, ao qual direciona o usuário para um determinado link, no caso todos os link devem estar dentro de `<BrowserRouter>`, por exemplo este link `<Link to="/exemplo">Exemplo</Link>` redireciona o usuário para `/exemplo`, também é possível passar paremetros para a url também, conforme é feito aqui `<Link to={"/exemplo/1"+Math.random()}>Parametros</Link>`, no caso o react passa um número aleatório para o parametro após o `exemplo`.

### Processando as rotas
#### Menu
[Arquivo](./src/page/menu.jsx)

    import './menu.css';
    import React from 'react';
    export default function(props){
        let children = props.children.map((e,i) => <li key={i}>{e}</li>);
        return(
            <nav>
                <ol>{children}</ol>
            </nav>
        );
    }

#### Content
[Arquivo](./src/page/content.jsx)

    import React from 'react';
    import {Switch, Route } from 'react-router-dom';
    import Param from '../components/useParams';

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

Aqui é feito o processamento das rotas e essas são as bibliotecas `import {Switch, Route } from 'react-router-dom';` usadas para isso. Inicialmente você colocar tudo envolto de um container `<Switch> ` e dentro você configura cada rota com o componente `<Route>`, e no *path* você coloca as condições para acesso:

##### path e exact
No path você define a rota, por exemplo no caso toda a rota que começa com `/exemplo` é renderizado, conforme definido aqui `path="/exemplo"`, porém essa rota poderia interferir nessa `<Route path='/exemplo/:param'>`, porém como essa rota está abaixo, logo isso não ocorre e devido a isso recomenda-se colocar da rota mais específica a mais genérica, como no exemplo aonde essa ` <Route path='/exemplo/:param'>` que vem antes dessa `<Route path="/exemplo">` e que por sua vez vem antes dessa `<Route exact path="/">`.

###### exact
Quando colocado essa expressão na rota, como nesse caso `<Route exact path="/">`, isso significa que a rota tem que bater exatamente igual a informado no path, sem o *exact* qualquer rota que começa com */*, ou seja todas, devido esse ser o diretório raiz nos sistemas unix, porém devido a presença do *exact* na expressão isso se aplica apenas a raiz e não aos seus subdiretórios e também não responde se houver parametros.

###### Asteriscos
Asteriscos responde caso a requisição não bata com nenhuma das rotas informadas e devido a essa carecteristica de se comportar como uma espécie de *default* desse *switch*, recomenda-se sempre colocar o path com o asteriscos após a rota mais genérica, ela também pode ser omitida, geralmente usa-se a estratégia da rota com asteriscos, quando deseja criar uma página *404* customizável, como no exemplo abaixo: 

    <Route path="*">
        <h1>Página 404</h1>
    </Route>

Agora analisando esse componente `<Param />`, de:

    <Route path='/exemplo/:param'>
        <h1>Rota com parametros</h1>                                               
        <Param />
    </Route>

##### useParams
[Arquivo](./src/components/useParams.jsx)

    import {useParams} from 'react-router-dom';
    export default function(props){
        const {param} = useParams();
        console.log(useParams())
        return(
            <h2>Parametro pego: {param}</h2>
        )
    }

Inicialmente não recomenda-se o uso desse hookie `import {useParams} from 'react-router-dom';` com esses `import {Switch, Route } from 'react-router-dom';`, pois ao usar dessa estratégia o useParams pode não ser devidamente processado e retornar um valor *undefined*, logo é uma estratégia mais útil criar um componente para isso como feito aqui `<Param />` a função *useParams* retorna um objeto contendo todos os parametros passado na url, usa-se dessa forma `const {param} = useParams();`, como a rota que esse componente responde `<Route path='/exemplo/:param'>` é apenas um parametro chamado `:param`, logo essa função `useParams()` deve retornar `{param:"valor no parametro"}`, ou seja, é com esse hookie que você pega os valores vindos da url.