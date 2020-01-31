var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operationSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    cant: { type: Number, required: true },
    priceEntry: { type: Number, required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null },
    employe: { type: Schema.Types.ObjectId, ref: 'Employes', required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Operations', operationSchema);