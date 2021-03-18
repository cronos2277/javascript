const express = require('express');
const app = express();

app.set('views','./');
app.set('view engine','jade');

app.get('/', (req,res) => res.render('index',{a:1,b:2}));

app.listen(5007, () => console.log('Escutando...'));
