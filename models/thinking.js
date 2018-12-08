 /* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ThinkingSchema = new Schema({
    id: String,
    userid: String,
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

// Export the model
module.exports = mongoose.model('Thinking', ThinkingSchema);