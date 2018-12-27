 /* jshint esversion: 6 */
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
    var resMsg = autoReply('text', req.body.xml, '欢迎关注！点击下方“个人主页”按钮绑定自己的编号。');
    res.end(resMsg);
  } else {
    var info = req.body.xml.content;
    var resMsg2 = autoReply('text', req.body.xml, info);
    res.end(resMsg2);
    // turingRobot(info).then(function (data) {
    //   console.log(data);
    //   var response = JSON.parse(data);
    //   var resMsg = autoReply('text', req.body.xml, response.text);
    //   res.end(resMsg);
    // });
  }
});

module.exports = router;

