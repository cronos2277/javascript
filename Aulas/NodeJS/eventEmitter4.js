const {EventEmitter} = require('events');

const emitter = new EventEmitter();

emitter.once('evento', function(parametro){
    console.log('Evento disparado, com o parametro'+parametro);
});

emitter.emit('evento','parametro1');
emitter.emit('evento','parametro2');