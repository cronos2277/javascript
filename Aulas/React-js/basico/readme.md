# React
## React JS
### Exemplo Básico
    import ReactDOM from 'react-dom';
    import React from 'react'

    ReactDOM.render(
        <h1>Ola Mundo</h1>,
        document.getElementById('root')
    );

#### import ReactDOM from 'react-dom'
Esse import permite acesso ao renderização do **DOM**, dentre eles esse:

    ReactDOM.render(
        <h1>Ola Mundo</h1>,
        document.getElementById('root')
    );

O primeiro parametro é o componente a ser renderizado e o segundo é aonde esse componente deve ser renderizado, no caso dentro de uma div que tenha o id root, esse arquivo está dentro da pasta [public](./public/), no caso o arquivo na [public](./public/) o arquivo [index.html](./public/index.html).

#### HTML dentro de um arquivo JS
Não há aspas nesse código `<h1>Ola Mundo</h1>`, ou seja você escreve como se fosse um html, mesmo no caso essa tag é renderizada e depois convertido para html, uma vez que mesmo  dentro do contexto de um arquivo react é um código javascript mesmo parecendo um código HTML.
Para renderizar esses códigos, deve obrigatóriamente ser importado essa biblioteca `import React from 'react'`, todo código que tiver esses template deve obrigatóriamente ter isso implementado, pois é essa biblioteca que vai permitir que o react interprete o código, lembrando que deve ser **React** com a letra maíusculo, qualquer coisa diferente disso pode dar problema ao interpretar os html.

### Exemplo com Componentes Funcionais
    import ReactDOM from 'react-dom';
    import React from 'react';
    import Primeiro from './components/1basico'; 
    import Segundo from './components/2basico';

    ReactDOM.render(
        (
            <div>
                const titulo = <h1>Titulo</h1>;
                <Primeiro></Primeiro>
                <Segundo></Segundo>
            </div>
        ),
        document.getElementById('root')
    );

Um componente é importado no react como tag, repare esse componente [import Primeiro from './components/1funcional';](src/components/1funcional.js), que foi nomeado `<Primeiro>` como  se refere a esse:

    export default function (){
        return "Retornando uma String basica"
    }

 e no caso ele é usado aqui:

    ReactDOM.render(
        (
            <div>
                const titulo = <h1>Titulo</h1>;
                <Primeiro></Primeiro>
                <Segundo></Segundo>
            </div>
        ),
        document.getElementById('root')
    );

Com relação ao segundo import [import Segundo from './components/2funcional';](src/components/2funcional.js), sendo o conteudo desse componente:

    import React from 'react';
    export default function(){
        return (<h3> Segundo Basico</h3>);
    }

Repare que nesse segundo é exportado uma tag html: `return (<h3> Segundo Basico</h3>);`, recomenda-se sempre colocar esse html envolto de parenteses `()`, pois o parenteses representa bloco e isso permite que o componente ocupe mais de uma linha, igual a comparação entre backtips e aspas por exemplo, no caso, graças aos parenteses, poderia ficar assim:

    return(
            <h3> 
                Segundo Basico
            </h3>
          );

Fora de parenteses poderia dar problema para renderizar o código acima, logo usando parenteses evita-se esse problema. E claro como se trata de renderização de componente precisa importar isso: `import React from 'react';`.

#### Sobre componentes

    <div>
        const titulo = <h1>Titulo</h1>;
        <Primeiro></Primeiro>
        <Segundo></Segundo>
    </div>

Componentes são sempre usados como se fossem tags html `<Primeiro></Primeiro>` e `<Segundo></Segundo>`.

#### Interpolando variáveis
Você pode colocar tags html dentro de uma variável no react, como foi feito aqui `const titulo = <h1>Titulo</h1>;` e para usar o componente, você deve renderizar ele dentro de chaves `{}`, conforme foi feito aqui `{titulo}`. Sempre que for usar um componente interpolado por chaves, deve-se usar dentro de uma tag e não solta, pois isso pode dar problema de renderização, nesse caso o `{titulo}` está dentro de uma *div*, e como está envolto de parentes pode-se usar alinhamento com enter e tabs devido a isso como no exemplo abaixo:

    (
        <div>
            {titulo}
            <Primeiro></Primeiro>
            <Segundo></Segundo>
        </div>
    ),

