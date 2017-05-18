var CryptoJs = require('crypto-js');

export default{
        data() {
            return {
                list:[],
                self:this,
                ids:[],
                filter:{
                    limit:5,
                    page:1,
                    name:'',
                    total:0
                },
                addUser :false,
              }
        }, 
        methods: {
            handleSubmit (name) {
                console.log(1)
                this.$refs[name].validate((valid) => {                  


                    if (valid) {
                    
                        var _this = this;
                        var subUrl = '';
                        var method = '';

                        if(_this.UserItem._id !=null){
                            subUrl = `http://localhost:3000/${_this.model}/` + _this.UserItem._id;
                            method = 'PUT';
                        }else{
                            subUrl = `http://localhost:3000/${_this.model}`;
                            method = 'POST';
                        }
                    
                    
                    
                         _this.UserItem.password = CryptoJs.MD5(_this.UserItem.password,{assign:true}).toString();
                        this.$http({
                            method: method,
                            url:subUrl,
                            data: _this.UserItem
                        }).then(function(res){
                            _this.addUser = false;
                            _this.$Message.success('提交成功');
                            console.log(_this.$data.UserItem);
                            console.log(_this.$options.data().UserItem);
                            Object.assign(_this.$data.UserItem,_this.$options.data().UserItem)
                            _this.getData();
                        })
                       
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            changePage(page){
                this.filter.page = page;
                this.getData();
            },
            handleSelectChange(select){
                var _this = this;
                if(select.length>0){
                    var ids = [];
                    let selectLen = select.length;
                    for(var i=0;i<selectLen;i++){
                        ids.push(select[i]._id);
                    }
                    _this.ids = ids;
                }

            },
            getData(){
                var _this = this;
                this.$http.post(`http://localhost:3000/${_this.model}/data`,_this.filter)
                .then(function(result){
                    if('docs' in result.data){
                        _this.list = result.data.docs;
                        _this.filter.total = result.data.total;
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            removes(){
                var _this = this;
                if(_this.ids.length>0){

                   _this.$Modal.confirm({
                       title:"警告",
                       content:"确认删除？",
                       onOk: ()=>{
                           _this.$http.post(`http://localhost:3000/${_this.model}/removes`,{ids:_this.ids}).then(function(res){
                               _this.getData();
                               _this.$Message.info('删除成功');
                           })
                          
                       },
                       onCancel:()=>{
                           _this.$Message.info('取消删除');
                       }
                   })


                }
            },
            remove(index){
                var _this = this;
                var id = _this.list[index]._id;

                 _this.$Modal.confirm({
                       title:"警告",
                       content:"确认删除？",
                       onOk: ()=>{
                           _this.$http.delete(`http://localhost:3000/${_this.model}/`+id).then(function(res){
                               _this.getData();
                               _this.$Message.info('删除成功');
                           })
                          
                       },
                       onCancel:()=>{
                           _this.$Message.info('取消删除');
                       }
                   })


            },
            update(index){
                var _this = this;
                _this.addUser = true;
                var dataObj = Object.assign({},_this.list[index]);
                _this.UserItem = dataObj;


            }

        },
        created(){
            this.getData();
        }
    }