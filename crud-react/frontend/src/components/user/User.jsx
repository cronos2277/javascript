import React, {Component} from 'react';
import Main from '../template/Main';
const headerProps = {
	icon: 'users',
	title: 'usuários',
	subtitle: 'Cadastros de usuários: Incluir, Listar, Alterar e Excluir'
}
export default class User extends Component{
	render(){
		return(
			<Main {...headerProps} >
				Cadastro de Usuário
			</Main>
		)
	}
}
