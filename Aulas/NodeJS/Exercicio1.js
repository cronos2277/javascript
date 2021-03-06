
const http = require('http');
const {EventEmitter} = require('events');
const {exists,writeFile,readFile} = require('fs');

const event = new EventEmitter();
exists('file.html',function(fileExists){
    if(!fileExists){
        const text = `<h1>Ola Mundo</h1>`;
        writeFile('file.html',text,function(erro){
            if(erro){
                console.error(erro);
            }else{
                console.log('Arquivo Criado!')
                event.emit('reading');
            }
        })
    }else{
        console.log('Arquivo já existe file.html!');
        event.emit('reading');
    }    
});

event.once('reading',function(){
    readFile('file.html',function(error,data){
        if(error){
            console.error('Erro ao ler');
        }else{
            event.emit('start',data.toString());
        }
    });
});

event.once('start',function(data){
    http.createServer(function(request,response){
        response.end(data);
    })
    .listen(2999);
});
