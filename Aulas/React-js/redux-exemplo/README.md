# Redux

1. [Instalando](#instalando)

2. [Reducers: Acessando os Estados](#reducers)

    A. [Criando Objeto Inicial](#colocando-um-valor-inicial-no-objeto-com-estado)

    B. [Fazendo o React reconhecer o Redux](#usando)

    C. [lendo objeto com estado nos componentes](#usando-em-componentes-específicos)

3.[Action Creators](#actions)

   1. [Dispatch](#dispatch-com-o-connect)

   2. [Action Creator](#reducerjs)


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

###### ou seja
    export default connect([funcaoInjetora])([Componente]);

A função *connect* faz a injeção de um objeto com estado dentro de um componente, essa função vem dela `import {connect} from 'react-redux';`. O *connect* trabalha com **currying**, nos primeiros parenteses você passa a função que vai injetar o estado, como por exemplo essa `mapStateToProps`, essa função deve ter como retorno ou o estado ou a parte do estado que interessa a esse componente, após isso você passa no segundo parentes. No primeiro você passa a função injetora e na segundo parentes o componente e é justamente a função *connect* que deve fazer o retorno, conforme visto acima. **Lembre-se sempre de retornar o componente através do connect, pois essa função injeta o objeto com estado, permitindo o acesso do componente a esse recurso.**

## Actions
No caso agora vamos ver como que funciona a mudança de Estado.
[Intervalo](/src/components/intervalo.jsx)

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
                            onChange={evento => props.setMin(+evento.target.value)}
                        />
                    </span>
                    <span>
                        <strong>Máximo:</strong>
                        <input type="number" value={max} 
                            onChange={evento => props.setMax(+evento.target.value)}
                        />
                    </span>
                </div>
            </Card>
        );
    }

    function mapDispatchToProp(dispatch){    
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


    export default connect(state => state.numeros,mapDispatchToProp)(Intervalo);

### Dispatch com o connect
    export default connect(state => state.numeros,mapDispatchToProp)(Intervalo);

No primeiro parenteses na verdade a função *connect* pode receber uma ou duas funções, no caso a segunda função que seria essa `mapDispatchToProp`, se trata da função que da *dispatch*, ou seja a primeira injeta o estado e a segunda dá dispatch caso haja alguma alteração:

###### Função de Dispatch
    function mapDispatchToProp(dispatch){    
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

A função de *dispatch* assim como a função injetora, também deve retornar dados, mas essa diferenta da ejetora deve retornar os métodos que irão chamar os actions, e após isso é dado o *dispatch* que nada mais é, do que avisar o redux que teve uma mudança de estado. Você nunca chama as *actions* diretamente, você os chama através da função de dispatch, que é a função que é passada como segundo argumento em componentes que manipulam o estado de um determinado dado. **setMin**:

###### função setMin e setMax
    import {changeMinimo} from '../store/actions/minimo';
    import {changeMaximo} from '../store/actions/maximo';
    function mapDispatchToProp(dispatch){
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

Repare que a função usada como segundo argumento do primeiro parentes do *connect* aceita um argumento e esse argumento é o método dispatch, ou seja dessa expressão `export default connect(state => state.numeros,mapDispatchToProp)(Intervalo);` a `mapDispatchToProp` recebe como argumento o método dispatch ao qual é visto aqui `dispatch(action)`, lembrando que essa função deve ser chamada, depois de chamado as *Actions Creators* para que o *redux* saiba que o estado foi alterado, além disso apenas essa função que tem como argumento que pode fazer *dispatch*, qualquer actions devem serem chamadas sempre dentro de uma função dispatch e nunca no componente, uma vez que no componente não tem como avisar o *redux*.
###### Lógica da função changeMinimo

    import ACTIONS from './actions';
    export function changeMinimo(novo){
        return{
            type:ACTIONS.MIN,
            payload:novo
        }
    }
Essa é action acima é chamada nessa parte `const action = changeMinimo(novoDado);`, aqui é feito a alteração e retornado uma action. No caso o novo valor é pego e deve alterar o objeto com estado dentro do *payload*. O *payload* é o dado a ser substituído, que no caso será gerado com base em um novo, ao passo que o *TYPE* informa exatamente o que foi alterado. Com base no type o *Action Creator* cria um novo estado, preste bem a atenção nessa palavra *cria* e não *modifica*, esse é o grande lance da programação funcional, o dado gerado por essa *action generator* é um dado novo e não o dado antigo modificado, e é justamente isso que essa função se propõe a fazer, criar um novo dado com base no estado existente.

###### ACTIONS

    export default Object.freeze({
        MAX: "MAX_CHANGED",
        MIN: "MIN_CHANGED",
    });

Aqui temos uma constante que é usado pela função acima e abaixo para preencher o valor de *type*, no payload é passado o novo dado gerado, já o type que é um atributo obrigatório exigido pelo redux, aqui informamos pelo redux o que está sendo mudado e com base no type é criado um novo dado apenas alterando a parte que foi alterada, ou seja no novo dado você tem um novo dado gerado, mas apenas diferenciando a parte que foi mudado e um exemplo para explicar é isso: 
###### Reducer.js

    import initial from './initial';
    import ACTIONS from '../actions/actions';

    export default function(state,action){
        switch (action.type) {
            case ACTIONS.MIN:
                return{
                    ...state,
                    min:action.payload
                };

            case ACTIONS.MAX:
                return{
                    ...state,
                    max:action.payload
            }

            default: return initial;            
        }
    }

Aqui fica claro de como funciona, inicialmente é recebido o dado antigo e a action, que é onde está o novo dado, conforme visto aqui `export default function(state,action)`, *state* é o objeto com estado atual e a action é um objeto contendo o type e o *payload*, sendo o payload o atributo que contem o dado modificado. Dentro da função temos um *switch* `switch (action.type)` e com base no atributo *type* é possível saber o que foi alterado, por exemplo se for alterado o valor minimo `case ACTIONS.MIN`, sendo o valor dessa constante `MIN_CHANGED`, **recomenda-se usar constantes ao invés de digitar para evitar erros de digitação, uma vez que essa constante é uma string**.

    case ACTIONS.MIN:
        return{
            ...state,
            min:action.payload
        };

Se o *min* for alterado, o state é clonado `...state,`, ou seja todos os dados são pegos e apenas o *min* é alterado conforme visto aqui `min:action.payload`, ou seja o *redux* sabe que tem que passar dados do payload para o min, justamente porque o *TYPE* informa isso, e ai está a importancia do type, agora se o type valesse `MAX_CHANGED` que é o valor dessa constante `MAX_CHANGED` a alteração seria essa abaixo:

    case ACTIONS.MAX:
        return{
            ...state,
            max:action.payload
        }

ou caso o *type* tenha qualquer valor diferente `default: return initial;`, no caso é retornado o valor inicial, o que é uma estratégia interessante, pois ao iniciar o redux não tem nenhum *type* associado, caindo assim no *default*. Mas repare que o estado antigo é clonado `...state,`, depois é feito as alterações de acordo com o type e por fim é retornado um novo objeto, mas sem mexer no objeto anterior, essa que é a grande sacada do *redux*.
###### Lógica da função changeMaximo

    import ACTIONS from './actions';
    export function changeMaximo(novo){
        return{
            type:ACTIONS.MAX,
            payload:novo
        }
    }

Essa função acima seria a **setMax** [dessa aqui, clique aqui para ver a explicação.](#função-setmin-e-setmax).
