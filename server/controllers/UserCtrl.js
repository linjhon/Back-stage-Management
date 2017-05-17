var mongoose = require('mongoose');

const User = require('../models/UserModel')//引入数据模型;

exports.create = function(req,res,next){//将路由操作分离出来;
    const user = new User(req.body);
    console.log(req.body)
    user.save().then(data=>{
        if(data){
            res.json(data)
        }else{
            res.json({msg:'fail'})
        }
    })
}


exports.findAll = function (req,res,next){
    User.find().then(data=>{
        res.json(data);
        console.log(data)
    })   
}