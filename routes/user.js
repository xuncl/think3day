 /* jshint esversion: 6 */
const router = require('express').Router();
const qs = require('querystring');
const config = require('../config');
var user_controller = require('../controllers/user');

/* get user info */
router.get('/getinfo', user_controller.user_info);

/* GET users listing. */
router.get('/fetch', function(req, res, next) {

  // res.send('respond with a resource user');

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

/* CRUD user APIs. */

router.post('/create', user_controller.user_create);

router.get('/:id', user_controller.user_get_by_id);

router.get('/', user_controller.user_get_all_users);

router.put('/:id', user_controller.user_update_by_id);

router.delete('/:id', user_controller.user_delete_by_id);


//new employee
app.get('/employee/new', function(req, res) {
  res.render('employee_new', {
      title: 'New Employee'
  });
});

//save new employee
app.post('/employee/new', function(req, res){
  employeeProvider.save({
      title: req.param('title'),
      name: req.param('name')
  }, function( error, docs) {
      res.redirect('/')
  });
});

//update an employee
app.get('/employee/:id/edit', function(req, res) {
  employeeProvider.findById(req.param('_id'), function(error, employee) {
    res.render('employee_edit',
    { 
      title: employee.title,
      employee: employee
    });
  });
});

//save updated employee
app.post('/employee/:id/edit', function(req, res) {
  employeeProvider.update(req.param('_id'),{
    title: req.param('title'),
    name: req.param('name')
  }, function(error, docs) {
    res.redirect('/')
  });
});

//delete an employee
app.post('/employee/:id/delete', function(req, res) {
  employeeProvider.delete(req.param('_id'), function(error, docs) {
    res.redirect('/')
  });
});


module.exports = router;