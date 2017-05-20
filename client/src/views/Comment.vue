<template>
    <Row style="height:100%;" :gutter="10">
        <Col :span="6" v-show="treeShow" class="col">
        <ClassifyTree :type="model"></ClassifyTree>
        </Col>
        <Col :span="18" class="col">
        <div  class="user-btn">
            <Button type="ghost" icon="plus-round" @click="addUser = true">添加</Button>
            <Modal v-model="addUser" title="添加评论">
                <div slot="footer"></div>
                <Form :model="UserItem" ref="UserItem" :label-width="80" :rules="ruleValidate">
                    <Form-item label="文章标题" prop="title">
                        <Input v-model="UserItem.title" placeholder="请输入标题"></Input>
                    </Form-item>
                    <Form-item label="作者" prop="author">
                        <Input v-model="UserItem.author"  placeholder="请输入作者名字"></Input>
                    </Form-item>                                     
                    <Form-item label="评论内容" prop="content">
                        <Input v-model="UserItem.content" type="textarea" placeholder="请输入评论内容"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('UserItem')">提交</Button>
                        <Button type="ghost" @click="handleReset('UserItem')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Modal>
            <Button type="ghost" icon="minus-round">删除</Button>
            <Input icon="search" placeholder="请输入..." v-model="filter.name" style="width:200px;"></Input>
            <Button type="ghost" @click="getData">搜索数据</Button>
            <!--<Button type="ghost" icon="minus-round" @click="treeShow = false">参看分类</Button>            -->
        </div>
        <Table border :columns="columns" :data="list"></Table>
        <Page :total="filter.total" class="page" :current="filter.page" :page-size="filter.limit" @on-change="changePage" size="small" show-elevator show-sizer></Page>

        </Col>
    </Row>
</template>

<script>
import ClassifyTree from '../components/ClassifyTree.vue'    
import getdata from '../common/getdata'

export default {
    mixins: [getdata],
    data() {
        return {
            treeShow:true,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '标题',
                    key: 'title',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                },
                                stype:{
                                    marginRight:'5px'
                                }
                            }),
                            h('strong', params.row.title)
                        ]);
                    }
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '日期',
                    key: 'date'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.update(params.index)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            model: 'comment',
            UserItem: {
                _id: null,
                title: '',
                author: '',
                content: '',
                date:''
            },
            ruleValidate: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '名字不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入文章内容', trigger: 'blur' },
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        ClassifyTree
    }
}
</script>

<style scoped> 
    .user-box{
        height: 100%;
        position: relative;
    }
    .col{
        height:100%;
    }
    .user-btn{
        margin-bottom:10px;
    }
    .page{
        position: absolute;
        right:10px;
        bottom:10px;
    }
</style>

