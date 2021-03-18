const express = require('express');
const app = express();

app.get('/ab?cd', (req,res,next) => res.send('YES OK!'));
app.get('/', (req,res,next) => res.send('NOT OK!')).listen(5004);