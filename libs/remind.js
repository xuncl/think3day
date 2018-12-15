 /* jshint esversion: 6 */
var UserModel = require('../models/user');
var tmessage_controller = require('../controllers/tmessage');
var user_controller = require('../controllers/user');

// 检查点当天提醒
exports.send_pre_remind_for_all= function () {
    var u = UserModel.find({isfrozen: 0, isleaving: 0}, function (err, users) {
        if (err) {
            console.log(err);
            return;
        }
        var len = users.length;
        for(var i = 0; i<len; i++){
            user = users[i];
            if (!user.isdone){
                tmessage_controller.sendPreCheckMessage(user);
            }
        }
    });
};


// 即将出局的提醒
exports.send_dead_remind_for_all= function () {
    var u = UserModel.find({isfrozen: 0, isleaving: 0, bulbs: 0}, function (err, users) {
        if (err) {
            console.log(err);
            return;
        }
        var len = users.length;
        for(var i = 0; i<len; i++){
            user = users[i];
            tmessage_controller.sendDeadlineMessage(user);
        }
    });
};

// 刷新所有
exports.refresh_checkpoint_for_all= function () {
    var u = UserModel.find({isfrozen: 0, isleaving: 0}, function (err, users) {
        if (err) {
            console.log(err);
            return;
        }
        var len = users.length;
        for(var i = 0; i<len; i++){
            user = users[i];
            if (user.isdone){
                user_controller.checkpoint_completed_update(user);
            } else {
                user_controller.checkpoint_uncompleted_update(user);
            }
        }
    });
};

