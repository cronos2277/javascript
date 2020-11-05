const settings = {
    port:4444,
    clientEventName:'message'
}
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => socket.on(settings.clientEventName,
    function message(msg){
        console.log(msg);
        io.emit(settings.clientEventName,msg);
    }
));

http.listen(settings.port, () => console.log(`Listening on ${settings.port}`));