# React
## React JS
[Arquivo do projeto](./reactjs)
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

O primeiro parametro é o componente a ser renderizado e o segundo é aonde esse componente deve ser renderizado, no caso dentro de uma div que tenha o id root, esse arquivo está dentro da pasta [public](./reactjs/public/), no caso o arquivo na [public](./reactjs/public/) o arquivo [index.html](./reactjs/public/index.html).

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

Um componente é importado no react como tag, repare esse componente [import Primeiro from './components/1funcional';](reactjs/src/components/1funcional.js), que foi nomeado `<Primeiro>` como  se refere a esse:

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

Com relação ao segundo import [import Segundo from './components/2funcional';](reactjs/src/components/2funcional.js), sendo o conteudo desse componente:

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

Você pode usar aspas para passar valores por string ou interpolar usando `{}`, lembrando que a passagem de valor deve ser dessa forma, aqui temos um exemplo de passagem de String `prop1="valor1"`, numérico com ponto flutuante `prop2={9.8}`, booleano `prop3={true}`, objeto `prop4={{'a':1,'b':2}}`, no caso do objeto deve-se usar duas chaves, um para o objeto e outro para a interpolação, array: `prop5={[9,3,5]}`, segue um exemplo de como é um componente, arquivo [3functional](reactjs/src/components/3funcional.jsx):

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

Além disso o elemento pode ficar sem corpo se não tiver um outro componente dentro dele, como esse `<Quarto titulo="Título Quarto" subtitulo="Subtitulo do elemento 4" />`, além disso uma outra forma de envolver componentes raiz, pode ser usando a tag `<React.Fragment><\React.Fragment>`, esse ja aceita propriedades como por exemplo `<React.Fragment prop={1}>` , como no exemplo abaixo com o arquivo [4functional](reactjs/src/components/4funcional.jsx):

    import React from 'react';
    export default props => (
        <React.Fragment>
            <h1>{props.titulo}</h1>
            <h3>{props.subtitulo}</h3>
        </React.Fragment>
    );