import './Main.css';
import React from 'react';
import Header from './Header';
export default props =>
<React.Fragment>
	<Header icon={props.icon} title={props.title} subtitle={props.subtitle}/>
	<main className="content container-fluid">
		<div className="p-3 mt-3">
			{props.children}
		</div>
	</main>
</React.Fragment>