#### Passando parametros para componentes
    <Terceiro 
            prop1="valor1"
            prop2={9.8}
            prop3={true}
            prop4={{'a':1,'b':2}}
            prop5={[9,3,5]}>
    </Terceiro>

Você pode usar aspas para passar valores por string ou interpolar usando `{}`, lembrando que a passagem de valor deve ser dessa forma, aqui temos um exemplo de passagem de String `prop1="valor1"`, numérico com ponto flutuante `prop2={9.8}`, booleano `prop3={true}`, objeto `prop4={{'a':1,'b':2}}`, no caso do objeto deve-se usar duas chaves, um para o objeto e outro para a interpolação, array: `prop5={[9,3,5]}`, segue um exemplo de como é um componente, arquivo [3functional](src/components/3funcional.jsx):

    import React from 'react';
    export default function(propriedade){
        console.log(propriedade);
        return(
            <div> 
                <p>{propriedade.prop1}</p>
                <p>{propriedade.prop2}</p>
                <p>{propriedade.prop3}</p>
                <p>{propriedade.prop4.a}</p>
                <p>{propriedade.prop4.b}</p>
                <p>{propriedade.prop5}</p>
                <p></p>
            </div>
        );
    }

Repare que todos os parametros são compressados dentro de um único objeto, que no caso é o parametro dessa função anônima: `export default function(propriedade)`, no caso esse parametro se torna um objeto, cuja os seus atributos são:

##### No arquivo importador
    <Terceiro 
            prop1="valor1"
            prop2={9.8}
            prop3={true}
            prop4={{'a':1,'b':2}}
            prop5={[9,3,5]}>
    </Terceiro>

##### No arquivo de componente JSX
    import React from 'react';
    export default function(propriedade){
        console.log(propriedade);
        return(
            <div> 
                <p>{propriedade.prop1}</p>
                <p>{propriedade.prop2}</p>
                <p>{propriedade.prop3}</p>
                <p>{propriedade.prop4.a}</p>
                <p>{propriedade.prop4.b}</p>
                <p>{propriedade.prop5}</p>
                <p></p>
            </div>
        );
    }

Também é possível usar a extensão *.jsx*, nesse caso não muda nada para o react, mas ajuda a *IDE* a identificar os arquivos e além disso ajuda na organização, mas apenas isso, além disso parametros passado para componentes funcionais, não podem ser modificados, eles estão em modo somente leitura.

#### Criando componentes com React.Fragment
Todos os componentes devem estar envolto de um componente raiz, sem esse componente raiz, o react não renderiza, geralmente isso é resolvendo tudo colocando dentro de uma div, mas caso isso não seja possível e os elementos devem estar fora de qualquer outro elemento e na raiz da pagina, devido uma estilização, ou pelo fato de ambos deverem ser irmãos e raiz, para isso existe o React.Fragment, a primeira forma de usar isso é colocar tudo envolto de `<>` e `</>`, porém desse método não é possível passar propriedade ao `<>`:

    import ReactDOM from 'react-dom';
    import React from 'react';
    import Primeiro from './components/1funcional'; 
    import Segundo from './components/2funcional';
    import Terceiro from './components/3funcional';
    import Quarto from './components/4funcional';

    const titulo = <h1>Titulo</h1>;

    ReactDOM.render(
        (
            <>
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
                <hr />
                <Quarto titulo="Título Quarto" subtitulo="Subtitulo do elemento 4" />
            </>
        ),
        document.getElementById('root')
    );

Além disso o elemento pode ficar sem corpo se não tiver um outro componente dentro dele, como esse `<Quarto titulo="Título Quarto" subtitulo="Subtitulo do elemento 4" />`, além disso uma outra forma de envolver componentes raiz, pode ser usando a tag `<React.Fragment><\React.Fragment>`, esse ja aceita propriedades como por exemplo `<React.Fragment prop={1}>` , como no exemplo abaixo com o arquivo [4functional](src/components/4funcional.jsx):

    import React from 'react';
    export default props => (
        <React.Fragment>
            <h1>{props.titulo}</h1>
            <h3>{props.subtitulo}</h3>
        </React.Fragment>
    );

