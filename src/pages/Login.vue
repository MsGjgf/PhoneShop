<template>
    <div class="login">
        <h1>~Welcome Login~</h1>
        <p>用户名：<el-input v-model.trim="userName" style="display: inline-block; width: 15%;" placeholder="请输入用户名" clearable/></p>
        <p>密&nbsp;&nbsp;&nbsp;码：<el-input v-model.trim="passWord" style="display: inline-block; width: 15%;" placeholder="请输入密码" show-password/></p>
        <el-button style="width: 15%;" @click="login" type="primary" round>登 录</el-button>
        <br/>
        <br/>
        <el-button style="width: 15%;" @click="register" type="primary" round>去注册</el-button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name:"Login",
    data(){
        return{
            userName:"",    //用户名
            passWord:""     //密码
        }
    },
    methods:{
        // 路由跳转去注册
        register(){
            this.$router.push("/register")
        },
        // 登录功能
        login(){  
            let flag = false
            axios.get("http://localhost:3000/users").then((res)=>{
                res.data.forEach(e => {
                    if(e.userName == this.userName && e.passWord == this.passWord){
                    this.$message({
                        message: '登录成功！',
                        type: 'success'
                    });
                    flag = true
                    // 设置token
                    sessionStorage.setItem("token",JSON.stringify(e))
                    // 路由跳转
                    this.$router.replace("/home")
                    // 设置/路由页面的activeIndex
                    sessionStorage.setItem("activeIndex","1")
                    return
                } 
                });
                if(!flag){
                    this.$message.error('请输入正确的账户密码！')
                }
            })
        },
        // enter登录
        keydown(event){
            if(event.key == "Enter"){
                this.login()
            }
        }      
    },
    created(){
        // 注册完成后带过来的数据
        this.userName = this.$route.query.U
        this.passWord = this.$route.query.P
    },
    mounted(){
        // 页面挂载完毕后添加键盘事件
        document.addEventListener("keydown",this.keydown)
    }
}
</script>

<style scoped>
    .login{
        text-align: center;
        margin-top: 10%;
    }
</style>