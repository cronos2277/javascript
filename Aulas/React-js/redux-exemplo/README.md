# Redux

## Instalando
Para funcionar o redux, você precisa instalar ele, quando você usa o `npx create-react-app` o redux não vem mais por padrão, para isso `npm i redux` ou `npm install redux`, dentro do projeto criado pelo **create-react-app**. Além disso para que haja integração com o react, precisa instalar o `react-redux`, no caso `npm i react-redux` ou `npm install react-redux`.

## Reducers
[Store Config](./src/store/storeConfig.js)
### Criando Objeto com estado

    import {createStore, combineReducers} from 'redux';
    const reducers = combineReducers({
        numeros: function(state, action){
            console.log(state," ",action);
            return {
                min: 7,
                max: 31
            };
        }
    });

    function storeConfig(){
        return createStore(reducers);
    }

    export default storeConfig;

Inicialmente você precisa importar duas funções oriundas do pacote instalado `redux`.

     import {createStore, combineReducers} from 'redux';

#### Colocando um valor inicial no Objeto com estado
###### combineReducers({});
    const reducers = combineReducers({
        numeros: function(state, action){
            console.log(state," ",action);
            return {
                min: 7,
                max: 31
            };
        }
    });

Com o uso da função `combineReducers`, você passa como argumento da função o estado inicial do seu objeto que tem estado, pense nesse método como sendo uma espécie de *useState*.

#### createStore
###### createStore
     function storeConfig(){
        return createStore(reducers);
    }

    export default storeConfig;

###### ou
    export default createStore(reducers);

Depois de criado o objeto com estado com o seu valor inicial, você deve exportado usando a função `createStore`, essa é a função que vai encapsular o objeto com estado criado e permitir o uso dele dentro do **Redux**.

### Usando
[Arquivo Index da aplicação](src/index.js)
###### index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import reportWebVitals from './reportWebVitals';
    import {Provider} from 'react-redux';
    import storeConfig from './store/storeConfig';
    const store = storeConfig();

    ReactDOM.render(
        <Provider store={store}>
            <React.StrictMode>
            <App />
            </React.StrictMode>
        </Provider>,
        document.getElementById('root')
    );

#### Provider
Quando você for usar o redux, você deve colocar todos os componentes dentro de `<Provider>`, sendo que esse provider deve abranger toda a aplicação, no caso é através delas que o objeto com estado será injetado na aplicação, logo todos os filhos que forem receber o objeto, receberão através do provider que é um componente de `import {Provider} from 'react-redux';`, dai que vem a necessidade de instalar o `react-redux` acima.

##### Atributo store
    <Provider store={store}></Provider>

No atributo *store* deve se colocar o estado que foi criado [aqui](#criando-objeto-com-estado). No caso o objeto com estado passado como atributo dentro de *store*, deve ser informado nessa parte, para que possa ser injetado nos componentes que forem usar esse estado, repare que esse *store* vem daqui `import storeConfig from './store/storeConfig';`, atribuido a uma variável `const store = storeConfig();` *o que não é obrigatório* e por fim usando.

#### Usando em componentes específicos
[Sorteio](./src/components/sorteio.jsx)
###### Sorteio

    import React from 'react';
    import Card from './Card';
    import {connect} from 'react-redux';

    const Sorteio = props => {
        const {min,max} = props;
        const random = parseInt(Math.random() * (max - min) + min);
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

##### Estrutura
No caso o redux aqui trabalha com o padrão de projeto *decorator*, ou seja ele decora o componente injetando dentro dele o estado, no caso isso é feito aqui, por uma função que **deve** retornar a parte do estado que interessa a aplicação, conforme visto nessa função:

     function mapStateToProps(state){    
        return {
            min: state.numeros.min,
            max: state.numeros.max
        };
    }

##### connect
    export default connect(mapStateToProps)(Sorteio);

A função *connect* faz a injeção de um objeto com estado dentro de um componente, essa função vem dela `import {connect} from 'react-redux';`. O *connect* trabalha com **currying**, nos primeiros parenteses você passa a função que vai injetar o estado, como por exemplo essa `mapStateToProps`, essa função deve ter como retorno ou o estado ou a parte do estado que interessa a esse componente, após isso você passa no segundo parentes. No primeiro você passa a função injetora e na segundo parentes o componente e é justamente a função *connect* que deve fazer o retorno, conforme visto acima.