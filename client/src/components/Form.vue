<template>
    <Form :model="UserItem" :label-width="80" :rules="ruleValidate" >
        <Form-item label="姓名">
            <Input v-model="UserItem.name" placeholder="请输入姓名"></Input>
        </Form-item>
        <Form-item label="密码">
            <Input v-model="UserItem.password" type="password" placeholder="请输入密码"></Input>
        </Form-item>
        <Form-item label="城市">
            <Select v-model="UserItem.city" placeholder="请选择所在城市">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </Form-item>
        <Form-item label="性别">
            <Radio-group v-model="UserItem.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="兴趣">
            <Checkbox-group v-model="UserItem.interest">
                <Checkbox label="吃饭"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item label="个性说明">
            <Input v-model="UserItem.mine" type="textarea" placeholder="请输入..."></Input>
        </Form-item>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        }
    }
</script>

<style>
    .ivu-form-item .ivu-form-item-label{
        text-align:left;
    }
</style>