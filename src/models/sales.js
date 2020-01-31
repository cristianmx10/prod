var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleSchema = new Schema({
    employe: { type: Schema.Types.ObjectId, ref: 'Employes', required: true },
    observation: { type: String, default: 'No description.' },
    priceTotal: { type: Number, required: true },
    payment: { type: Number, required: true },
    turned: { type: Number, required: true },
    codeSale: { type: Number, required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Sales', saleSchema);