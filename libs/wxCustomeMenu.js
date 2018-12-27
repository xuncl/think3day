// 'use strict';
 /* jshint esversion: 6 */
const fs = require('fs');
const request = require('request');

//token
const token = fs.readFileSync('./token').toString();

//常用type为view和click,分别为点击事件和链接
var menus = {
  "button": [
    {
      "name": "说明",
      "sub_button": [
        {
          "type": "view",
          "name": "规则",
          "url": "https://mp.weixin.qq.com/s/VmcgkESJ9kYyf6AAy0cCOA"
        },
        {
          "type": "view",
          "name": "灯泡提醒",
          "url": "https://mp.weixin.qq.com/s/1dW2l5K7YJJaPetCnSu9kg"
        }
      ]
    },
    {    
      "type":"view",
      "name":"个人主页",
      "url":"http://www.think3day.com/user/fetch"
  }]
};

function createMenu() {
  let options = {
    url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
    form: JSON.stringify(menus),
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

module.exports = createMenu;

