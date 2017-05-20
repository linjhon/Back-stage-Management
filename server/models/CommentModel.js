var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate'); //mongoose分页


//创建User数据模型；
var CommentSchema = new Schema({
    title: String,
    author:String,
    content:String,
    date: {
        type: Date
    },
    type:String
})


CommentSchema.plugin(mongoosePaginate);//分页处理
module.exports = mongoose.model('Comment',CommentSchema);//暴露User数据模型;