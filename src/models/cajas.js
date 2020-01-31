var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cajaSchema = new Schema({
    expenses: { type: Number, required: true },
    income: { type: Number, required: true },
    totalMoney: { type: Number, required: true },
    salesMade: { type: Number, required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null },
    employe: { type: String, required: true },
    active: { type: Boolean, default: true },
    root: { type: Boolean, default: 0 }
});

module.exports = mongoose.model('Cajas', cajaSchema);