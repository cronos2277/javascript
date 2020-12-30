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


## Hooks
### useParams
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



### useState
[Arquivo](./src/components/useState.jsx)

    import React from 'react';
    export default function State(props){
        const [getter,setter] = React.useState(0);
        return(
            <div className="state">
                <h2>Componente controlado</h2>
                <div className="state-input">
                    <h2 className="state-getter">{getter}</h2>
                    <input value={getter} onChange={e => setter(e.target.value)} />
                </div>
                <button className="state-btn" onClick={() => setter(() => getter - 1)}>-1</button>            
                <button className="state-btn" onClick={() => setter(() => getter + 1)}>+1</button>
            </div>
        );
    }

O `useState` é um hook que permite aos componentes funcionais ter estado, o seu uso é feito nessa linha `const [getter,setter] = React.useState(0);`, o método `useState` retorna um array com 2 elementos, sendo o primeiro uma constante para leitura e o segundo parametro uma callback que faz a alteração do valor, no caso pense no primeiro elemento desse array, que nesse exemplo é o `getter`, que funciona como o `getSeuValor` e o segundo que nesse exemplo é o `setter` que nesse exemplo seria algo do tipo `setSeuValor`. Um segundo ponto a ser notado é que o elemento pode ter um valor inicial, como nesse caso `React.useState(0)`, quando passado um valor ao método `useState`, nesse caso o valor passado como argumento se torna o valor padrão do elemento.

#### função do setter
` <input value={getter} onChange={e => setter(e.target.value)} />` => Aqui você pode passar um valor diretamente a função pega do `useState` como aqui.

`<button className="state-btn" onClick={() => setter(() => getter - 1)}>-1</button>` => além de valor, você também pode passar uma callback como feito aqui `setter(() => getter - 1)`.

#### getter
Como é possível perceber aqui por exemplo `<input value={getter} onChange={e => setter(e.target.value)} />` o `{getter}` está tendo o seu valor lido, ou seja o valor mais recente, alterado em tempo real pela callback que altera o valor, do mesmo modo você percebe aqui `setter(() => getter + 1)` que o valor da variavel com estado é lida e depois incrementada.

### useEffect
[Arquivo exemplo](./src/components/useEffect.jsx)

    import React from 'react';
    export default function(props){
        const [num,setNum] = React.useState(1);
        const [sqrt,setSqrt] = React.useState(1);
        React.useEffect(function(){         
            setSqrt(Math.sqrt(num));
        },[num]);

        return(
            <div className="effect">
                <div className="effect-show">
                    A raiz quadrada de {num}: {sqrt}
                </div>
                <div className="effect-input">
                    <input type="number" value={num} onChange={event => setNum(event.target.value)} />
                </div>
            </div>
        );
    }

O useEffect é interessante caso tenha como objetivo monitorar uma variável e caso haja alguma alteração executar uma função, vamos ao exemplo:

    React.useEffect(function(){         
            setSqrt(Math.sqrt(num));
        },[num]);

Sendo um método do objeto `React`, assim como qualquer hook, o mesmo aceita 2 argumentos, sendo o primeiro uma função a ser executada e o segundo um array dos valores a serem monitorados e uma vez que esses valores dentro do array seja modificados, será disparado a callback passado como parametro. Nesse exemplo toda vez que ocorre uma mudança nesse input `<input type="number" value={num} onChange={event => setNum(event.target.value)} />`, ou seja é adicionado um novo número, é atualizado um state de um outro componente que é esse aqui `const [sqrt,setSqrt] = React.useState(1);`, em resumo, esse hook é interessante caso você queira que a mudança de valor de uma variável impacte em outra, nesse caso quando o usuário coloca um novo valor, a função do useEffect recalcula a raiz quadrada.

### useRef

    import React from 'react';

    export default function(props){
        const count = React.useRef(0);
        const element = React.useRef(null);    
        React.useEffect(function(){
            console.log('contador: ',count);
            console.log('element: ',element)
        },[count])

        console.log(count)
        return(
            <div className="ref">
                <div className="ref-inner">
                    Contador: {count.current}, Aqui não muda mas no console muda.
                    <hr/>                
                    <button className="ref-btn" onClick={() => count.current += 1} ref={element}>Mudar Referencia</button>
                </div>
            </div>
        );
    }

#### Usando estados em componentes que não devem ser renderizados novamente.
O Useref faz algo semelhante ao `useState` e permite o uso de estado, porém, ele não renderiza o componente, ou seja: `{count.current}` ele altera esse valor mas sem renderiza-lo, ou seja, o componente altera o estado, mas isso não é perceptível ao usuário final, uma vez que o mesmo não é renderizado, nesse exemplo o `{count.current}` muda de valor, mas não de maneira visível, uma vez que não renderiza. No caso aqui é criado um valor com estado `const count = React.useRef(0);` e o valor fica dentro do atributo `current`, ou seja o objeto `count` passa a ter um atributo `.current` contendo o valor passado como parametro `.useRef(0)`, nesse caso `count.current` valeria zero, nesse exemplo.

#### Usando para referencia um componente.
Um uso muito comum é usar para referenciar um componente, seria o mesmo que colocar o resultado de um `document.getElementById` dentro de uma variável. Nesse exemplo criamos um componente com referencia `const element = React.useRef(null);` e ai referenciamos ele a um elemento HTML, como feito aqui `<button className="ref-btn" onClick={() => count.current += 1} ref={element}>Mudar Referencia</button>`, aonde o `ref={element}` faz referencia a `const element = React.useRef(null);`, ou seja você pode usar isso para referenciar um componente e manipular ele.

#### Peculiaridades

    React.useEffect(function(){
        console.log('contador: ',count);
        console.log('element: ',element)
    },[count])

        console.log(count)

No caso é perfeitamente possível atualizar um componente com o *useRef* fora de um escopo de função callback criado pelo *useEffect*, se você tentar usar o método **set** do *useState*, vai dar um problema de loop infinito, uma vez que os estados criados com o *useState* é sempre renderizado e atualizado o valor, ao passo que um estado criado com o *useRef*, altera-se o valor, mas sem ter que renderizar o componente.