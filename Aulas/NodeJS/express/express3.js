const express = require('express');
const app = express();
const port = 5003;

app.get('/:id', (req,res,nex) => res.send(`<h1>com Parametros: ${req.params.id} </h1>`));
app.get('/', (req,res,nex) => res.send('<h1>Sem parametros </h1>')).listen(port);

console.log('executando');