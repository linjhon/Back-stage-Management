var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const User = require('../models/UserModel') //引入数据模型;

exports.create = function (req, res, next) { //将路由操作分离出来;
    const user = new User(req.body);
    console.log(req.body)
    user.save().then(data => {
        if (data) {
            res.json(data)
        } else {
            res.json({
                msg: 'fail'
            })
        }
    })
}


exports.findAll = function (req, res, next) {
    User.find().then(data => {
        res.json(data);
        console.log(data)
    })
}


exports.getData = function (req, res, next) {
    var page = req.body.page ? parseInt(req.body.page) : 1; //默认1页十个数据
    var limit = req.body.limit ? parseInt(req.body.limit) : 10; //默认首页;
    var keywords = [];
    var name = req.body.name
    if (name != null && name.trim().length > 0) {
        keywords = {
            "name": new RegExp(name, 'i') //模糊搜索
        }
    }
    User.paginate(keywords, {
        page: page,
        limit: limit
    }, function (err, result) {
        if (err) {

        } else {
            res.json(result)
        }
    })
}

//删除单个;
exports.delete = function (req, res, next) {
    var id = req.params.id;
    User.findByIdAndRemove(id, function () {
        if (id) {
            res.json({
                status: 200,
                msg: 'ok'
            })
        } else {
            res.json({
                status: 204,
                msg: 'fail id'
            })
        }
    })

}

//删除多个;
exports.deleteMore = function (req, res, next) {
    var ids = req.body.ids;
    console.log(ids)
    User.remove({
        _id: {
            $in: ids
        }
    }, function () {
        res.json({
            status: 200,
            msg: 'ok'
        })
    })
}

// 更新;
exports.update = function (req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: false
    }).then(data => {
        res.json(data);
    })
}

//entoken;
// var content ={msg:"linqiang"};// 要生成token的主题信息
// var secretOrPrivateKey="I am a goog man!" // 这是加密的key（密钥） 
// var token = jwt.sign(content, secretOrPrivateKey, {
//     expiresIn: 1  // 24小时过期
// });
// console.log("token ：" +token );

//detoken;

//         setTimeout(function(){
// jwt.verify(token, secretOrPrivateKey, function (err, decode) {
//     if (err) {  //  时间失效的时候/ 伪造的token          
//         // rs.json({err:err})
//             console.log(err);  
        
//     } else {
//         // rq.decode = decode; 
//             console.log(decode.msg);  
//         // console.log(decode.msg);   // today  is  a  good  day
//         // next();
//     }
// })

//         },3000)




exports.login = function (req, res, next) {    
    // var name= req.body.name;
    User.find(req.body).then(data=>{
        console.log(data[0])
        if(data.length>0){//账号密码验证;
            var _token = jwt.sign({name:data[0].name,password:data[0].password},'backstage' , {
                expiresIn: '1d'  // 24小时过期
            });
            res.json({token:_token,name:data[0].name,login:'ok',code:'200'})
        }else{
            res.json({login:'error',code:'100'})
        }
    })
}

exports.token = function(req,res,next){
    var token = req.body.token || '';
    jwt.verify(token, 'backstage', function (err, decode) {
        if (err) {  //  时间失效的时候/ 伪造的token          
            res.json({login:'err',err:err.message,code:'500'})
        } else {
            console.log(decode);  
            User.find({name:decode.name,password:decode.password}).then(data=>{//与数据库比对解密后的账号密码
                if(data.length>0){//账号密码正确，返回304;
                    res.json({login:'ok',data:{name:decode.name},time:decode.exp,code:'304'})                    
                }else{//解密后的账号密码错误，提示
                    res.json({login:'error',code:'100'})                    
                }
            })
        }
    })
}