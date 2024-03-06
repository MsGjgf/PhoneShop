<template>
    <div class="register">
        <div class="container">
            <h1 class="title">注册你的账号</h1>
            <div v-for="(item,index) in fields" :key="index" class="inputContainer">
                <div class="field">
                    {{item.title}}
                    <span v-if="item.required" style="color: red;">*</span>
                </div>
                <input v-model="item.model" class="input" :type="item.type"/>
                <div class="tip" v-if="index == 1">请确认密码程度需要大于6位</div>
            </div>
            <button @click="createAccount" class="btn">注册账号</button><router-link to="/login">去登陆</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"Register",
    data(){
                return{
                    fields:[
                        {
                            title:"用户名",
                            required:true,
                            type:"text",
                            model:""    // 声明变量
                        },
                        {
                            title:"密码",
                            required:true,
                            type:"password",
                            model:""
                        },
                        {
                            title:"电话号码",
                            required:false,
                            type:"text",
                            model:""
                        },
                        {
                            title:"地址",
                            required:false,
                            type:"text",
                            model:""
                        }
                    ]
                }
            },
            computed:{
                name:{
                    get(){
                        return this.fields[0].model
                    },
                    set(value){
                        this.fields[0].model = value
                    }
                },
                password:{
                    get(){
                        return this.fields[1].model
                    },
                    set(value){
                        this.fields[1].model = value
                    }
                },
                phone:{
                    get(){
                        return this.fields[2].model
                    },
                    set(value){
                        this.fields[2].model = value
                    }
                },
                address:{
                    get(){
                        return this.fields[3].model
                    },
                    set(value){
                        this.fields[3].model = value
                    }
                },
                
            },
            methods:{
                // 密码正则表达式:英文大写、英文小写、数字、特殊符号，四种里面至少包含3种
                pwdCheck(){
                    let flag = 0;
                    if(/[A-Z]+/.test(this.password)){
                        flag++
                    }
                    if(/[a-z]+/.test(this.password)){
                        flag++
                    }
                    if(/[0-9]+/.test(this.password)){
                        flag++
                    }
                    if(/[\W_]+/.test(this.password)){
                        flag++
                    }
                    if(flag>=3){
                        return false
                    }else{
                        return true
                    }
                },
                // 验证输入信息
                createAccount(){
                    if(this.name.length == 0){
                        alert("请输入用户名")
                        return true
                    }else if(this.password.length <= 6){
                        alert("密码设置需要大于6位字符")
                        return
                    }else if(this.pwdCheck(this.password)){
                        alert("密码需含有英文大写、小写、数字、特殊符号,四种里面至少包含3种")
                        return
                    }
                    // 请求get json-server
                    axios.get("http://localhost:3000/users").then((res)=>{
                        let flag = false
                        res.data.forEach(e => {
                            if(e.userName===this.fields[0].model){
                                flag = true
                                return
                            }
                        })
                        if(flag){
                            alert("用户名已存在！")
                        }else{
                            // 向json注入数据
                            axios.post("http://localhost:3000/users",{
                                id:"u-"+ ++(res.data.length),
                                userName:this.fields[0].model,
                                passWord:this.fields[1].model,
                                telePhone:this.fields[2].model,
                                address:this.fields[3].model,
                                shopCar:[]
                            }).then((res)=>{
                                alert("注册成功！")
                                // 路由跳转至login
                                this.$router.push({name:"Login",query:{
                                U:this.fields[0].model,
                                P:this.fields[1].model   
                                }})
                            })
                            
                    }
                })
            }
        }
    }
</script>

<style scoped>
    
    .container{
            margin: 0 auto;
            margin-top: 20px;
            text-align: center;
            width: 300px;
        }
        .title{
            font-size: 45px;
        }
        .input{
            width: 90%;
        }
        .inputContainer{
            text-align: left;
            margin-bottom: 20px;
        }
        .subContainer{
            text-align: left;
        }
        .field{
            font-size: 14px;
        }
        .input{
            border-radius: 6px;
            height: 25px;
            margin-top: 10px;
            border-color: silver;
            border-style: solid;
            background-color: cornsilk;
        }
        .tip{
            margin-top: 5px;
            font-size: 12px;
            color: gray;
        }
        .setting{
            font-size: 9px;
            color: black;
        }
        .label{
            font-size: 12px;
            margin-left: 5px;
            height: 20px;
            vertical-align: middle;
        }
        .checkbox{
            height: 20px;
            vertical-align: middle;
        }
        .btn{
            border-radius: 10px;
            height: 40px;
            width: 300px;
            margin-top: 30px;
            background-color: deepskyblue;
            border-color: blue;
            color: white;
        }
</style>