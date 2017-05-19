<template>
    <div v-if="login" class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex" class="layout-flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="this.$route.name" theme="dark" @on-select="go" width="auto">
                    <div class="layout-logo-left"></div>
                    <Menu-item v-for="(item,i) in menu" :key="i" :name="item.name" :class="{'text-center':spanLeft!=5}">
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{item.title}}</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight" class="layout-menu-right">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <div class="layout-ceiling-main">
                        <span v-if="login" class="user-name">欢迎回来，<a>{{this.$store.state.currentName}}</a> </span>
                        <a v-else href="/login">注册登录</a> |
                        <a href="#">帮助中心</a> |
                        <a href="#">安全中心</a> |
                        <a href="#">服务大厅</a> |
                        <a href="javascript:;" @click="loginOut" >退出</a>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/">首页</Breadcrumb-item>
                        <Breadcrumb-item v-if="this.$route.name!='home'">{{this.$route.name}}</Breadcrumb-item>
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
    <Login  v-else ></Login>
</template>
<script>
import Login from './Login.vue'
import {mapState} from '../store'

export default {
    data() {
        return {
            spanLeft: 5,
            spanRight: 19
        }
    },
    components:{
        Login
    },
    computed: {
        menu(){
            console.log(this.$store.state.menu)
            return this.$store.state.menu;
        },
        name(){
            var token = JSON.parse(localStorage.getItem('access_token')) || ''; 
            return token.name;
        },
        login(){
            var login = this.$store.state.login;
            var token = JSON.parse(localStorage.getItem('access_token')) || '';
            if(token.time){
                if(token.time < new Date().getTime()){
                    return login = false;
                }else if(token.time > new Date().getTime()){
                    return login = true;
                }
            }
            return login = false;       
        },
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
        loginOut(){
            localStorage.removeItem('access_token');
            this.$store.state.login = false;
        }
    }
    //, created:function(){
    //     var token = localStorage.getItem('access_token') || '' ;
    //     if(token){
    //         this.$http.post('http://localhost:3000/users/token',{token:token}).then(res=>{
    //             if(res.code === '500' ){
    //                 this.$Message.error('登陆超时或无效！');
    //                 this.$store.state.login = false;
    //             }else if(res.code === '304' || res.code === '200' ){
    //             this.$store.state.login = true;
    //             }
    //         })
    //     }else{
    //         this.$store.state.login = false;
    //     }
    // }
}
</script>

<style scoped>

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
    color:#ddd;
    float: right;
    margin-right: 15px;
}

.user-name{
    margin-right:5px;
}


.layout-ceiling-main a {
    margin:0 3px;
    color: #fff;
}
.user-name a{
    color:#ffeb3b;
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