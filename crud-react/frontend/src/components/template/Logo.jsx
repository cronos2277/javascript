import './Logo.css';
import logo from '../../assets/imgs/logo.svg';
import React from 'react';
export default props => 
<aside className="logo">
	<a href="/">
		<img src={logo} alt="logo" />
	</a>
</aside>
