import React from 'react';
export default props => {
    return(
        <div style={{
                        'backgroundColor':props.background,
                        'color':props.color,
                        'padding':props.padding,
                        'border':props.border,
                        'boxSizing':props.boxsizing
        }}>
            {                   
                React.cloneElement(props.children,props)
            }            
        </div>
    );
}