### Exemplo com componentes funcionais em forma de container
Para que se tenha um componente dentro do outro, se faz necessário usar o atributo children que é um array que fica disponível quando se tem alguma coisa no corpo do componente, ao exemplo de:

            <Container title="Ola Mundo">
                <Primeiro></Primeiro>                
            </Container>

sendo o arquivo de Container, [arquivo](src/components/5funcional.jsx):

    import React from 'react';
    import './5funcional.css';
    export default props => {
        return(        
            <div className='classe'>
                <h1>{props.title}</h1>
                {props.children}
            </div>        
        );
    }

Nesse caso o `props.title` seria isso aqui `title="Ola Mundo"` e esse componente interno `<Primeiro></Primeiro>`, é acessado através dessa parte aqui `{props.children}`, lembrando que *children* é um array, uma vez que é o coletivo de *child*.

#### className
a palavra class é reservada no javascript, logo não se pode usar essa palavra alí, logo se faz necessário usar o `className` caso queira usar uma classe para aplicar estilo, como esta aqui [arquivo](src/components/5funcional.css):

### Herança entre componentes

    <ElementoPai 
        background="red" 
        color="white" 
        padding="10px"
        border="2px solid blue"
        boxsizing="0px 0px 10px purple"
        subtitulo="Titulo herdado do Elemento Pai"
        >
            <Quarto titulo="Elemento 4"/>
    </ElementoPai>

No caso esse atributo aqui `subtitulo="Titulo herdado do Elemento Pai"`, vai ser passado para o elemento filho, que no caso é o **Quarto**. Para isso temos no [componente pai](src/components/6funcional.jsx)

    import React from 'react';
    export default props => {
        return(
            <div style={{
                            'backgroundColor':props.background,
                            'color':props.color,
                            'padding':props.padding,
                            'border':props.border,
                            'boxSizing':props.boxsizing
            }}>
                {                   
                    React.cloneElement(props.children,props)
                }                 
            </div>
        );
    }

Todas as propriedades de estilo são processados no componente pai `'backgroundColor':props.background,'color':props.color,'padding':props.padding,'border':props.border,'boxSizing':props.boxsizing`, porém este `subtitulo="Titulo herdado do Elemento Pai"` não é usado pelo componente pai **ElementoPai** e sim pelo componente filho **Quarto**.

#### React.cloneElement
é aqui que acontece a mágica, nesse ponto `{React.cloneElement(props.children,props)}` que é renderizado o componente filho dentro do componente pai. O método `React.cloneElement`, aceita dois argumentos, um seria o filho e outro as propriedades a serem passadas para esse filho, forma de uso `React.cloneElement([componente],[propriedades])`, aonde está `[componente]` deve ser substituido pelo componente a ser renderizado, da maneira que foi feito apenas será renderizado se houver um único elemento, se houver mais da erro, uma vez que quando é passado apenas um único elemento o valor do elemento, ao passo que se passa mais de um, o objeto passa a ser um array de componentes e fazendo com que isso não funcione.

##### React.cloneElement como um array
Aqui temos um exemplo contendo mais de um elemento:

    <ElementoPais 
                background="blue" 
                color="white" 
                padding="10px"
                border="2px solid purple"
                boxsizing="0px 0px 10px purple"
                subtitulo="Titulo herdado do Elemento Pai"
                >
                    <Quarto titulo="Elemento Filho 1"/>
                    <Quarto titulo="Elemento Filho 2"/>
                    <Quarto titulo="Elemento Filho 3"/>
            </ElementoPais>

Segue a lógica referente ao componente, [link para o arquivo](src/components/7funcional.jsx):

    import React from 'react';
    export default props => {
        return(
            <div style={{
                'backgroundColor':props.background,
                'color':props.color,
                'padding':props.padding,
                'border':props.border,
                'boxSizing':props.boxsizing
            }}>
                {
                    props.children.map((el,i) => React.cloneElement(el,{...props,key:i}))
                }

            </div>
        );
    }

A nova linha altera é essa: `props.children.map(el => React.cloneElement(el,props))`, aqui estamos tratando o `props.children` como um array contendo **N** filhos e devido a isso temos acesso ao método `.map()`. Nesse caso cada elemento é retornado e a todos os filhos é passado o atributo a todos os filhos como feito aqui `React.cloneElement(el,props)`. Além disso temos o **key** que deve sempre ser informado, para que o react possa exercer um controle sobre esse elemento.

