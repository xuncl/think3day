 /* jshint esversion: 6 */
var schedule = require('node-schedule');

// 每月三周的定时器
exports.schedule3DayRule = function(cb){
    var rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    // rule.dayOfMonth = 1;
    // rule.hour = 1;
    // rule.minute = 42;
    rule.dayOfMonth = [3, 6, 9, 13, 16, 19, 23, 26, 29];
    rule.hour = 10; // 晚上八点发通知
    rule.minute = 55;
    
    schedule.scheduleJob(rule, function(){
       console.log('schedule3DayRule:' + new Date());
       cb();
    });
};

// 每天的定时器
exports.scheduleEverydayRule = function(cb){
    var rule = new schedule.RecurrenceRule();
    rule.hour = 20; // 晚上八点发通知
    rule.minute = 0;
    
    schedule.scheduleJob(rule, function(){
       console.log('scheduleEverydayRule:' + new Date());
       cb();
    });
};
