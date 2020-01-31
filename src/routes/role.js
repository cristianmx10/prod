var express = require('express');
var app = express();
var Rol = require('../models/roles');
var mdAutentication = require('../middlewares/autentication');
var Message = require('../messages/message');

/** Crear un nuevo rol  */
app.post('/', (req, res) => {
    var body = req.body;
    var rol = new Rol({
        name: body.name,
        description: body.description,
        createDate: new Date
    });
    rol.save((err, rolSave) => {
        if (err) {
            const message = new Message('Error', 'error al guardar rol.', err);
            return res.status(200).json(message);
        }
        res.status(201).json(rolSave);
    });
});

module.exports = app;