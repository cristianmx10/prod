var express = require('express');
var mdAutentication = require('../middlewares/autentication');
var Sale = require('../models/sales');
var app = express();

/**
 * Crear venta
 */
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var sale = new Sale({
        employe: body.employe,
        observation: body.observation,
        priceTotal: body.priceTotal,
        createDate: new Date,
        payment: body.payment,
        turned: body.turned
    });
    Sale.findOne({ active: true }).sort({ createDate: -1 })
        .exec((err, saleDb) => {
            if (err) return res.status(400).json(err);
            if (!saleDb) {
                sale.codeSale = 0;
            } else {
                sale.codeSale = saleDb.codeSale + 1;
            }
            sale.save((err, saleSave) => {
                if (err) return res.status(400).json(err);
                res.status(200).json(saleSave);
            });
        });
});

module.exports = app;