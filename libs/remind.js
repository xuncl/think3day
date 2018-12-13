
var UserModel = require('../models/user');

exports.send_remind_for_all= function (req, res) {
    UserModel.find({},{ '_id': 0, '__v': 0} , function (err, users) {
        if (err) {
            res.send(err);
            return;
        }
        for(var user in users){
            if (!user.isdone){
                // var reqUrl = 'http://www.think3day.com/tm/beforeCheck?';
                // var params = {
                //   code: code,
                // };
                // var url = reqUrl+qs.stringify(params);
                // res.redirect(url);
                // TODO 
            }
        }
    });
};

function send_remind(user){
} 