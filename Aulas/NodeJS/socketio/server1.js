const socket = require('socket.io')(4001,
    {
        cors: {
            origin: "http://127.0.0.1:5500",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: true
        },
        }
    );

socket.on('connect',function(arg){
    console.log('Antes');
    arg.on('evento',function(data){
        console.log(data + 'Antes');
    });
});

socket.on('connection',function(arg){
    console.log('Depois');

    arg.on('evento',function(data){
        console.log(data + 'Depois');
    });
});