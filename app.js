 /* jshint esversion: 6 */
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const mongoose = require('mongoose');
const config = require('./config');

//引入token刷新
const getToken = require('./libs/common');
getToken();

//创建菜单
const createMenu = require('./libs/wxCustomeMenu');
createMenu();

//引入路由
var wechatRouter = require('./routes/weixin');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up mongoose connection
let dev_db_url = 'mongodb://'+config.mongohost+':'+config.mongoport+'/test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//解析xml
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

//启用路由
app.use('/wechat', wechatRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// edit in www file.
// app.listen(80);
console.log('Its running');

module.exports = app;

