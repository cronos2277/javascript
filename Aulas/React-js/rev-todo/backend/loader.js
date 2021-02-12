const server = require('./server');
require('./database');
require('./routes')(server);