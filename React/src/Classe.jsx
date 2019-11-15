import React from 'react' 
export default class Classe extends React.Component{
	
	state = {
		leitura: this.props.leitura,
		estado: this.props.estado
	}
	
	constructor(props){
		super(props);
	}

	mudarEstado(elemento){
		console.log(elemento.target.value);
		this.setState({estado: elemento.target.value});
	}
	
	render(){
		const {leitura} = this.props;
		const {estado} = this.state;
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
