var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate'); //mongoose分页


//创建User数据模型；
var UserSchema = new Schema({
    name: String,
    password:String,
    data: {
        type: Date
    },
    city: String,
    gender: String
})


UserSchema.plugin(mongoosePaginate);//分页处理
module.exports = mongoose.model('User',UserSchema);//暴露User数据模型;