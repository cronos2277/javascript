const io = require('socket.io')(4001,{
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
        credentials: true
    }
});

io.on('connect',function(socket){
    socket.on('evento',function(data){
        console.log(`recebido ${data} do cliente`);
        socket.emit('server',`resposta do servidor pelo "emit" as ${Date()}`);
        socket.broadcast.emit('server',`resposta do servidor pelo "broadcast.emit" as ${Date()}`);        
        io.sockets.emit('server',`resposta do servidor pelo "io.sockets.emit" as ${Date()}`);        
    });
});