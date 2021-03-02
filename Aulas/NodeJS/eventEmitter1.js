const {EventEmitter} = require('events');

const emitter = new EventEmitter();

emitter.on('evento', function(parametro){
    console.log('Evento disparado, com o parametro'+parametro);
});

emitter.emit('evento','parametro123');