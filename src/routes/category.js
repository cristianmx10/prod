var express = require('express');
var app = express();
var Category = require('../models/categories');
// var Message = require('../messages/message');
var mdAutentication = require('../middlewares/autentication');

/**
 * Listar categorias
 */
app.get('/', mdAutentication.verificationToken, (req, res) => {
    Category.find({})
        .exec((err, categories) => {
            if (err) {
                // const message = new Message('err', 'no se pudo listar categorias', false, err);
                return res.status(400).json(err);
            }
            res.status(200).json(categories);
        });
});

/**
 * Obtner categoria por id
 */
app.get('/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    Category.findById(id, (err, categoryDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(categoryDb)
    });
});

/**
 * Listar categorias por su estado active
 */
app.get('/status/:active', mdAutentication.verificationToken, (req, res) => {
    var active = req.params.active;
    Category.find({ active: active }, (err, categoriesDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(categoriesDb);
    });
});

/**
 * Crear nueva categoria
 */
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var category = new Category({
        name: body.name,
        description: body.description,
        createDate: new Date
    });
    category.save((err, categorySave) => {
        if (err) {
            // const message = new Message('Error', 'no se creo categoria', false, err);
            return res.status(400).json(err);
        }
        res.status(200).json(categorySave);
    });
});

/**
 * Actualizar categoria
 */
app.put('/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Category.findByIdAndUpdate(
        id,
        {
            name: body.name,
            description: body.description,
            updateDate: new Date
        },
        (err, categoryUpdate) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(categoryUpdate);
        }
    )
});

/**
 * Actualizar el estado active
 */
app.put('/active/:id', mdAutentication.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Category.findByIdAndUpdate(id, { active: body.active, updateDate: new Date }, (err, categoryUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(categoryUpdate);
    });
});

module.exports = app;
