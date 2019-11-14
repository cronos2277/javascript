//é necessário importar isso para o react funcionar
import React from 'react' 
//Caso você queira renderizar algum componente, você precisa importar isso.
import ReactDOM from 'react-dom'
/*
	O ReactDOM serve para renderizar conteudo nas páginas, você passa algum conteudo
	em jsx, que é o tipo de dados que o React processa e depois seleciona
	o componente dom, aonde o mesmo será renderizado. O JSX tem uma sintaxe identica
	ao html, mas a mesma é processada e convertida para javascript depois,
	* além disso todas as tags devem ser fechadas, exemplo <div></div> e <img/>
	* e tags custumizaveis devem começar sempre com letras maiuscula, padrão exigido
	pelo react. Resumindo: <Minhatag /> Do mais você pode colocar atributo nele assim
	como se faz em um html, porém a sintaxe é diferente, você precisa colocar como um 
	objeto dentro de outro objeto, ex: <h1 style={{color:'red'}}> </h1>, Inicialmente
	você precisa colocar dentro de chaves e ai você coloca dentro dessas chaves um objeto
	que vai ter a propriedade do elemento, no exemplo em questão temos a cor vermelha no H1.
 */
 //Ex: ReactDOM.render(jsx componente, node do html).
ReactDOM.render(<h1 style={{color:'red'}}>Exemplo de Componente</h1>, document.getElementById("root"));
//Você também pode usar variáveis para isso ou constantes para armazenar os jsx.
const listas = <ul><li>Primeiro Elemento</li><li>Segundo Elemento</li></ul>;
ReactDOM.render(listas,document.getElementById("lista"));

/*
	Esse exemplo do react ele abre um servidor na porta 3000, e o html em questão
	esta na pasta public, enquanto os recursos estão na SRC. O react organiza tudo
	ele compila o javascript e coloca os componentes jsx dentro dos nós html
	informado aqui pelo javascript, veja também que tudo é atualizado em tempo real
	nesse projeto. Lembrando sempre que:
	* import React from 'react' => necessário para funcionar o jsx, é isso que vai processar jsx.
	* import ReactDOM from 'react-dom' necessário caso queira inserir algum jsx na DOM.
 */
