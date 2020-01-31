var express = require('express');
var mdAutentication = require('../middlewares/autentication');

var Product = require('../models/products');
var Category = require('../models/categories');
var Employe = require('../models/employes');
var Operation = require('../models/operations');
var Sale = require('../models/sales');

var app = express();

/**
 * Cantidad de productos
 */
app.get('/product', mdAutentication.verificationToken, (req, res) => {
    Product.countDocuments({}, (err, count) => {
        if (err) return res.sendStatus(404);
        res.status(200).json(count);
    });
});

/**
 * Cantidad de categorias
 */
app.get('/category', mdAutentication.verificationToken, (req, res) => {
    Category.countDocuments({}, (err, count) => {
        if (err) return res.sendStatus(500);
        res.status(200).json(count);
    });
});

/**
 * CAntidad de empleados
 */
app.get('/employe', mdAutentication.verificationToken, (req, res) => {
    Employe.countDocuments({ active: true }, (err, count) => {
        if (err) return res.sendStatus(500);
        res.status(200).json(count);
    });
});

/**
 * Cantidad de Entradas
 */
app.get('/entry', mdAutentication.verificationToken, (req, res) => {
    var value = req.params.value;
    Operation.countDocuments({ code: value }, (err, count) => {
        if (err) return res.sendStatus(500);
        res.status(200).json(count);
    });
});

/**
 * Cantidad total de Ventas
 */
app.get('/sale', mdAutentication.verificationToken, (req, res) => {
    Sale.countDocuments({ active: true }, (err, count) => {
        if (err) return res.sendStatus(500);
        res.status(200).json(count);
    });
});

/**
 * cinco ultimos productos registrados
 */
app.get('/lastproduct', mdAutentication.verificationToken, (req, res) => {
    Product.find({ active: true }).sort({ createDate: -1 }).exec((err, products) => {
        if (err) return res.sendStatus(500);
        res.status(200).json(products);
    });
});

/**
 * Obtener los ultimos 4 operacion segun su codigo
 */
app.get('/lastope', mdAutentication.verificationToken, (req, res) => {
    var code = req.params.code;
    Operation.find({ active: true })
        .sort({ createDate: -1 })
        .populate('product')
        .limit(4)
        .exec((err, operations) => {
            if (err) return res.sendStatus(500);
            res.status(200).json(operations);
        });
});


module.exports = app;