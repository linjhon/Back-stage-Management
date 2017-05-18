<template>
    <div v-if="login" class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex" class="layout-flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="this.$route.name" theme="dark" @on-select="go" width="auto">
                    <div class="layout-logo-left"></div>
                    <Menu-item name="user" :class="{'text-center':spanLeft!=5}">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">用户管理</span>
                    </Menu-item>
                    <Menu-item name="article" :class="{'text-center':spanLeft!=5}">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">文章管理</span>
                    </Menu-item>
                    <Menu-item name="classify" :class="{'text-center':spanLeft!=5}">
                        <Icon type="ios-albums" :size="iconSize"></Icon>
                        <span class="layout-text">分类管理</span>
                    </Menu-item>
                    <Menu-item name="comment" :class="{'text-center':spanLeft!=5}">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">评论管理</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight" class="layout-menu-right">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <div class="layout-ceiling-main">
                        <a href="/login" @click="login">注册登录</a> |
                        <a href="#">帮助中心</a> |
                        <a href="#">安全中心</a> |
                        <a href="#">服务大厅</a>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/">首页</Breadcrumb-item>
                        <Breadcrumb-item v-show="this.$route.name!='home'">{{this.$route.name}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
    <div v-else class="login">
        <div class="login-box">
            div  
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                </Form-item>
            </Form>
        </div>         
    </div>
</template>
<script>

export default {
    data() {
        return {
            login: false,
            spanLeft: 5,
            spanRight: 19,
             formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
        }
    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 30;
        }
    },
    methods: {
        go(name) {//路由跳转
            this.$router.push({ name: name })
            console.log(this.$route)
        },
        toggleClick() {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    }
}
</script>

<style scoped>
.login{
    height:100%;
    background: #478de4;
    position: relative;
}

.login-box{
    border-radius: 5px;
    position: absolute;
    left:50%;
    top:50%;    
    transform: translate(-50%) translateY(-50%);
    padding:30px;
    background-color: #fff;
    width:500px;
    margin:0 auto;
    box-shadow: 0 0 6px #666;
}

.layout {
    border: 1px solid #d7dde4;
    background: #eef1f7;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}

.layout-flex {
    height: 100%;
}

.text-center {
    text-align: center;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    flex: 1;
}

.layout-content-main {
    padding: 10px;
    height: 100%;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
    height: 100%;
}

.layout-menu-right {
    display: flex;
    flex-direction: column;
}

.layout-header {
    height: 60px;
    line-height: 60px;
    background: #478de4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.ivu-btn-text {
    color: #fff;
}

.layout-ceiling-main {
    float: right;
    margin-right: 15px;
}

.layout-ceiling-main a {
    color: #fff;
}

.layout-hide-text .layout-text {
    display: none;
}

.ivu-col {
    transition: width .2s ease-in-out;
}

.layout-logo-left {
    height: 60px;
    background: #3d80d3;
    margin-bottom: 30px;
}
</style>