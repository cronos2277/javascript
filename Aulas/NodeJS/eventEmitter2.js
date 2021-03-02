const {EventEmitter} = require('events');
const emitter = new EventEmitter();    
const callback1 = parametro => console.log('Evento disparado da callback1, com o parametro'+parametro);
const callback2 = parametro => console.log('Evento disparado da callback2, com o parametro'+parametro);

emitter.on('evento', callback1);
emitter.on('evento', callback2);
emitter.emit('evento','parametro1');
emitter.emit('evento','parametro2');

//removendo uma callback do Evento
emitter.removeListener('evento',callback1);
emitter.emit('evento','parametro3');