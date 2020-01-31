var express = require('express');
var app = express();
var OperationType = require('../models/operationTypes');
var mdAutenticcation = require('../middlewares/autentication');

/**
 * Listar todos lo tipos
 */
app.get('/', mdAutenticcation.verificationToken, (req, res) => {
    OperationType.find({}, (err, typesDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(typesDb);
    });
});

/**
 * Listar tipos activos
 */
app.get('/status/:active', mdAutenticcation.verificationToken, (req, res) => {
    var active = req.params.active;
    OperationType.find({ active: active }, (err, typesStatus) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(typesStatus);
    });
});

/**
 * Obtener tipo por su id
 */
app.get('/:id', mdAutenticcation.verificationToken, (req, res) => {
    var id = req.params.id;
    OperationType.findById(id, (err, typeUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(typeUpdate);
    });
});

/**
 * Crear tipo de operacion
 */
app.post('/', mdAutenticcation.verificationToken, (req, res) => {
    var body = req.body;
    var type = new OperationType({
        code: body.code,
        name: body.name,
        createDate: new Date
    });
    type.save((err, typeSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(typeSave);
    });
});

/**
 * Actualizar tipo
 */
app.put('/:id', mdAutenticcation.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    OperationType.findByIdAndUpdate(id, {
        code: body.code,
        name: body.name,
        updateDate: new Date
    }, (err, typeUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(typeUpdate);
    });
});

/**
 * Actualizar el active
 */
app.put('/active/:id', mdAutenticcation.verificationToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    OperationType.findByIdAndUpdate(id, { active: body.active, updateDate: new Date }, (err, activeUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(activeUpdate);
    });
});

module.exports = app;