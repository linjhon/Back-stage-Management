<template>
    <Row class="tree-box">
        <Col class="tree">
            <div class="tree-btn">
                    <Dropdown trigger="click" placement="bottom-start" @on-click="addTree">
                        <Button type="ghost" icon="plus"  size="small"></Button>
                        <Dropdown-menu slot="list">
                            <Dropdown-item name="tree">添加新分类</Dropdown-item>
                            <Dropdown-item name="subtree">添加子分类</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                    <Button type="ghost" icon="minus" @click="delectTree" size="small"></Button>
                    <Button type="ghost" icon="edit" @click="editTree" size="small"></Button>
                
                <Modal
                    v-model="editTreeTitle"
                    title="请输入您需要修改的内容">
                    <Input v-model="formValidate.title"  placeholder="您需要修改的内容"></Input>
                    <div slot="footer">
                         <Button type="primary" @click="setTreeData">提交</Button>
                    </div>
                </Modal>
            </div>
             <Tree :data="baseData" @on-select-change="selectTree"></Tree>
        </Col> 
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                currentMode:'',
                editTreeTitle:false,
                currentSelect:null,
                formValidate:{
                    _id:null,
                    title:'',
                    type:'',
                    parentId:null
                },
                baseData: [{
                    expand: true,
                    disableCheckbox: true,
                    title: '分类管理',
                    type:'manage',
                    children:[]
                }]
            }
        },
        methods:{
            getTreeData:function(type){
                var vm=this;
                this.$http.get(`http://localhost:3000/cate/data`).then(res=>{
                    vm.baseData[0].children=res.data;
                })
            },
            setTreeData:function(){
                var vm = this;
                var currentMode = this.currentMode;
                console.log(currentMode);
                var url = 'http://localhost:3000/cate';
                var data = this.formValidate;
                var method = 'post';
                if(currentMode === 'addSubTree'){
                    //添加子分类;
                    this.formValidate.parentId=this.currentSelect;
                }else if(currentMode === 'editTree'){
                    this.formValidate._id=this.currentSelect;
                    method = 'put';
                    url = `http://localhost:3000/cate/${this.currentSelect}`
                }
                console.log(this.formValidate)
                this.$http({
                    url:url,
                    method:method,
                    data:data
                }).then(res=>{
                    console.log(res.data);
                    vm.getTreeData();
                })
                
                this.editTreeTitle=false;
            },
            addTree:function(tips){
                // console.log('我正在添加tree',getCheckedNodes)
                var _id = this.currentSelect;
                console.log(tips)
                if(tips=="subtree"){
                    if(!_id){
                        this.$Message.warning('您未选中任何内容，添加子分类！')
                    }else{
                        this.currentMode = 'addSubTree';
                        this.editTreeTitle = true; 
                    }
                }else{
                    this.currentMode = 'addTree';
                    this.editTreeTitle = true; 
                }
            },
            delectTree:function(){
                var _id=this.currentSelect;
                var vm=this;
                console.log(_id)
                if(!_id){
                    this.$Message.warning('您未选中任何内容，无法删除！')
                }else{
                    this.$http.delete(`http://localhost:3000/cate/${_id}`).then(res=>{
                        console.log(res)
                        vm.getTreeData()
                    })
                }
            },
            selectTree:function(NodeArr){
                console.log('我选中了tree',NodeArr)
                if(NodeArr[0]){
                    this.currentSelect = NodeArr[0]._id;
                    this.formValidate.title = NodeArr[0].title;
                    this.formValidate.type = NodeArr[0].type;
                }else{
                    this.currentSelect = null;
                }
                console.log(this.currentSelect)
            },
            checkTree:function(Node){
                console.log(Node)
            },
            editTree:function(){
                var _id=this.currentSelect;
                console.log(_id)
                if(!_id){
                    this.$Message.warning('您未选中任何内容，无法编辑！')
                }else{
                    // this.$Modal.info()
                    this.editTreeTitle = true;
                    this.currentMode = 'editTree';
                }
            }
        },
        created:function(){
            this.getTreeData()
        },
        updated:function(){

        }
    }
</script>

<style scoped>

    .tree-box{
        height:100%;
    }
    .tree-btn{
        margin:20px 0;
    }
    .tree{
        margin-left:10px;
        border-right:1px solid #e1e5f0;
        float:left;
        width:200px;
        height:100%;
    }
</style>