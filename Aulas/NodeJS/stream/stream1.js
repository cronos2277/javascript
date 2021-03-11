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
            const file = path.resolve(__dirname,filepath);
            fs.readFile(file,function(error,data){
                if(error){
                    response.writeHead(500);
                    response.end(error);
                }else{
                    response.writeHead(200,{'Content-Type':"video/mp4"});
                    response.end(data);
                }
            });
        }
    }
).listen(port);