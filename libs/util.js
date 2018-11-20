const parserString = require('xml2js').parseString;
const fs = require('fs');
const crypto = require('crypto');

//将xml转为obj对象
exports.convertXMLtoJSON = function (xml) {
  if (typeof xml !== 'string') {
    console.error('请输入合法的xml字符串');
    return ;
  }

  return new Promise((resolve, reject) => {
    parserString(xml,  function (err, results) {
      if(err) {
        reject(err);
      }else {
        resolve(results);
      }
    })
  })
};

//判断文件是否存在

exports.isExistSync = function (path) {
  try {
    return typeof fs.statSync(path) === 'object';
  } catch (e) {
    return false;
  }
};

exports.sha1 = function (str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}
