const http = require('http');
const server = http.createServer(
    function(request,response){
        console.log('Metodo Usado:',request.method);
        console.log('URL do Cliente:',request.url);
        response.end(JSON.stringify({...request.headers}));
    }
);

server.listen(3003);