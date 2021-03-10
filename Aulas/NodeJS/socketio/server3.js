const io = require('socket.io')(4001,{
    cors:{
        origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["content-type"],
            credentials: false
    }
});

io.on('connect',function(socket){
    socket.on('evento',function(msg){
        socket.emit('server',`recebido ${msg}`);
    });    
    
});

io.of('/rota',function(socket){
    console.log('rota acessada');
    socket.emit('server','"/rota" acessado');
});

io.use(function(socket,next){
    console.log('Interceptado');
    next();
});

io.of('/check')
.on('connect',function(socket){
    socket.emit('server','conectado a rota check');
})
.use(function(socket,next){
    if(Math.random() > 0.49){
        socket.emit('server','tudo certo');
        next();
    }else{
        console.log('erro aleatório');
        socket.emit('server','erro aleatório');
        next(new Error('Erro Aleatorio'));
    }
});