var express = require('express');
var mdAutentication = require('../middlewares/autentication');
var Product = require('../models/products');
var Operation = require('../models/operations');
var Caja = require('../models/cajas');

var app = express();

/**
 * Crea una operacion
 */
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var operation = new Operation({
        product: body.product,
        cant: body.cant,
        priceEntry: body.priceEntry,
        employe: body.employe,
        createDate: new Date
    });
    Product.findById(body.product, (err, product) => {
        if (err) return res.status(400).json(err);
        operation.save((err, operationSave) => {
            if (err) return res.status(400).json(err);
            Product.findByIdAndUpdate(body.product, {
                stock: product.stock + operationSave.cant, updateDate: new Date
            }, (err, productUpdate) => {
                if (err) return res.status(400).json(err);
                res.status(200).json(productUpdate)
            });
        });
    })
});

module.exports = app;