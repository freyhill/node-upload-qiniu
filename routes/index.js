var express = require('express');
var app = express();

module.exports = function (app) {
  
 /* app.get('/', function(req, res, next) {
  		res.render('index', { title: 'node上传图片到七牛' });
	});*/

  app.use('/upload-qiniu', require('./upload-qiniu')); // 图片上传接口路由

  app.use('/', require('./api')); // 图片上传接口路由


};