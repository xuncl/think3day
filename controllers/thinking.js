 /* jshint esversion: 6 */
var ThinkingModel = require('../models/thinking');
var ObjectId = require('mongoose').Types.ObjectId;
var MD5 = require('../libs/md5');
var UserModel = require('../models/user');
var getIp = require('../libs/util').getIp;
const config = require('../config');
var tmessage_controller = require('../controllers/tmessage');

// 机器人通过post此接口，发送群里的思考内容。
exports.thinking_create = function (req, res) {
    var ip = getIp(req);
    if (ip != config.white_ip) {
        console.log("ip: " + ip);
        res.render("403", {status:403, title:"403-无权限"});
        return;
    }

    var raw = req.body.content;
    var rawmd5 = MD5(raw);

    // 确保找到对应的作者
    UserModel.findOne({code : req.body.code }, { '_id': 0, '__v': 0},function (err, user) {
        if (err) {
            res.send(err);
        } else {
            save_think(req, res, user, rawmd5);
        }
    });
};

// 保存思考内容
function save_think(req, res, user, rawmd5){
    var username = "Unknown";
    if(user) {
        username = user.name;
        // console.log("user found: "+username);
    } else {
        console.log("user not found: "+req.body.code);
        res.send("user not found: "+req.body.code);
        // TODO log here, user id is wrong.
        return;
    }
    var thinking = new ThinkingModel(
        {
            code: req.body.code,
            username: username,
            content: req.body.content,
            contentmd5: rawmd5,
            datestr: req.body.datestr,
            gotbulbs: 0
        }
    );
    // 防重复获取
    thinking.findSameMd5(function(err, same_thinking) {
        if (same_thinking){
            console.log('Duplicated: Same thinking to '+user.code+' on '+req.body.datestr);
            res.send('Duplicated: Same thinking to '+user.code+' on '+req.body.datestr);
        } else {
            // 不重复的话保存思考内容
            thinking.save(function (err) {
                if (err) {
                    console.log('Error: Thinking Not Created. '+ err);
                    res.send('Error: Thinking Not Created. '+ err);
                    return;
                }
                // 更新用户状态并发模板消息提醒。
                user.completeCheckpoint();
                tmessage_controller.sendNormalMessage(user);
                console.log('Thinking Created successfully by '+user.code+" at "+thinking.datestr);
                res.send('Thinking Created successfully by '+user.code+" at "+thinking.datestr);
            });
        } 
    });
}

exports.thinking_get_by_user_date = function (req, res) {
    ThinkingModel.findOne({code : req.params.code, datestr : req.params.datestr}, { '_id': 0, '__v': 0},function (err, thinking) {
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

// exports.thinking_update_by_user_date= function (req, res) {
//     ThinkingModel.findOneAndUpdate({code : req.params.code, datestr : req.params.datestr}, {$set: req.body}, function (err, product) {
//         if (err) res.send('Thinking not udpated. ' + err);
//         res.send('Thinking udpated successfully.');
//     });
// };

// exports.thinking_delete_by_user_date= function (req, res) {
//     ThinkingModel.findOneAndDelete({code : req.params.code, datestr : req.params.datestr}, function (err, product) {
//         if (err) res.send('Thinking not deleted. ' + err);
//         res.send('Thinking deleted successfully.');
//     });
// };