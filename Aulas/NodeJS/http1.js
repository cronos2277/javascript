const http = require('http');
const server = http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'application/json'});
    const json = JSON.stringify(
        {
            VALOR:"EXEMPLO VALOR",
            NUMERO:parseInt(Math.random() * 1000)
        }
    );        
    response.end(json);    
});
server.listen(3001);