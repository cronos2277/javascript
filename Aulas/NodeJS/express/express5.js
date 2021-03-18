const express = require('express');
const app = express();
const port = 5005;

app.route('/')
    .get(function(req,res,next){        
        res.write(`
            <button onclick="fetch('http://localhost:${port}/',{method:'POST'})
            .then(console.log)">POST</button>`
        );        

        res.write(`
            <button onclick="fetch('http://localhost:${port}/',{method:'PUT'})
            .then(console.log)">PUT</button>`
        );

        res.write(`
            <button onclick="fetch('http://localhost:${port}/',{method:'DELETE'})
            .then(console.log)">DELETE</button>`
        );
        next();        
    })
    .post((req,res) => res.sendStatus(201))
    .put((req,res) => res.sendStatus(202))
    .delete((req,res) => res.sendStatus(204));

app.listen(port, () => console.log('Escutando'));