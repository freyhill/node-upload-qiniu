/*
{   project:"apphome",
	author:"leinov",
	desc:"apphome 的页面以及接口",
	createDate:"2017.5.4"
}

关于路径
res.render();是渲染页面 指向的是view文件夹下面的ejs 所以路径就是view下面的路径
res.redirect();是刷新本页面 所以就是当前这个页面的路由  而不是指向view

*/

var express = require('express');
var url = require("url");
var qiniu = require("qiniu");
var router = express.Router();
var UploadpicModel = require('../models/uploadpic_model');
var date = new Date();
/*时间格式化*/

var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}


/*查询所有列表页面*/
router.get('/', function(req, res, next) {
    res.render('index', { title: 'node上传图片到七牛' });
})



router.post('/savepic', function(req, res, next) {
	console.log(req.query.picurl);

    var UploadpicEntity = new UploadpicModel({

        picurl: req.body.picurl,
        time: new Date().toLocaleString()

    });

    UploadpicEntity.save(function(err, data) {

        res.redirect('/');

    });


});

router.get('/piclist/:page', function(req, res, next) {

    var page = req.params.page;

    UploadpicModel.find({},function(error,docs){
            res.end(JSON.stringify(docs));  
    }).sort({_id:-1}).skip(12*page).limit(12);  

});

module.exports = router;