const cluster = require('cluster');
const cpus = require('os').cpus().length;

if(cluster.isMaster){
    let workers = [];
    for(i=0;i<cpus;i++){        
        cluster.fork();
        workers[i] = cluster.fork();
    } 
    
    cluster.on('online',function(worker){
        console.log(`ONLINE: ${worker.process.pid}`)
    });

    cluster.on('disconnect',function(){
        console.log(`DISCONNECT PELO MASTER`)
    });

    cluster.on('exit',function(){
        console.log(`EXIT PELO MASTER`)
    });

    cluster.on('fork',function(worker){                      
        console.log('Fork');        
    });        

    const time3 = setTimeout(function(){
        workers.forEach(worker => worker.on('disconnect',function(){
            console.log(`DISCONNECT PELO WORKER`);
        }));

        workers.forEach(w => w.disconnect());
        clearTimeout(time3);
    },2000);
    
    const time4 = setTimeout(function(){        
        workers.forEach(w => w.destroy(0,'SIGHUP'));      
        clearTimeout(time4);        
    },3000);    
}
