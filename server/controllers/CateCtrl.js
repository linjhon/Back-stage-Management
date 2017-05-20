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
    var type = {}
    if(req.params.type){
        type={'type':new RegExp(req.params.type,'i')}
    }
    
    Cate.find(type,function(err,data){
        var treeData=setTree(data,null);
        res.json(treeData);
    })
}



exports.delete=function(req,res,next){
    var id= req.params.id;
    var ids=[];
    Cate.findOne({_id:id},function(err,doc){
        console.log(doc)
        if(doc){
            ids = [doc._id];
            doc.getChildren().then(function(docs){
                for(var i=0;i<docs.length;i++){
                    ids.push(docs[i]._id);
                }

                Cate.remove({_id: {$in:ids}}).then(deleted=>{
                    res.json({status:200,'message':'ok'})
                })
            })
        }
    })
}
