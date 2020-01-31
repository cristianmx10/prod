var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operationTypeSchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('OperationTypes', operationTypeSchema);