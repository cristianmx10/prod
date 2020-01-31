var express = require('express');
var mdAutentication = require('../middlewares/autentication');
var SaleDetail = require('../models/saleDetails');
var Message = require('../messages/message');
var Sale = require('../models/sales');

var app = express();

app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    Sale.findOne({ active: true }).sort({ createDate: -1 }).exec((err, saleDb) => {
        if (err) return res.status(400).json(err);
        for (let i = 0; i < body.length; i++) {
            const element = body[i];
            var saleDetail = new SaleDetail({
                salePrice: element.salePrice,
                codeSale: saleDb.codeSale,
                discount: element.discount,
                quantity: element.quantity,
                product: element.product,
                createDate: new Date,
            });
            saleDetail.save((err, save) => {
                if (err) return res.status(400).json(err);
            });
        }
        const message = new Message('Sucess', 'ser creo correctamente', true);
        res.status(200).json(message);
    });
});

module.exports = app;