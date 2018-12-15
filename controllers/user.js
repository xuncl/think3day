 /* jshint esversion: 6 */
var UserModel = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var getToken = require('../websdk/getWebToken');
var getUserInfo = require('../websdk/getWebUserInfo');

exports.user_info = function (req, res) {
    // 获取用户的userinfo
    getToken(req.query.code)
      .then(function (data) {
        return JSON.parse(data);
      })
      .then(function (data) {
        getUserInfo(data.access_token, data.openid).then(user_info => {
            var u = JSON.parse(user_info);
            if (u.openid) {
                var user = new UserModel(
                    {
                        id: u.openid,
                        code: u.openid,
                        name: u.nickname,
                        userinfo: u,
                        bulbs: 10,
                        isdone: 0,
                        consecutive: 0,
                        isfrozen: 0,
                        isleaving: 0,
                        givenbulbs: 0,
                        medals: 0,
                    }
                );
                // 去重并保存
                user.findSameOpenId(function(err, same_user) {
                    if (same_user){ // 用户数据已入库
                        if (same_user.code!=same_user.id){ // 已注册
                            res.render('done',{desc: '您已注册，如要重新填写，请联系群主修改。', title: '绑定成功'});
                        } else { // 有数据但是未注册
                            // 跳转页面让用户自己填编号
                            res.render('user_edit', {user: user, title: '三日一思'});
                        }
                    } else {
                        user.save(function (err) {
                            if (err) {
                                res.render('error',{error: err, desc: "用户保存出错！"});
                            }
                            // 跳转页面让用户自己填编号
                            res.render('user_edit', {user: user, title: '三日一思'});
                        });
                    } 
                });
            }
        });
      });
};


exports.post_user_info = function (req, res) {
    var nickname = req.body.name1 + '-' + req.body.name2 + '-' + req.body.name3;
    UserModel.findOneAndUpdate({id : req.body.id }, { $set: { name: nickname, code: req.body.code }}, function (err, product) {
        if (err) {
            res.render('error',{ desc: "用户更新出错！", title: "Error", error: err});
        } else
            res.render('done',{desc: '注册成功，请关闭此页。', title: '绑定成功'});
    });
};

exports.user_create = function (req, res) {
    var user = new UserModel(
        {
            id: req.body.id,
            name: req.body.name,
        }
    );
    user.findSameOpenId(function(err, same_user) {
        if (same_user){
            res.send('Welcome back!');
        } else {
            user.save(function (err) {
                if (err) {
                    res.send('User Not Created. '+ err);
                }
                res.send('User Created successfully');
            });
        } 
    });
};

exports.user_get_by_id = function (req, res) {
    UserModel.findOne({id : req.params.id }, function (err, user) {
        if (err) res.send(err);
        res.send(user);
    });
};

exports.user_get_all_users= function (req, res) {
    UserModel.find({}, function (err, user) {
        if (err) res.send(err);
        res.send(user);
    });
};

exports.user_update_by_id= function (req, res) {
    // UserModel.findOneAndUpdate({id : req.params.id }, {$set: req.body}, function (err, product) {
    //     if (err) res.send('User not udpated. ' + err);
    //     res.send('User udpated successfully.');
    // });
    UserModel.findOne({id : req.params.id }, function (err, user) {
        if (err) res.send(err);    
        user.save(function (err) {
            if (err) {
                res.send('User Not Created. '+ err);
            }
            res.render('user_edit',
            { 
              user: user,
              title: "三日一思"
            });
        });
    });
};

// 完成检查点后更新user
exports.checkpoint_completed_update= function (user) {
    user.isdone = 0;
    user.bulbs += 1;
    user.consecutive += 1;
    user.save(function (err) {
        if (err) {
            console.log('User ' + user.code + ' Not Created. '+ err);
        }
    });
};

// 错过检查点后更新user
exports.checkpoint_uncompleted_update= function (user) {
    user.isdone = 0;
    user.bulbs -= 1;
    user.consecutive = 0;
    user.save(function (err) {
        if (err) {
            console.log('User ' + user.code + ' Not Saved. '+ err);
        }
    });
};

exports.user_delete_by_id= function (req, res) {
    UserModel.findOneAndDelete({id : req.params.id }, function (err, product) {
        if (err) res.send('User not deleted. ' + err);
        res.send('User deleted successfully.');
    });
};

/* 用户主页 */
exports.user_page = function (req, res) {
    // 获取用户的userinfo
    getToken(req.query.code).then(function (data) {
        return JSON.parse(data);
    }).then(function (data) {
        getUserInfo(data.access_token, data.openid).then(user_info => {
            var u = JSON.parse(user_info);
            if (u.openid) {
                UserModel.findOne({id : req.params.id }, function (err, user) {
                    if (err) res.render('error',{ desc: "用户主页出错！", title: "Error", error: err});
                    res.render('user_show', {user: user, title: '个人主页'});
                });
            }
        });
    });
};
