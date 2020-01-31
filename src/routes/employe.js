var express = require('express');
var app = express();
var Employe = require('../models/employes');
var Message = require('../messages/message');
var verify = require('../middlewares/autentication');

app.post('/', (req, res) => {
    var body = req.body;
    var employe = new Employe({
        dni: body.dni,
        fullName: body.fullName,
        email: body.email,
        address: body.address,
        createDate: new Date,
        rol: body.rol
    });
    employe.save((err, employeSave) => {
        if (err) {
            const message = new Message('Error', 'No se pudo crear usuario', err);
            return res.status(200).json(message);
        }
        res.status(201).json(employeSave);
    });
});

module.exports = app;
