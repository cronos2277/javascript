import React from 'react'
export default function(url=null, method='get'){
    const [response,setResponse] = React.useState({
        data: null,
        ready: false        
    });  
    
    if(url){
        React.useEffect(function(){
            fetch(url,{method})
            .then(response => response.json())
            .then(response => setResponse({
                data:response,
                ready: true                
            })).catch(error => setResponse({
                data: error,                
                ready:false
            }));
        },[url,method]);        
    }else{
        console.error('url must be passed!')
    }

    return response;
}