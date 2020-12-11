import ReactDOM from 'react-dom';
import React from 'react';
import Primeiro from './components/1funcional'; 
import Segundo from './components/2funcional';
import Terceiro from './components/3funcional';
import Quarto from './components/4funcional';
import Container from './components/5funcional';
import ElementoPai from './components/6funcional';
import ElementoPais from './components/7funcional';
import {Se,Senao} from './components/8funcional';
import Repetir from './components/9funcional';

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
            <Container title="Ola Mundo">
                <Primeiro></Primeiro>                
            </Container>
            <hr/>
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

            <Se test={(Math.random() > 0.499)?true:false}>       
                    <Quarto titulo="Vardadeiro"/>
                <Senao>
                    <Quarto titulo="Falso"/>
                </Senao>
            </Se>
            <Repetir repeat={parseInt(Math.random() * 5)}>             
                <span value='repetição'/>              
            </Repetir>
        </>
    ),
    document.getElementById('root')
);