
//创建model

var mongoose = require("mongoose");
var UploadpicSchema = require("../schemas/uploadpic_schema");
  
var UploadpicModel  = mongoose.model('uploadpic',UploadpicSchema);

module.exports = UploadpicModel;