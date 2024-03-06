<template>
    <div class="home">
        <!-- 导航栏 -->
        <ul class="nav" name="top">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to="/home/index">首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/home/tab/xiaomi/小米">商品分类</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/home/user">个人中心</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/home/shopCar">购物车({{$store.getters.getUser.shopCar.length}})</router-link></el-menu-item>
            <el-input v-model="searchVal" style="width: 20%; margin: 10px 0px 0px 50px;" placeholder="请输入关键字" prefix-icon="el-icon-search"/>
            <el-button @click="quit" type="info" style="position: absolute;top: 10px; right: 10px;" round>退出登录</el-button>    
        </el-menu>
        </ul>
        <!-- 路由占位 -->
        <router-view style="background-color: #EBECF0;"></router-view>
        <!-- top回到顶部  -->
        <a href="#top" style="
        width: 50px; 
        height: 50px; 
        position: fixed; 
        z-index: 99;
        top: 84%;
        left: 94%;
        background-color: gray;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        cursor: pointer;">Top</a>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name:"Home",
    data(){
        return{
            searchVal:"",       //搜索框值
            activeIndex:sessionStorage.getItem("activeIndex")   //导航栏激活状态
        }
    },
    methods:{
        // 设置当前导航栏激活状态
        handleSelect(key){
            sessionStorage.setItem("activeIndex",key)
        },
        // 退出登录
        quit(){
            sessionStorage.clear()
            this.$message({
                        message: '退出成功！',
                        type: 'success'
                    });
            this.$router.push("/login")
        }
    },
    watch:{
        // 监听搜索框变化
        searchVal:{
            handler(n){
                // 如果搜索框为空，则回到首页
                if(!n){
                    this.$router.push("/home",
                        /* 防止控制台报NavigationDuplicated错误 */
                        // 成功回调
                        ()=>{
                            console.log("success")
                        },
                        // 失败回调
                        ()=>{
                            console.log("error")
                        }
                    )                  
                }else{
                    // 将搜索框新的value根据手机名称是否包含关键字进行过滤，将过滤后的数组作为参数传到Search组件
                    this.$router.push(`/home/search/${JSON.stringify(this.$store.getters.getPhones.filter((p)=>{
                        return p.phoneName.indexOf(n) != -1
                    }))}`,
                    /* 防止控制台报NavigationDuplicated错误 */
                        // 成功回调
                        ()=>{
                            console.log("success")
                        },
                        // 失败回调
                        ()=>{
                            console.log("error")
                        }
                    )
                }
            }
        }
    },
    // 实现页面刷新数据可以实时更新
    created(){
        /****************************************************  */
        // 从浏览器sessionStorage中获取当前用户数据
        let ID = JSON.parse(sessionStorage.getItem("token")).id
        // 请求用户数据
        function getUser(){
            return axios.get(`http://localhost:3000/users/${ID}`)
        }
        // 请求手机数据
        function getPhones(){
            return axios.get("http://localhost:3000/phones")
        }
        axios.all([getUser(),getPhones()]).then(axios.spread((resUser,resPhones)=>{ //*****此处用箭头函数this才能指向Vue
            // 将当前用户数据存入Vuex仓库
            this.$store.dispatch("updateUser",resUser.data)
            // 将手机数据存入Vuex仓库
            this.$store.dispatch("updatePhones",resPhones.data)
            // 将购物车状态存入Vuex仓库
            this.$store.dispatch("updateStatus")
        }))
        /********************************************** */
    }
}
</script>

<style scoped>
    *{
        margin: 0px;
        padding: 0px;
        text-decoration: none;
    }
    .el-menu-item,.el-submenu{
        width: 100px;
        text-align: center;
    }
    .home{
        margin: auto;
        max-width: 1500px;
        min-width: 1000px;
        color: #61677C;
        background-color: #EBECF0;
    }
    .nav{
        list-style-type: none;
    }
</style>