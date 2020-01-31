var express = require('express');

var app = express();

app.get('', (req, res) => {
    res.status(200).json('good');
});

module.exports = app;