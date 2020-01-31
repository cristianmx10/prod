var express = require('express');
var app = express();
var Product = require('../models/products');
var mdAutentication = require('../middlewares/autentication');

/**
 * Listar todos los productos
 */
app.get('/', mdAutentication.verificationToken, (req, res) => {
    Product.find({})
        .populate('category')
        .exec((err, products) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(products)
        });
});

/**
 * Obtener producto mediante su id
 */
app.get('/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    Product.findById(id)
        .exec((err, product) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(product);
        })
});

/**
 * Obtener producto por codigo
 */
app.get('/code/:value', mdAutentication.verificationToken, (req, res) => {
    var value = req.params.value;
    Product.findOne({ code: value, active: true }, (err, productDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productDb)
    });
});

/**
 * Crear un nuevo producto
 */
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var product = new Product({
        name: body.name,
        description: body.description,
        code: body.code,
        stock: body.stock,
        price: body.price,
        minPrice: body.minPrice,
        createDate: new Date,
        category: body.category
    });
    product.save((err, productSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productSave);
    });
});

/**
 * Actualizar un producto por el id
 */
app.put('/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Product.findByIdAndUpdate(
        id,
        {
            name: body.name,
            description: body.description,
            code: body.code,
            stock: body.stock,
            price: body.price,
            minPrice: body.minPrice,
            updateDate: new Date,
        },
        (err, productUpdate) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(productUpdate);
        });
});

/**
 * Actualixar el estado active
 */
app.put('/active/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Product.findByIdAndUpdate(id, { active: body.active, updateDate: new Date }, (err, productUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productUpdate);
    });
});

module.exports = app;