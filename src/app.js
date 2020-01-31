var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var employeRoutes = require('./routes/employe');
var rolRoutes = require('./routes/role');
var categoryRoutes = require('./routes/category');
var productRoutes = require('./routes/product');
var producOperationRoutes = require('./routes/productOperation');
var operationRoutes = require('./routes/operation');
var cajaRoutes = require('./routes/caja');
var dashboardRoutes = require('./routes/dashboard');
var saleDetailRoutes = require('./routes/saleDetail');
var saleRoutes = require('./routes/sale');

// mongoose.connect('mongodb://localhost:27017/cordovaDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err, res) => {
//     if (err) throw err;
//     console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
// });

mongoose.connection.openUri(`mongodb+srv://cristianmx10:IRkAetSLhmYFsIaY@cordova-kxcci.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (err) throw err;
        console.log('Base de datos: online')
    });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use('/sale', saleRoutes);
app.use('/saledeta', saleDetailRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/caja', cajaRoutes);
app.use('/operation', operationRoutes);
app.use('/productopera', producOperationRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/rol', rolRoutes);
app.use('/employe', employeRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

app.listen(parseInt(process.env.PORT) || 8080, () => {
    console.log('Express server: \x1b[32m%s\x1b[0m', 'online');
});