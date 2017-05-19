<template>
    <div class="login">
        <div class="login-box">
            <div class="login-title"> 后台管理系统 </div>
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
                    <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
    methods:{
        handleSubmit(name) {
            var vm = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var name = this.formInline.name;
                    var password = CryptoJs.MD5(this.formInline.password,{assign:true}).toString();
                    vm.$http.post('http://localhost:3000/users/login',{name:name,password:password}).then(res=>{
                        console.log(res.data);
                        console.log(vm.formInline);
                        if(res.data.code == '100'){
                            this.$Message.error('账号或密码错误!');                            
                        }else if(res.data.code == '200'){
                            this.$Message.success('登陆成功!');
                            this.login = true;
                        }
                    })
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
    background: #478de4 url('../assets/500007055.jpg') no-repeat;
    background-image: cover;
    position: relative;
}

.login-title{
    color:#111;
    text-align: center;
    font-size: 20px;
    margin-bottom: 24px;
    font-weight: 600;
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
</style>

