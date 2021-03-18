const express = require('express');
const app = express();

app.get('/',function(request,response){
    console.log(request)
    response.send('<h1>Exemplo com Express Basico</h1>');
}).listen(5001);