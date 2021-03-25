const express = require('express');
const app = express();
const port = 5012;

app.use(function(req,res,next){
    if(req.method === 'GET'){
        res.writeHead(200, {         
            'Content-Type': 'text/html'                  
        });

        res.write('<h1>GET</h1>');
        res.write('<br />');
        res.write(`<button onclick="fetch('http://localhost:5012',{method:'POST'}).then(e => e.text()).then(console.log)">POST</button>`);
        res.write(`<button onclick="fetch('http://localhost:5012',{method:'PUT'}).then(e => e.text()).then(console.log)">PUT</button>`);
        res.write(`<button onclick="fetch('http://localhost:5012',{method:'PATCH'}).then(e => e.text()).then(console.log)">PATCH</button>`);
        res.write(`<button onclick="fetch('http://localhost:5012',{method:'DELETE'}).then(e => e.text()).then(console.log)">DELETE</button>`);
    }else{
        res.writeHead(200, {         
            'Content-Type': 'text/plain'            
        });
        res.write(`Método: ${req.method}`);
        console.log(`Método ${req.method} usado`);
    }
    next();
});

app.use('/',(req,res) => res.end());
app.listen(port, () => console.log(`ouvindo na porta ${port}`));
