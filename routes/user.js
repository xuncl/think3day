 /* jshint esversion: 6 */
const router = require('express').Router();
const qs = require('querystring');
const config = require('../config');
var user_controller = require('../controllers/user');

/* get user info */
router.get('/getinfo', user_controller.user_info);

/* post user info */
router.post('/getinfo', user_controller.post_user_info);

/* GET users listing. */
router.get('/fetch', function(req, res, next) {

  // res.send('respond with a resource user');
  // 获取用户信息，验证并回调至getinfo
  var reqUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
  var params = {
    appid: config.appId,
    redirect_uri: 'http://www.think3day.com/user/getinfo',
    response_type: 'code',
    scope: 'snsapi_userinfo',
    status: '0',
  };

  var url = reqUrl+qs.stringify(params)+'#wechat_redirect';
  // console.log('redirect to: '+url);
  res.redirect(url);

});



router.get('/test', function(req, res) {
  var user = {id: -1};
  req.body.id = 3333;
  console.log(req.body.id);
  user_controller.post_user_info(req, res);
  // res.render('user_edit',
  // { 
  //   user: user,
  //   title: '三日一思'
  // });

  // res.render('done',{desc: 'Welcome back!'});
});

/* CRUD user APIs. */

// router.post('/create', user_controller.user_create);

// router.get('/id/:id', user_controller.user_get_by_id);

router.get('/', user_controller.user_get_all_users);

// router.put('/id/:id', user_controller.user_update_by_id);

// router.delete('/id/:id', user_controller.user_delete_by_id);

module.exports = router;