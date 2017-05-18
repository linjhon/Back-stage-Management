var mongoose = require('mongoose');

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