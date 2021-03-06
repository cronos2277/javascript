const http = require('http');
const url = require('url');

http.createServer(function(request,response){
    response.end(JSON.stringify({...url.parse(request.url)}));
}).listen(3004);