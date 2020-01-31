var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cajaSaleSchema = new Schema({
    sale: { type: Schema.Types.ObjectId, ref: 'Sales', required: true },
    caja: { type: Schema.Types.ObjectId, ref: 'Cajas', required: true },
    createDate: { type: Date, default: new Date },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('CajaSales', cajaSaleSchema);