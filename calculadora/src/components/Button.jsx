import React from 'react'
import './Button.css'

function isop(props){
	let classes = "button";
	classes += props.operation ? ' operation' : '';
	classes += props.double ? ' double' : '';
	classes += props.triple ? ' triple' : '';
	return classes;
}
export default props => 
	<button className={isop(props)}
onClick={e=>props.click(props.label)}>{props.label}</button>
