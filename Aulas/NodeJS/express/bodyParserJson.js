const body = require('body-parser');
const express = require('express');
const app = express();

app.use(body.json());
app.use(body.urlencoded({extended:true}))

app.route('/')
    .get(function(req,res,next){
        res.write(`
            <html>
                <body>
                    <form method='POST' action='/'>
                        <input name='valor' />
                        <input type='submit' value='enviar' />
                    </form>
                </body>
            </html>
        `);
    })
    .post(function(req,res,next){
        res.send(req.body);
        next();
    });

app.listen(5010, () => console.log('Ouvindo o body parser json'));
