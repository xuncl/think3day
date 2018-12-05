 /* jshint esversion: 6 */
 const router = require('express').Router();
 const fs = require('fs');
 const config = require('../config');
 const request = require('request');
 
 router.get('/test', function(req, res, next) {

    sendTMessage();
    res.send('message sent.');
    
  });

  function sendTMessage() {
    var token = fs.readFileSync('./token').toString();
    var posturl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+token;
    var tmdata =  {
        touser: config.test_openid,
        template_id:"-S0BOHCHx5Xy7xYWt6vJxyuFQ1Ei2MH1suLog2DnufM",
        url:"http://www.baidu.com/",
        data:{
                first: {
                    value:"三日一思打卡状态：",
                    color:"#173177"
                },
                keyword1:{
                    value:"思考社群实验室",
                    color:"#173177"
                },
                keyword2: {
                    value:"已打卡",
                    color:"#173177"
                },
                keyword3: {
                    value:"2018-11-30 11:00",
                    color:"#173177"
                },
                remark:{
                    value:"您已完成本检查点，点击生成签到图~",
                    color:"#0e0091"
                }
        }
    };

    let options = {
      url: posturl,
      form: JSON.stringify(tmdata),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    request.post(options, function (err, res, body) {
      if (err) {
        console.log(err);
      }else {
        console.log(body);
      }
    });
    
  }

 module.exports = router;