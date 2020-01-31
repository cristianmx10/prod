var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/constants').SEED;
var Message = require('../messages/message');

var app = express();
var Login = require('../models/authentications');
var User = require('../models/employes');

/** Logearse */
app.post('/', (req, res) => {
    var body = req.body;
    Login.findOne({ user: body.user }, (err, loginDb) => {
        if (err) return res.status(400).json(err);
        if (!loginDb) {
            const message = new Message('Error', 'No se pudo ingresar', false, body);
            return res.status(400).json(message);
        }
        // verificar contraseña
        if (!bcrypt.compareSync(body.password, loginDb.password)) {
            const message = new Message('Error', 'Contraseña incorrecta', false)
            return res.status(400).json(message);
        }
        User.findById(loginDb.employe, (err, userDb) => {
            if (err) {
                return res.status(400).json(err);
            }
            if (!userDb) {
                message = new Message('Error', 'No se encontro al usuario', false);
                return res.status(400).json(message);
            }
            token = jwt.sign({ user: userDb }, SEED, { expiresIn: 86400 });
            res.status(200).json(token);
        });
    });
});

/** Listar logins */
app.get('/', (req, res) => {
    Login.find({}, (err, loginsDb) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(loginsDb);
    });
});

/** crear un login */
app.post('/create', (req, res) => {
    var body = req.body;
    var login = new Login({
        user: body.user,
        password: bcrypt.hashSync(body.password, 10),
        employe: body.employe,
        createDate: new Date
    });
    login.save((err, loginSave) => {
        if (err) {
            const message = new Message('Error', 'No se pudo crear login', err);
            return res.status(200).json(message);
        }
        res.status(201).json(loginSave);
    });
});

module.exports = app;