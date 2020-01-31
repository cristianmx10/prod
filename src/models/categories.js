var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: 'No description.' },
    createDate: { type: Date, default: new Date },
    updateDate: { type: Date, default: null },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Categories', categorySchema);