#### Com componente interno

    <Se test={(Math.random() > 0.499)?true:false}>       
        <Quarto titulo="Vardadeiro"/>
        <Senao>
            <Quarto titulo="Falso"/>
        </Senao>
    </Se>

Esse componente acima, com base na resolução dessa expressão `Math.random() > 0.499)?true:false`, ele exibi aleatóriamente verdadeiro ou falso, segue abaixo um exemplo de como funciona o componente:

    import React from 'react';
    export function Se(props){
        const senao = (Array.isArray(props.children)) ? props.children.filter(
            child => child.type && child.type.name === 'Senao'
        )[0]:(props.children.type.name === 'Senao') && props.children;

        const se = (Array.isArray(props.children)) ? props.children.filter(
            (child) => child !== senao
        ): (props.children !== senao) && props.children;

        if(props.test){
            return <div style={{backgroundColor:'blue',color:'white',padding:'10px'}}>{se}</div>;
        }else{
            return senao;
        }
    }

    export const Senao = props => <div style={{backgroundColor:'red',color:'white',padding:'10px'}}>{props.children}</div>;

    export default {Se,Senao};

##### Explicando
Detalhe importante, inicialmente estamos exportando dois componentes `export default {Se,Senao};` , que deverão ser importados da seguinte forma `import {Se,Senao} from './components/8funcional';`, além disso temos isso aqui `child.type.name === 'Senao'`, no caso o atributo `type.name` do componente pode ser usado caso você queira saber o nome da tag do componente que o usuário usou, nesse caso se houver algum com nome de `Senao`, a condição é atendida. Também temos isso aqui `(props.children.type.name === 'Senao') && props.children;`, quando se usa o operador `||` significa se o primeiro valor for `null`, `undefined`, `{}`, `[]` ou até mesmo `0` ou `false` é pego o valor a direita da expressão, por exemplo `a = false || 1`, nesse caso como o primeiro valor é falso o valor atribuído a variável `a` será o `1`. Alem disso temos o operador `&&`, esse operador é o seguinte, se o primeiro valor é verdadeiro, é atribuído o segundo valor a variável. Por exemplo `b = false && 1` nesse caso o `b` **NÃO** terá valor algum, pois a primeira expressão é falsa, agora se fosse `c = true && 1` nesse caso o `c` recebe o valor `1`, uma vez que a primeira expressão é verdadeira, lembre-se disso quando for usar o `&&` ou `||`, além disso temos o `(expressão booleana)?(condição verdadeira):(condição falsa);`, essa funciona como qualquer expressão ternária, segue o arquivo exemplo [8funcional.jsx](./src/components/8funcional.jsx).

#### Componente para repetir elementos

    <Repetir repeat={parseInt(Math.random() * 5)}>
        <li>{"valor"}</li>
    </Repetir>         

Se você quiser imprimir algo no documento, fazer uma espécie de `document.write`, você pode usar a estratégia do `{""}`, esse componente repete o componente interno de uma a nove vezes aleatóriamente.

##### O Conteúdo do componente que faz as repetições de elementos

    import React from 'react';
    export default function(props){        
        const times = props.repeat || 1;
        const child = [props.children];
        for(let i=1;i<times;i++){
            child[i] = props.children;
        }
        return(<ol>{child}</ol>);                
    }

[Arquivo 9funcional](./src/components/9funcional.jsx), nesse caso o react está criando uma chave para o elemento de maneira automática, mas nem sempre isso é possível e por isso é bom ficar de olho no console do navegador.

### Componente controlado e funcional com Estado
[state.jsx](./src/complex/state.jsx)

#### Chamando o Componente
    <State value="valor padrao"/>

#### Arquivo JSX
    import React from 'react';
    export default function(props){
        const [variavel,funcao] = React.useState(props.value);    
        const mudanca = event => funcao(event.target.value);
        return(
            <div style={{
                    backgroundColor:'purple',
                    color:'white',
                    border:'2px solid violet',
                    boxShadow:'0px 0px 25px violet',
                    padding:'10px'                
                }}>        
                <h2>{variavel}</h2>
                <input type='text' value={variavel} onChange={mudanca}/>            
            </div>
        );
    }

