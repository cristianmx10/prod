var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    employe: { type: Schema.Types.ObjectId, ref: 'Employes', required: true },
    createDate: { type: Date },
    updateDate: { type: Date, default: null },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Login', loginSchema);