const http = require('http');
const server = http.createServer(
    function(request,response){
        response.writeHead(200,{'Content-Type':"text/html"});
        response.write('<h1>Ola Mundo</h1>');        
        response.end();
    }
).listen(3002,'localhost');