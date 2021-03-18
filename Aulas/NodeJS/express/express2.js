const express = require('express');
const app = express();
const port = 5002;

app.get('/',function(req,res,next){    
    res.write('<h1>Abra o console para entender o exemplo</h1>');
    res.write(`<button onclick="fetch('http://localhost:${port}',{method:'POST'}).then(console.log);">POST</button>`);
    res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PUT'}).then(console.log);">PUT</button>`);
    res.write(`<button onclick="fetch('http://localhost:${port}',{method:'DELETE'}).then(console.log);">DELETE</button>`);
    next();
}).listen(port)

app.post('/',function(req,res,next){
    console.log('Requisicao POST');
    res.sendStatus(201);
    next();
});

app.put('/',function(req,res,next){
    console.log('Requisicao PUT');
    res.sendStatus(202);
    next();
});

app.delete('/',function(req,res,next){
    console.log('Requisicao DELETE');
    res.sendStatus(204);
    next();
});