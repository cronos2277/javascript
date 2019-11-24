import './Nav.css';
import React from 'react';
const Itens = item => <a href={item.link} className={item.styles}>{item.text}</a>;
export default props =>
<aside className="menu-area">
	<nav className="menu">
		<Itens link="#" styles="fa fa-home" text="Inicio"/>
		<Itens link="#" styles="fa fa-users" text="Usuarios"/>				
	</nav>
</aside>
