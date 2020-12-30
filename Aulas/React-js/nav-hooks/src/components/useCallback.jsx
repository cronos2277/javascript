import React from 'react';

function ajax(){
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://time.jsontest.com/',false);
    xhr.send();
    return xhr;
}

export default function (props){   
    console.log('%crenderizando componente PAI','background-color:blue;color:white;font-size:14px;padding:10px');
    const [dados,setDados] = React.useState(ajax());    
    const fn = React.useCallback(function(){
        setDados(ajax());
    },[setDados]);

    console.log(dados.responseText);
    return(
        <div>
            <h2>Data: {dados.responseText}</h2>
            <Inner fn={fn} />
        </div>
    );
}

const Inner = React.memo(function MyComponent(props) {
    console.log('%crenderizando FILHO, repare que será apenas uma vez','background-color:green;color:white;font-size:14px;padding:10px');
    return <div><button onClick={props.fn}>Atualizar</button></div>
});

