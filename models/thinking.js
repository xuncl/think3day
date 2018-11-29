 /* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ThinkingSchema = new Schema({
    title: String,
    datestr: String,
    content: String,
    allcontent: String,
    userid: String,
    gotbulbs: Number,
    activity: String,
    tags: { type: [String], index: true } 
},
{ timestamps: true });

// Export the model
module.exports = mongoose.model('Thinking', ThinkingSchema);