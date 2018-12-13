 /* jshint esversion: 6 */
const router = require('express').Router();
var tmessage_controller = require('../controllers/tmessage');
var UserModel = require('../models/user');
 
router.get('/normal', function(req, res) {
  UserModel.findOne({code : req.params.code }, { '_id': 0, '__v': 0},function (err, user) {
      if (err) res.send(err);
      tmessage_controller.sendNormalMessage(user);
  });
});

router.get('/test', function(req, res) {
  UserModel.findOne({code : 100 }, { '_id': 0, '__v': 0},function (err, user) {
      if (err) res.send(err);
      tmessage_controller.sendNormalMessage(user);
  });
});

module.exports = router;