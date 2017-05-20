var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Materialized = require('mongoose-materialized');

//创建User数据模型；
var CateSchema = new Schema({
    type:String,
    title:String
})

CateSchema.plugin(Materialized);
module.exports = mongoose.model('Cate',CateSchema);//暴露数据模型;