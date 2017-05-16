var express = require('express');
var router = express.Router();
var url = require("url");
var qiniu = require("qiniu");
var fs = require("fs");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'ad-5LqieYzV0jY0_TUgLFQoZ6FbVW0zAqYmETJQC';
qiniu.conf.SECRET_KEY = 'n4ptxxdHqi6C6wUlKuujEmnuZSrAVzuGVUU-hQJh';

//要上传的空间
bucket = 'leinovpic';

// 要上传文件的本地路径 因为js不能获取图片本地的完整路径
// 我们将本地获取的图片转为base64然后传过来 通过文件流存在本地 获取路径再传到七牛上


router.post('/uploadpic', function(req, res, next){
    // 图片数据流
    var imgData = req.body.imgData;
    // 构建本地临时图片名
    var fileName = Date.now() + '.png';
    // 构建本地图片临时路径
    var filePath = 'temp.png'
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    console.log(base64Data);
    fs.writeFile(filePath, base64Data,'base64', function(err) {
        console.log(err);
        if(err){
          res.end(JSON.stringify({status:'102',msg:'文件写入失败'})); 
        }else{
                //生成上传
                var putPolicy = new qiniu.rs.PutPolicy(bucket+":" + fileName);
                var token = putPolicy.token();
                var extra = new qiniu.io.PutExtra();
                qiniu.io.putFile(token, fileName, filePath, extra, function(err, ret) {
              
                    if(!err) {
                        // 上传成功， 处理返回值  
                        // ret.key 是图片的名字
                        var imageSrc = 'http://onxvmj6af.bkt.clouddn.com/' + ret.key;
                        res.end(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc}));   
                     } else {
                        // 上传失败， 处理返回代码
                       res.end(JSON.stringify({status:'101',msg:'上传失败',error:ret}));    
                     }
                     // 上传之后删除本地文件
                     //fs.unlinkSync(filePath);
             });
        }
    });
})
module.exports = router;
