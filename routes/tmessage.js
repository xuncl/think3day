 /* jshint esversion: 6 */
const router = require('express').Router();
var tmessage_controller = require('../controllers/tmessage');
var UserModel = require('../models/user');
 
router.get('/normal', function(req, res) {
  UserModel.findOne({code : req.params.code }, function (err, user) {
      if (err) res.send(err);
      tmessage_controller.sendNormalMessage(user);
  });
});

module.exports = router;