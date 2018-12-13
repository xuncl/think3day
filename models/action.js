 /* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ActioningSchema = new Schema({
    code: String,
    action: String,
    object: String,
    thinkingid: String,
    remark: String,
},
{ timestamps: true });

// Export the model
module.exports = mongoose.model('Actioning', ActioningSchema);