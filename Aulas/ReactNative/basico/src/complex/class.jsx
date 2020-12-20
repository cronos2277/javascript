import React from 'react';
export default class Classe extends React.Component{
    state = {
        value: this.props.start || 0,
        step: this.props.step || 1
    };

    render(){
        return(
            <div style={{
                backgroundColor:"cyan",
                padding:"20px",
                border:'5px solid blue',
                boxShadow:'10px 10px 50px blue'                                
            }}>
                <h1>{this.state.value}</h1>
                <button onClick={() => this.setState({value:this.state.value + 1})}>{'+'}</button>
                <button onClick={() => this.setState({value:this.state.value - 1})}>{'-'}</button>
            </div>
        );
    }
}