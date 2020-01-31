var jwt = require('jsonwebtoken');
var SEED = require('../config/constants').SEED;
var Message = require('../messages/message');

exports.verificationToken = (req, res, next) => {
    const token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            const message = new Message('Error', 'token incorrecto o ya expiro', err);
            return res.status(200).json(message);
        };
        req.user = decoded.user
        next();
    });
}

