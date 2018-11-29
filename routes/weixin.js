const router =require('express').Router();
const wxAuth = require('../libs/wxAuth');
// const turingRobot = require('../libs/turingRobot');
const autoReply = require('../libs/wxAutoReply');

router.get('/', wxAuth);

router.post('/', function (req, res) {
  //设置返回数据header
  res.writeHead(200, {'Content-Type': 'application/xml'});
  // 关注后回复
  if (req.body.xml.event === 'subscribe') {
    var resMsg = autoReply('text', req.body.xml, '欢迎关注');
    res.end(resMsg);
  } else {
    var info = req.body.xml.content;
    var resMsg = autoReply('text', req.body.xml, info);
    res.end(resMsg);
    // turingRobot(info).then(function (data) {
    //   console.log(data);
    //   var response = JSON.parse(data);
    //   var resMsg = autoReply('text', req.body.xml, response.text);
    //   res.end(resMsg);
    // });
  }
});

/* GET users listing. */
router.get('/test', function(req, res, next) {

  res.render('user',{userinfo: req});

  console.log(req);

});

module.exports = router;

