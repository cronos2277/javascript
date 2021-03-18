const express = require('express');
const app = express();

function fn(arg = "Raiz"){
    let str = `
        
    <p>
        <a href="http://localhost:5000/index1.html">index1.html</a>
    </p>
    <p>
        <a href="http://localhost:5000/index2.html">index2.html</a>
    </p>        
    `;
    str += `<p>${arg}</p>`;
    return str;
}

app.use(express.static('use'));

app.get('/:p?', (req,resp) => resp.send(fn(req.params.p)))
.listen(5000);