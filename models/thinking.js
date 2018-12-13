 /* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ThinkingSchema = new Schema({
    id: String,
    code: String,
    username: String,
    content: String,
    contentmd5: String,
    title: String,
    datestr: String,
    gotbulbs: Number,
    activity: String,
    topthinking: String,
    tags: { type: [String], index: true } 
},
{ timestamps: true });

ThinkingSchema.methods.findSameMd5 = function(cb) {
    return this.model('Thinking').findOne({ contentmd5: this.contentmd5 }, cb);
};

// Export the model
module.exports = mongoose.model('Thinking', ThinkingSchema);