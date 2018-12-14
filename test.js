var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
var UserModel = require('./models/user');
var tmessage_controller = require('./controllers/tmessage');
var schedule = require('node-schedule');


function scheduleRecurrenceRule(){

    var rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    rule.date = 14;
    rule.hour = [new schedule.Range(0, 23)];
    rule.minute = [new schedule.Range(0, 59)];
 
    rule.second = [0,10,20,30,40,50];
    
    schedule.scheduleJob(rule, function(){
       console.log(new Date().Format("yyyy-MM-dd hh:mm:ss"));
    });
   
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
console.log(time2);
scheduleRecurrenceRule();

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

