const express1 = require('express');

//comparando os objetos routers
const router1 = express1.Router();
const router2 = express1.Router();
console.log('router1 é igual a router2:',(router1 === router2)?'sim':'não');

//comparando as instancias
const server1 = express1();
const server2 = express1();
console.log('server1 é igual a server2:',(server1 === server2)?'sim':'não');

//Comparando o Express
const express2 = require('express');
console.log('express1 é igual a express2:',(express1 === express2)?'sim':'não');