Inicialmente sempre que for criar um componente é bom usar como padrão um nome capitalizado, todos os componentes devem ser capitalizados, ao passo que os componentes com letra minuscula sempre será renderizado como um HTML.

#### Estado
`const [variavel,funcao] = React.useState(props.value);` Aqui temos um exemplo de Estado, no caso o método **useState**, ele está presente apartir da versão 16.8 do react. No caso esse método recebe como parametro o valor inicial e retorna um array, contendo a variável para leitura e uma função ao qual atualiza o valor e atravé desse método você atualiza o valor de alguma variável, em resumo: aqui criamos uma variavel com status cuja o valor inicial vem de **props.value** `const [variavel,funcao] = React.useState(props.value)`. o primeiro elemento retornado do array é o `variavel`, essa deve ser a variável para a leitura, toda vez que você quiser ler o valor de uma variável, você vai usar esse primeiro valor criado pelo array. No segundo você tem uma função **setter** para fazer alguma atualização caso necessário, no caso essa atualização é feita aqui `const mudanca = event => funcao(event.target.value);`, no caso a função `mudanca` pega o atributo `value` dentro de `target` e dentro da variável passada, será usada como argumento para a função **setter** definida aqui `const [variavel,funcao] = React.useState(props.value)`. Por fim aqui nesse componente `<input type='text' value={variavel} onChange={mudanca}/> ` fazemos o uso da leitura de valor e a função onchange faz a mudança.

#### Componente Controlado
No caso um componente do tipo input, ou deve ter um evento onchange tratado com uma função ou ser um componente somente leitura ou até mesmo ter como value o valor `undefined`, no primeiro caso temos um componente com estado que altera valor, isso quando o valor é atualizado, no segundo caso temos um componente que apenas recebe o valor, por fim temos o caso com o undefined no valor que significa que esse campo não deve ser mapeado pelo react, especificamente o `undefined` e não `null` ou `false`, nesse caso essa equivalência não existe.

### Componente de classe

    import React from 'react';
    export default class Classe extends React.Component{
        state = {
            value: this.props.start || 0,
            step: this.props.step || 1
        };

        render(){
            return(
                <div style={{
                    backgroundColor:"cyan",
                    padding:"20px",
                    border:'5px solid blue',
                    boxShadow:'10px 10px 50px blue'                                
                }}>
                    <h1>{this.state.value}</h1>
                    <button onClick={() => this.setState({value:this.state.value + 1})}>{'+'}</button>
                    <button onClick={() => this.setState({value:this.state.value - 1})}>{'-'}</button>
                </div>
            );
        }
    }

#### Explicando
Todo componente de conteúdo extende de `React.Componente`, como visto aqui `export default class Classe extends React.Component`, dessa classe vem o atributo `state` e o método `render`. Antes os componentes funcionais não eram capazes de guardar estado, porém hoje eles tem hooks, no entanto a diferença desse tipo de componente para um componente funcional, é que o componente de classe permite controlar o ciclo de vida de um componente.

##### Atributo state

    state = {
        value: this.props.start || 0,
        step: this.props.step || 1
    };

O atributo state cria atributos de estado no react. Ou seja todo os valores que trabalham com estado precisam ficar dentro desse atributo, que no caso pode ser um objeto, como é o caso, mas poderia ser array ou um outro valor qualquer, mas geralmente se usa como um objeto. Caso queira alterar algum valor, existe o `setState` do método pai, como visto aqui `() => this.setState({value:this.state.value + 1})}` ou aqui `() => this.setState({value:this.state.value - 1})`, lembrando que o arrow function é usado pois ele amarra o contexto léxico do this, e nesses métodos é feito a atualização dos valores que tem estado, que no caso é o objeto passado no atributo state.

##### Método Render

    render(){
            return(
                <div style={{
                    backgroundColor:"cyan",
                    padding:"20px",
                    border:'5px solid blue',
                    boxShadow:'10px 10px 50px blue'                                
                }}>
                    <h1>{this.state.value}</h1>
                    <button onClick={() => this.setState({value:this.state.value + 1})}>{'+'}</button>
                    <button onClick={() => this.setState({value:this.state.value - 1})}>{'-'}</button>
                </div>
            );
        }

Todos os componentes de classe deve reescrever esse método, pois é ele que retorna o componente, esse método é equivalente ao **return** dos componentes funcionais.