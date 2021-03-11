const port = 4004;
const host = 'http://localhost';
const filepath = 'video.mp4';
const http = require('http');
const path = require('path');
const fs = require('fs');
http.createServer(
    function(request,response){
        if(request.url !== `/${filepath}`){
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end(`<video src="${host}:${port}/${filepath}" width='50%'  controls></video>`);
        }else{
            //logica
        }
    }
).listen(port);