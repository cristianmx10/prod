var express = require('express');
var app = express();
var mdAutentication = require('../middlewares/autentication');

var Operation = require('../models/operations');

/**
 * Listar operaciones
 */
app.get('/', mdAutentication.verificationToken, (req, res) => {
    Operation.find({}, (err, operationsDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(operationsDb);
    });
});

/**
 * Crear Operacion
 */
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var operation = new Operation({
        product: body.product,
        cant: body.cant,
        priceEntry: body, priceEntry,
        createDate: new Date
    });
    operation.save((err, operationSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(operationSave);
    });
});

/**
 * Actualizar Operation
 */
app.put('/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Operation.findByIdAndUpdate(id, {
        product: body.product,
        cant: body.cant,
        priceEntry: body.priceEntry,
        updateDate: new Date
    }, (err, operationUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(operationUpdate);
    });
});

module.exports = app;