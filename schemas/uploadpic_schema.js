/*创建app schema*/
require('../config/mongo');
var mongoose = require("mongoose");

var UploadpicSchema = new mongoose.Schema({

	picurl :  {type : String },
	time	:  {type : String }
	
})

module.exports = UploadpicSchema;


