import React from 'react' 
export default class Classe extends React.Component{
	/*
		Caso você use o state, o mesmo deve ser inicializado.
		Para inicializar você passa um objeto ao state, e uma vez
		feito isso você pode permitir que através do state, que 
		os atributos customizaveis no componente possam ser modificado.
		No caso do props, é um atributo que vem da classe pai, e é dessa
		forma que você pega os atributos que são passados nos componentes.
		Temos também o método render(), esse método diz como os componentes
		são renderizados e o mesmo deve retornar algum valor.
	*/
	state = {
	//Inicializando a variável leitura e estado, que assim como todos os 
	//atributos estão localizados em this.props.
		leitura: this.props.leitura,
		estado: this.props.estado
	}
	
	constructor(props){
	//É uma boa inicializar da classe pai a props, pois assim pode se pegar
	//alguns atribiutos de lá.
		super(props);
	}

	mudarEstado(elemento){
	/*
		Esse método é o responsável por permitir com que o componente seja
		atualizado. O this.setState ela atualiza o estado do componente e 
		consequentemente com isso o elemento é atualizado.
	*/
		console.log(elemento.target.value);
		this.setState({estado: elemento.target.value});
	}
	
	render(){
	/*
		Esse é o metodo que renderiza componentes do React, depois de inicializado
		no state se pega as variaveis aqui.
	*/
		const {leitura} = this.props;
		const {estado} = this.state;
		/*
			elementos do React são iguais ao do html. porém a sintaxe diferente
			do Jquery e do html, você tem o "on" e depois em maiusculo o evento 
			que você quer, no caso aqui em baixo Change(). No caso foi usando uma função
			arrow, caso você pense em usar uma callback ou uma função construida como
			da maneira clássica, use a .bind() para referenciar o this correto.
		*/
		return (<div>
					<hr/>
					<h3>Exemplo do this.props: {leitura}</h3>
					<input type='input' value={leitura}/>
					<hr/>
					<h3>Exemplo do this.state: {estado}</h3>
					
					<input type="input" value={estado} onChange ={elemento => this.mudarEstado(elemento)}/>
				</div>);
	}
}
/*
	A unica forma de você atualizar os componentes e permitir interação do lado do cliente,
	é alterando o estado dos elementos, primeiro iniciando eles, depois setando o estado.
	você precisa setar o estado para isso acontecer, isso é interessante pois permite um maior nível de 
	segurança. De toda forma o elemento precisa mudar de estado para o cliente perceber a diferença.
*/
