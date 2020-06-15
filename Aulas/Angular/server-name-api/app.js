const mongoose = require('mongoose');
const Person = require('./person.js');
const bodyParser = require('body-parser');
const cors =  require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


mongoose.connect('mongodb://localhost:27017/namesdb', { useNewUrlParser: true} );

app.get('/', (req, res) => { 

    Person.find({}).lean().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                error: err,
                message: 'Internal error.'
            });
        }
        return res.status(200).json(data);
    }); 
})

app.get('/:text', (req, res) => { 

    let text = req.params.text;

    var query = { $or: [
        { firstname: { $regex: text, $options: 'i' } },
        { lastname: { $regex: text, $options: 'i' } },
        { country: { $regex: text, $options: 'i' } },
        { email: { $regex: text, $options: 'i' } },
        { city: { $regex: text, $options: 'i' } },
    ]};

    Person.find(query).lean().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                error: err,
                message: 'Internal error.'
            });
        }
        setTimeout(() => {
            return res.status(200).json(data)
        });
    }); 
})


app.delete('/:id', function (req, res) {
    Person.deleteOne({_id: req.params.id},  
        (err) => {
            if(err)
                res.status(500).send(err);
            else
                res.status(200).send({});
        })
});

app.post('/', function (req, res) {
    p = new Person({
        firstname:"nothing",
        lastname: req.body.lastname,        
        country: req.body.country,        
        email: req.body.email,        
        city: req.body.city                
    });
    p.save((err, prod) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);
    });
});

app.patch('/:id', function (req, res) {

    Person.findById(req.params.id, (err, prod) => {
        if (err)
            res.status(500).send(err);
        else if (!prod) 
            res.status(404).send({});
        else {
            prod.lastname = req.body.lastname;
            prod.country = req.body.country;
            prod.email = req.body.email;
            prod.city = req.body.city;

            prod.save((err, prod) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(prod);
            });
        }    
    });


})

app.use(function(req, res, next) {
    res.status(404).send('Route does not exist.');
});


app.listen(9000);
