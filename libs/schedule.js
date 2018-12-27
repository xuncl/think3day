 /* jshint esversion: 6 */
var schedule = require('node-schedule');

// 检查点当天的定时器
exports.schedule3DayRule = function(cb){
    var rule = new schedule.RecurrenceRule();
    rule.date  = [3, 6, 9, 13, 16, 19, 23, 26, 29];
    rule.hour = 19; // 晚上20点发通知
    rule.minute = 55;
    
    schedule.scheduleJob(rule, function(){
       console.log('schedule3DayRule:' + new Date());
       cb();
    });
};

// 检查点次天的定时器
exports.schedule3DayNextRule = function(cb){
    var rule = new schedule.RecurrenceRule();
    rule.date  = [4, 7, 10, 14, 17, 20, 24, 27, 30];
    rule.hour = 8; // 八点发通知
    rule.minute = 0;
    
    schedule.scheduleJob(rule, function(){
       console.log('schedule3DayNextRule:' + new Date());
       cb();
    });
};

// 每天的定时器
exports.scheduleEverydayRule = function(cb){
    var rule = new schedule.RecurrenceRule();
    rule.hour = 7; // 早上7点发通知
    rule.minute = 0;
    
    schedule.scheduleJob(rule, function(){
       console.log('scheduleEverydayRule:' + new Date());
       cb();
    });
};
