var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
var UserModel = require('./models/user');
var tmessage_controller = require('./controllers/tmessage');
var schedule = require('node-schedule');
const mongoose = require('mongoose');
const config = require('./config');

// Set up mongoose connection
let dev_db_url = 'mongodb://'+config.mongohost+':'+config.mongoport+'/test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var u = new UserModel();

UserModel.find({}, (err, users) => {
    if (err) {
        console.log(err);
    }
    
    // console.log("users:");
    // console.log(users[0]);
    // var us = JSON.parse(''+users);
    // console.log(Array.isArray(users));
    var len = users.length;
    for(var i = 0; i<len; i++){
        user = users[i];
        // console.log("user"+JSON.stringify(users[i]));
        user.isdone = 1;
        // console.log("user888888==>"+user);
        // tmessage_controller.sendPreCheckMessage(user);
        user.save(function(err, doc){
            if (err) {
                console.log('save error:' + err);
            } else console.log('save sucess \n' + doc);
        });
    }
    console.log("func end");
    return;
});

console.log("********************************");
console.log("********************************");
console.log("********************************");
console.log("********************************");
console.log("********************************");
console.log("********************************");
console.log("********************************");
console.log("********************************");
// console.log(u);


// function scheduleRecurrenceRule(){

//     var rule = new schedule.RecurrenceRule();
//     // rule.dayOfWeek = 2;
//     // rule.month = 3;
//     // rule.dayOfMonth = 1;
//     // rule.hour = 1;
//     // rule.minute = 42;
 
//     rule.second = 0;
    
//     schedule.scheduleJob(rule, function(){
//        console.log(new Date().toString());
//     });
   
// }
// Date.prototype.Format = function (fmt) { //author: meizz
//     var o = {
//         "M+": this.getMonth() + 1, //月份
//         "d+": this.getDate(), //日
//         "h+": this.getHours(), //小时
//         "m+": this.getMinutes(), //分
//         "s+": this.getSeconds(), //秒
//         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//         "S": this.getMilliseconds() //毫秒
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// };

// var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
// console.log(time2);
// scheduleRecurrenceRule();

// // 插入
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     var myobj =  [
//         { name: 'xuncl', url: 'https://www.xuncl.com', type: 'cn'},
//         { name: 'Google', url: 'https://www.google.com', type: 'en'},
//         { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//        ];
//     dbo.collection("xuncl").insertMany(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("插入的文档数量为: " + res.insertedCount);
//         db.close();
//     });
// });


// 查询
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     dbo.collection("xuncl"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log("查询得到结果为：");
//         console.log(result);
//         db.close();
//     });
// });

// 更新
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     var whereStr = {"name":'xuncl'};  // 查询条件
//     var updateStr = {$set: { "url" : "https://www.runoob.com" }};
//     dbo.collection("xuncl").updateOne(whereStr, updateStr, function(err, res) {
//         if (err) throw err;
//         console.log("文档更新成功");
//         db.close();
//     });
// });

// 删除
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     var whereStr = {"name":'Facebook'};  // 查询条件
//     dbo.collection("xuncl").deleteOne(whereStr, function(err, obj) {
//         if (err) throw err;
//         console.log("文档删除成功");
//         db.close();
//     });
// });

// sort,limit,skip
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     var mysort = { type: 1 };
//     dbo.collection("xuncl").find().sort(mysort).skip(1).limit(1).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

