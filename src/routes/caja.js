var express = require('express');
var Caja = require('../models/cajas');
var mdAutentication = require('../middlewares/autentication');
var app = express();

/**
 * Listar cajas
 */
app.get('/', mdAutentication.verificationToken, (req, res) => {
    Caja.find({}, (err, cajasDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(cajasDb);
    });
});

/**
 * Crear caja
 */
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var caja = new Caja({
        expenses: body.expenses,
        income: body.income,
        totalMoney: body.totalMoney,
        salesMade: body.salesMade,
        createDate: new Date
    });
    caja.save((err, cajaSave) => {
        if (err) return res.sendStatus(500);
        res.status(200).json(cajaSave);
    });
});

/**
 * Actualizar caja
 */
app.put('/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Caja.findByIdAndUpdate(id, {
        expenses: body.expenses,
        income: body.income,
        totalMoney: body.totalMoney,
        salesMade: body.salesMade,
        updateDate: new Date
    }, (err, cajaUpdate) => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
    });
});

module.exports = app;