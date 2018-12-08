 /* jshint esversion: 6 */
var ThinkingModel = require('../models/thinking');
var ObjectId = require('mongoose').Types.ObjectId;
var MD5 = require('../libs/md5');
var User = require('../models/user');

exports.thinking_create = function (req, res) {
    
    var raw = req.body.content;

    var rawmd5 = MD5.hex_md5(raw);

    var username = "Unknown";

    // get user name
    UserModel.findOne({id : req.body.userid }, { '_id': 0, '__v': 0},function (err, user) {
        if (err) {
            res.send(err);
        } else {
            if(user) {
                username = user.name;
            } else {
                // TODO log here, user id is wrong.
            }
        }
    });

    var thinking = new ThinkingModel(
        {
            userid: req.body.userid,
            username: username,
            content: req.body.content,
            contentmd5: rawmd5,
            datestr: req.body.datestr,
            gotbulbs: 0
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