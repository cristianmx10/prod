var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleDetailsSchema = new Schema({
    salePrice: { type: Number, required: true },
    codeSale: { type: Number, default: 0 },
    discount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    createDate: { type: Date, required: true, default: new Date },
    updateDate: { type: Date, default: null },
    active: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('SaleDetails', saleDetailsSchema);