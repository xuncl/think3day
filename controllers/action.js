 /* jshint esversion: 6 */
var ActionModel = require('../models/action');
var ObjectId = require('mongoose').Types.ObjectId;
var MD5 = require('../libs/md5');
var User = require('../models/user');

exports.action_create = function (req, res) {
    
    var raw = req.body.content;

    var rawmd5 = MD5.hex_md5(raw);

    var username = "Unknown";

    // get user name
    UserModel.findOne({id : req.body.code },function (err, user) {
        if (err) {
            res.render('error', {error: err});
        } else {
            if(user) {
                username = user.name;
            } else {
                // TODO log here, user id is wrong.
            }
        }
    });

    var action = new ActionModel(
        {
            code: req.body.code,
            username: username,
            content: req.body.content,
            contentmd5: rawmd5,
            datestr: req.body.datestr,
            gotbulbs: 0
        }
    );
    action.save(function (err) {
        if (err) {
            res.send('Action Not Created. '+ err);
        }
        res.send('Action Created successfully');
    });
};

// { '_id': 0, '__v': 0} 不取 _id
exports.action_get_by_user_date = function (req, res) {
    ActionModel.findOne({code : req.params.code, datestr : req.params.datestr}, function (err, action) {
        if (err) res.send(err);
        res.send(action);
    });
};

exports.action_get_all_actions= function (req, res) {
    ActionModel.find({}, function (err, action) {
        if (err) res.send(err);
        res.send(action);
    });
};

exports.action_update_by_user_date= function (req, res) {
    ActionModel.findOneAndUpdate({code : req.params.code, datestr : req.params.datestr}, {$set: req.body}, function (err, product) {
        if (err) res.send('Action not udpated. ' + err);
        res.send('Action udpated successfully.');
    });
};

exports.action_delete_by_user_date= function (req, res) {
    ActionModel.findOneAndDelete({code : req.params.code, datestr : req.params.datestr}, function (err, product) {
        if (err) res.send('Action not deleted. ' + err);
        res.send('Action deleted successfully.');
    });
};