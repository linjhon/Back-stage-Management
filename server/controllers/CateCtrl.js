var mongoose = require('mongoose');

const Cate = require('../models/CateModel'); 

exports.create=function(req,res,next){
    const cate = new Cate(req.body);//新建一个实例对象，即新建一组数据；
    cate.save().then(data=>{
        res.json(data);
    })
}

exports.update = function(req,res,next){
    const id = req.params.id;
    console.log(id);
    Cate.findByIdAndUpdate(id,{$set:req.body},{new:true})
    .then(data=>{
        res.json(data);
    })
}

function setTree(data,pid){
    var result = [],temp;
    var data = JSON.parse(JSON.stringify(data));

    for(var i in data){
        if(data[i].parentId == pid){
            result.push(data[i]);

            temp = setTree(data,data[i]._id)
            if(temp.length>0){
                data[i].children = temp;
            }
        }
    }

    return result;
}

exports.findAll = function (req, res, next) {
    Cate.find().then(data => {
        res.json(data);
        console.log(data)
    })
}

