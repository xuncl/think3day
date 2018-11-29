 /* jshint esversion: 6 */
var ThinkingModel = require('../models/thinking');
var ObjectId = require('mongoose').Types.ObjectId;

exports.thinking_create = function (req, res) {
    var thinking = new ThinkingModel(
        {
            title: req.body.title,
            datestr: req.body.datestr,
            content: req.body.content,
            allcontent: req.body.allcontent,
            userid: req.body.userid,
            gotbulbs: 0,
            activity: req.body.activity,
            tags: req.body.tags,
        }
    );
    thinking.save(function (err) {
        if (err) {
            res.send('Thinking Not Created. '+ err);
        }
        res.send('Thinking Created successfully');
    });
};

exports.thinking_get_by_user_date = function (req, res) {
    ThinkingModel.findOne({userid : req.params.userid, datestr : req.params.datestr}, { '_id': 0, '__v': 0},function (err, thinking) {
        if (err) res.send(err);
        res.send(thinking);
    });
};

exports.thinking_get_all_thinkings= function (req, res) {
    ThinkingModel.find({},{ '_id': 0, '__v': 0} , function (err, thinking) {
        if (err) res.send(err);
        res.send(thinking);
    });
};

exports.thinking_update_by_user_date= function (req, res) {
    ThinkingModel.findOneAndUpdate({userid : req.params.userid, datestr : req.params.datestr}, {$set: req.body}, function (err, product) {
        if (err) res.send('Thinking not udpated. ' + err);
        res.send('Thinking udpated successfully.');
    });
};

exports.thinking_delete_by_user_date= function (req, res) {
    ThinkingModel.findOneAndDelete({userid : req.params.userid, datestr : req.params.datestr}, function (err, product) {
        if (err) res.send('Thinking not deleted. ' + err);
        res.send('Thinking deleted successfully.');
    });
};