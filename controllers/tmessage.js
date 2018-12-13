 /* jshint esversion: 6 */
const fs = require('fs');
const config = require('../config');
const request = require('request');

exports.sendNormalMessage = function(user) {
    var token = fs.readFileSync('./token').toString();
    var posturl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+token;
    var tmdata =  {
        // touser: config.test_openid,
        touser: user.id,
        template_id:"-S0BOHCHx5Xy7xYWt6vJxyuFQ1Ei2MH1suLog2DnufM",
        // url:"http://www.baidu.com/",
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
                value:new Date().toString(),
                color:"#173177"
            },
            remark:{
                value:"您已完成本检查点~",
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
    
};