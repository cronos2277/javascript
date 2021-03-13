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
            const range = request.headers.range;
            const positions = range.replace(/bytes=/,'').split('-');
            const start = parseInt(positions[0],10);     
            
            fs.stat(file,function(error,stat){
                if(error){
                    throw new Error(
                        `O arquivo ${filepath} existe ou tem as permissões corretas?
                        \nErro:${error.message},\nCodigo:${error.code}\n`);                     
                }
                let total = stat.size;
                let end = positions[1] ? parseInt(positions[1],10) : total - 1;
                let chunksize = (end-start) + 1;

                response.writeHead(200,{
                    'Content-Range': 'bytes'+ start +'-'+ end + '/' + total,
                    'Accept-Ranges': 'bytes',
                    'Content-Lenght':chunksize,
                    'Content-Type':'video/mp4'
                });

                const stream = fs.createReadStream(file,{start,end})
                .on('open', () => stream.pipe(response))
                .on('error', error => response.end(error))
            });
        }
    }
).listen(port);