<template>
    <div class="user-box">
        <Row span="4" class="user-btn">
            <Button type="ghost" icon="plus-round" @click="addUser = true" >添加用户</Button>
            <Modal v-model="addUser" title="添加用户" >
                <div slot="footer"></div>
                <Form :model="UserItem" ref="UserItem"  :label-width="80" :rules="ruleValidate" >
                    <Form-item label="姓名" prop="name">
                        <Input v-model="UserItem.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <Form-item label="密码"  prop="password">
                        <Input v-model="UserItem.password" type="password" placeholder="请输入密码"></Input>
                    </Form-item>
                    <Form-item label="城市"  prop="city">
                        <Select v-model="UserItem.city" placeholder="请选择所在城市">
                            <Option value="beijing">北京市</Option>
                            <Option value="shanghai">上海市</Option>
                            <Option value="shenzhen">深圳市</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="性别"  prop="gender">
                        <Radio-group v-model="UserItem.gender">
                            <Radio label="male">男</Radio>
                            <Radio label="female">女</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="兴趣" prop="interest">
                        <Checkbox-group v-model="UserItem.interest">
                            <Checkbox label="吃饭"></Checkbox>
                            <Checkbox label="睡觉"></Checkbox>
                            <Checkbox label="跑步"></Checkbox>
                            <Checkbox label="看电影"></Checkbox>
                        </Checkbox-group>
                    </Form-item>
                    <Form-item label="个性说明" prop="mine">
                        <Input v-model="UserItem.mine" type="textarea" placeholder="请输入..."></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('UserItem')">提交</Button>
                        <Button type="ghost" @click="handleReset('UserItem')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Modal>
            <Button type="ghost" icon="minus-round">删除用户</Button>    
            <Input icon="search" placeholder="请输入..." v-model="filter.name" style="width:200px;"></Input>
            <Button type="ghost" @click="getData">搜索数据</Button>
        </Row>
        <Table border  :columns="columns" :data="list"></Table>
        <Page :total="filter.total" class="page" :current="filter.page" :page-size="filter.limit" @on-change="changePage" size="small" show-elevator show-sizer></Page>

    </div>
</template>

<script>
    import getdata from '../common/getdata'
    export default {
        mixins:[getdata],
        data () {
            return {
                columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '城市',
                        key: 'city'
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
                model:'users',
                UserItem: {
                    _id:null,
                    name: '',
                    password: '',
                    city:'',                    
                    gender: 'male',
                    interest: [],
                    mine: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    mine: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 2, message: '介绍不能少于2字', trigger: 'blur' }
                    ]
                }
            }
        }
    }
</script>

<style scoped>  
    .user-box{
        height: 100%;
        position: relative;
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