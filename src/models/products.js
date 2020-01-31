var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, default: 'No description.' },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    minPrice: { type: Number, required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null },
    category: { type: Schema.Types.ObjectId, ref: 'Categories', required: true },
    active: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Products', productSchema);
