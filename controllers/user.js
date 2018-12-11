 /* jshint esversion: 6 */
var UserModel = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var getToken = require('../websdk/getWebToken');
var getUserInfo = require('../websdk/getWebUserInfo');

exports.user_info = function (req, res) {
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
                        uid: u.openid,
                        name: u.nickname,
                        userinfo: u,
                        bulbs: 10,
                        consecutive: 0,
                        isfrozen: 0,
                        isleaving: 0,
                        givenbulbs: 0,
                        medals: 0,
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
                            res.render('user', {userinfo: user_info, a:'User Created successfully'});
                        });
                    } 
                });
            }
        });
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
    UserModel.findOne({id : req.params.id }, { '_id': 0, '__v': 0},function (err, user) {
        if (err) res.send(err);
        res.send(user);
    });
};

exports.user_get_all_users= function (req, res) {
    UserModel.find({},{ '_id': 0, '__v': 0} , function (err, user) {
        if (err) res.send(err);
        res.send(user);
    });
};

exports.user_update_by_id= function (req, res) {
    UserModel.findOneAndUpdate({id : req.params.id }, {$set: req.body}, function (err, product) {
        if (err) res.send('User not udpated. ' + err);
        res.send('User udpated successfully.');
    });
};

exports.user_delete_by_id= function (req, res) {
    UserModel.findOneAndDelete({id : req.params.id }, function (err, product) {
        if (err) res.send('User not deleted. ' + err);
        res.send('User deleted successfully.');
    });
};