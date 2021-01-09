import React from 'react';
import fetching from './customHook';
export default function (props){
    const response = fetching('https://jsonplaceholder.typicode.com/todos/');
    const showStates = function showStates(arr,pageInit,pageEnd){
        const page = arr.data.map(el => <li key={el.id}>{el.title}</li>);
        return page.filter((e,i) => i >= pageInit && i <= pageEnd);        
    };
    return(
        <div className="Estados">
            <ol>
                {response.ready ? showStates(response,1,15) : false}
            </ol>
        </div>
    );
}