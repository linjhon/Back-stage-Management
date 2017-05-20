var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate'); //mongoose分页


//创建User数据模型；
var ArticleSchema = new Schema({
    title: String,
    author:String,
    date: {
        type: Date
    },
    type:String
})


ArticleSchema.plugin(mongoosePaginate);//分页处理
module.exports = mongoose.model('Article',ArticleSchema);//暴露User数据模型;