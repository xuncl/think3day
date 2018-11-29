 /* jshint esversion: 6 */
// 'use strict';
const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const config = require('../config');
const isExsitSync = require('./util').isExistSync;

const getAccessToken = function () {
  let queryParams = {
    'grant_type': 'client_credential',
    'appid': config.appId,
    'secret': config.appSecret
  };

  let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?'+qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
};

const saveToken = function () {
  getAccessToken().then(res => {
    let token = res.access_token;
    fs.writeFile('./token', token, function (err) {
      
    });
  });
};

const refreshToken = function () {
  saveToken();
  setInterval(function () {
    console.log('now refresh token..');
    saveToken();
  }, 1000*1000);
};

module.exports = refreshToken;