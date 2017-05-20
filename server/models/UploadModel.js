var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//创建User数据模型；
var UploadSchema = new Schema({
    name:String,
    type:String,
    url:String
})

module.exports = mongoose.model('Upload',UploadSchema);//暴露数据模型;