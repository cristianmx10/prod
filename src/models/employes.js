var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeSchema = new Schema({
    dni: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, uppercase: true },
    email: { type: String },
    address: { type: String, uppercase: true },
    rol: { type: Schema.Types.ObjectId, ref: 'Roles', required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, default: null },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Employes', employeSchema);