const express = require('express');
const app = express();
const port = 5011;
const li = txt => `<li>${txt}</li>`;

app.all('/', (req,res,next) => {
    console.log('CB1');
    res.writeHead(200, {         
        'Content-Type': 'text/html'
    });
    res.write('<ol style="margin:5px;font-size:48px;">');    
    next();
    //Depois do next, nao envie nada ao cliente...
    console.log('Numero aleatorio: '+Math.random());
    //res.write('vai dar ruim se descomentar');
});

app.all('/',function(req,res,next){
    console.log('CB2');
    res.write(li('Primeira callback'));    
    next();        
});

app.all('/',function(req,res,next){
    console.log('CB3');
    res.write(li('Segunda callback'));
    next();       
});

app.all('/',function(req,res,next){
    console.log('CB4');
    res.write(li('Terceiro callback'));
    next();    
});

app.all('/', (req,res) => {
    console.log('CB5');
    res.end('</ol>');
});

app.listen(port, () => console.log(`Ouvindo na porta: ${port}`));