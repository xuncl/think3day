const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');
const qs = require('querystring');
const config = require('../config');

router.get('/user', function (req, res) {
  getToken(req.query.code)
    .then(function (data) {
      return JSON.parse(data);
    })
    .then(function (data) {
      getUserInfo(data['access_token'], data['openid']).then(_ => {

      var MongoClient = require('mongodb').MongoClient;
      var mongoUrl = "mongodb://"+config.mongohost+":"+config.mongoport+"/";
        // 插入
      MongoClient.connect(mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("xuncl").insert(JSON.parse(_), function(err, res) {
            if (err) throw err;
            db.close();
        });
      });

        res.render('user', {userinfo: _});      
      });
    });
});

/* GET users listing. */
router.get('/list', function(req, res, next) {

  // res.send('respond with a resource user');

  var reqUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
  var params = {
    appid: config.appId,
    redirect_uri: 'http://www.think3day.com/user',
    response_type: 'code',
    scope: 'snsapi_userinfo',
    status: '0',
  };

  var url = reqUrl+qs.stringify(params)+'#wechat_redirect';

  console.log('redirect to: '+url);

  res.redirect(url);

});

module.exports = router;