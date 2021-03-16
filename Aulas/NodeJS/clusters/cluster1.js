const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){

    for(let i = 0;i < numCPUs;i++){
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log(`worker ${worker.process.pid} is online`);
    });
    
}else{
    http.createServer(function(req,res){
        res.writeHead(200);
        res.write(`Numero de CPU:${numCPUs}\n`);
        res.end(`process ${process.pid} says hello`);
    }).listen(4005);
}