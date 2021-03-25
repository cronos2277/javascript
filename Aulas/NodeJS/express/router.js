const express = require('express');
const router = express.Router();
const app = express();
const port = 5013;

router.use('/',function(req,res,next){    
    if(req.method === "GET"){
        res.writeHead(200, {         
            'Content-Type': 'text/html'                  
        });    
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'POST'}).then(e => e.text()).then(console.log)">POST</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PUT'}).then(e => e.text()).then(console.log)">PUT</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'PATCH'}).then(e => e.text()).then(console.log)">PATCH</button>`);
        res.write(`<button onclick="fetch('http://localhost:${port}',{method:'DELETE'}).then(e => e.text()).then(console.log)">DELETE</button>`);    
    }
    next();
});

const callback = function callback(req,res){
    res.json(
        {
            hostname:req.hostname,
            ip: req.ip,
            method: req.method,            
        }
    );    
}

router.post('/:p1?/:p2?',callback);
router.put('/:p1?/:p2?',callback);
router.patch('/:p1?/:p2?',callback);
router.delete('/:p1?/:p2?',callback);

app.use('/',router);
app.listen(port, () => console.log(`Ouvindo na porta ${port}`));