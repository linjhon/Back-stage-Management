var mongoose = require('mongoose');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
const Upload = require('../models/UploadModel') //引入数据模型;
var formidable = require('formidable');//文件附带的数据;


var multer = require('multer');


function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/ablums')
  },
  filename: function (req, file, cb) {
      console.log(file.originalname);
    cb(null, file.fieldname + '-' + Date.now()+'.'+getFileExtension(file.originalname.toLowerCase()))
    // cb(null, Date.now()+'-'+file.originalname)
  }
})

var upload = multer({ storage: storage }).single('avatar');


exports.upload = function (req, res, next) { //将路由操作分离出来;
    
    console.log('原始地址',req.originalUrl);
    var form = new formidable.IncomingForm();
    var type = ''
    form.parse(req,function(err,fields,files){
        console.log(fields);
        if(fields.type){
            type = fields.type;
        }
    })

    upload(req,res,function(err){
        if(err){
            res.json({err:err,code:'100'});
        }
        if(req.file){
            var url = 'http://localhost:8000/'+req.file.path;
            var name = req.file.filename;
            ablum = new Upload({name:name,url:url,type:type})
            ablum.save().then(data=>{                
                res.json({msg:'ok',code:'200',data:req.file})
            })
        }else{
            res.json({err:'failed',code:'404'});
        }
    })
}

exports.findAll = function (req, res, next) {
    var type={}
    if(req.params.type){
        type = {type:req.params.type}
    }
    Upload.find(type).then(data => {
        res.json(data);
        console.log(data)
    })
}

exports.delete = function (req, res, next) {
    var id = req.params.id;
    console.log(req.url)
    console.log('_id:',req.params)
    Upload.findByIdAndRemove(id, function () {
        if (id) {
            res.json({
                status: 200,
                msg: 'ok'
            })
        } else {
            res.json({
                status: 204,
                msg: 'failed id'
            })
        }
    })
}

