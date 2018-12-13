 /* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: String, // 同openid
    name: String, // 昵称
    code: String, // 编号
    userinfo: { // 微信userinfo信息
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
    bulbs: Number, // 灯泡数
    isdone: Number, // 是否完成当前检查点
    consecutive: Number, // 连续完成次数
    isfrozen: Number, // 是否请假
    isleaving: Number, // 是否出局
    givenbulbs: Number, // 被赠灯泡数
    medals: Number, // TODO 勋章数
},
{ timestamps: true });

// 按id查重
UserSchema.methods.findSameOpenId = function(cb) {
    return this.model('User').findOne({ id: this.id }, cb);
};

// 按code查重
UserSchema.methods.findSameCode = function(cb) {
    return this.model('User').findOne({ code: this.code }, cb);
};

// 完成一次思考更新自身
UserSchema.methods.completeCheckpoint = function(cb) {
    return this.model('User').findOneAndUpdate({id : this.id }, { $set: { bulbs: this.bulbs+1, isdone: 1 }}, cb);
};

// 检查点过后刷新。
UserSchema.methods.refreshCheckpoint = function(cb) {
    return this.model('User').findOneAndUpdate({id : this.id }, { $set: { isdone: 0 }}, cb);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);