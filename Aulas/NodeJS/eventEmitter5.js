const {EventEmitter} = require('events');

class Evento extends EventEmitter{
    callback1(){
        console.log('Callback 1');
    }

    callback2(){
        console.log('Callback 2');
    }
}

const emitter = new Evento();

emitter.once('callback',emitter.callback1);
emitter.once('callback',emitter.callback2);

emitter.emit('callback');

// Nao sera executado
emitter.emit('callback');