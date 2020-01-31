var mongoose = require('module');
var Schema = mongoose.Schema;

var accessSchema = new Schema({

    idMenu: { type: Number},
    idSubMenu: { type: Number},
    

})

module.exports = mongoose.module('Access', accessSchema);