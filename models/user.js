 /* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: String,
    name: String,
    uid: String,
    userinfo: {
        openid: String,
        nickname: String,
        sex: Number,
        language: String,
        city: String,
        province: String,
        country: String,
        headimgurl: String,
        privilege: Array
    },
    bulbs: Number,
    consecutive: Number,
    isfrozen: Number,
    isleaving: Number,
    givenbulbs: Number,
    medals: Number,
},
{ timestamps: true });

UserSchema.methods.findSameOpenId = function(cb) {
    return this.model('User').findOne({ id: this.id }, cb);
};

UserSchema.methods.findSameUId = function(cb) {
    return this.model('User').findOne({ uid: this.uid }, cb);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);