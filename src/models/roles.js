var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rolSchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null }
});
module.exports = mongoose.model('Roles', rolSchema);