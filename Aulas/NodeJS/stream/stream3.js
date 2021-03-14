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
            var file = path.resolve(__dirname,filepath);
            var range = request.headers.range;
            var positions = range.replace(/bytes=/,'').split('-');
            var start = parseInt(positions[0],10);                          
            fs.stat(file,function(error,stat){
                if(error){
                    throw new Error(
                        `O arquivo ${filepath} existe ou tem as permissões corretas?
                        \nErro:${error.message},\nCodigo:${error.code}\n`);                    
                }

                var total = stat.size;                
                var end = (positions[1]) ? parseInt(positions[1],10) : total - 1;
                var chunksize = (end-start) + 1;
                

                response.writeHead(200,{
                    'Content-Range': 'bytes '+ start +'-'+ end + '/' + total,
                    'Accept-Ranges': 'bytes',
                    'Content-Lenght':chunksize,
                    'Content-Type':'video/mp4'
                });

                
                var stream = fs.createReadStream(file,{start,end})
                .on('open', function(){
                    console.log({start,total,end,chunksize});
                    stream.pipe(response);
                })
                .on('error', error => response.end(error))
            });
        }
    }
).listen(port);