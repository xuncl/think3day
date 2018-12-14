 /* jshint esversion: 6 */
const fs = require('fs');
const config = require('../config');
const request = require('request');

// 检查点前的提醒
exports.sendPreCheckMessage = function(user) {
    var tmdata =  {
        // touser: config.test_openid,
        touser: user.id,
        template_id:"m2eom0Dedvt6eyKCkymL-kPEuEJ6A-omkatwJhwzATo",
        // url:"http://www.baidu.com/",
        data:{
            first: {
                value:"Hi，今天是检查点~",
                color:"#173177"
            },
            // 任务名称
            keyword1:{
                value:"在检查点前至少提交一次思考",
                color:"#173177"
            },
            // 当前状态
            keyword2: {
                value:"未完成",
                color:"#173177"
            },
            // 结束时间
            keyword3: {
                value:"今晚 "+new Date().Format("yyyy-MM-dd")+" 23:59",
                color:"#173177"
            },
            remark:{
                value:"花五分钟，记下最近的所思所得吧~",
                color:"#0e0091"
            }
        }
    };
    sendMessagebyTemplate(user, tmdata);
};


// 注册成功提醒
exports.sendRegisterMessage = function(user) {
    var tmdata =  {
        // touser: config.test_openid,
        touser: user.id,
        template_id:"YhK1x5TsLKwq6zdnHdmion4I9Y9jF35WxvHk844cyPg",
        // url:"http://www.baidu.com/",
        data:{
            first: {
                value:"您好，"+user.name,
                color:"#173177"
            },
            keyword1:{
                value:"" + user.code,
                color:"#173177"
            },
            keyword2: {
                value:"绑定成功！",
                color:"#173177"
            },
            remark:{
                value:"想要更多功能，可以跟群主需求",
                color:"#0e0091"
            }
        }
    };
    sendMessagebyTemplate(user, tmdata);
};

exports.sendNormalMessage = function(user) {
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
                value:new Date().Format("yyyy-MM-dd hh:mm"),
                color:"#173177"
            },
            remark:{
                value:"您已完成本检查点~",
                color:"#0e0091"
            }
        }
    };
    sendMessagebyTemplate(user, tmdata);
};

function sendMessagebyTemplate(user, tmdata){
    var token = fs.readFileSync('./token').toString();
    var posturl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+token;
    
    let options = {
      url: posturl,
      form: JSON.stringify(tmdata),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    console.log("sendTM: user_open_id: "+user.id);
    request.post(options, function (err, res, body) {
      if (err) {
        console.log("sendTM: " + err);
      } else {
        console.log("sendTM: " + body);
      }
    });
}

Date.prototype.Format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};