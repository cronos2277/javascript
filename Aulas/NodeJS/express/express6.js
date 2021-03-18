const express = require('express');
const app = express();

app.set('variavel',`Valor randomico ${Math.random()}`);

app.get('/',(req,res) => res.send(app.get('variavel')));

app.listen(5006, () => console.log('Ouvindo... '));