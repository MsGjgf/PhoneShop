// 引入Vue框架
import Vue from "vue"
// 引入Vue-router路由依赖
import Router from "vue-router"
// 引入页面组件，命名为Home。@代表绝对路径
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Home from "@/pages/Home"

import Index from "@/components/Index"
import Tab from "@/components/Tab"
import User from "@/components/User"
import ShopCar from "@/components/ShopCar"
import Search from "@/components/Search"

import XiaoMi from "@/components/children/XiaoMi"
import Redmi from "@/components/children/Redmi"
import HuaWei from "@/components/children/HuaWei"
import Apple from "@/components/children/Apple"
import Sanxing from "@/components/children/SanXing"
import Oppo from "@/components/children/Oppo"
import Vivo from "@/components/children/Vivo"

import ShopDetail from "@/components/children/ShopDetail"
// Vue全局使用Router
Vue.use(Router)
// 定义路由配置，注意export导出，只要导出了别的文件才能import导入
const router = new Router({
    mode:"history", //去掉路由地址栏中#
    routes:[        //配置路由，这里是一个数组
        {
            path:"/login",
            name:"Login",
            component:Login
        },
        {
            path:"/register",
            name:"Register",
            component:Register
        },
        {
            path:"/home",
            redirect:"/home/index",
            name:"Home",
            component:Home,
            children:[
                {
                    path:"index",
                    name:"index",
                    component:Index
                },
                {
                    path:"tab",
                    name:"tab",
                    component:Tab,
                    children:[
                        {
                            path:"xiaomi/:brand",
                            name:"xiaomi",
                            component:XiaoMi
                        },
                        {
                            path:"redmi/:brand",
                            name:"redmi",
                            component:Redmi
                        },
                        {
                            path:"huawei/:brand",
                            name:"huawei",
                            component:HuaWei
                        },
                        {
                            path:"apple/:brand",
                            name:"apple",
                            component:Apple
                        },
                        {
                            path:"sanxing/:brand",
                            name:"sanxing",
                            component:Sanxing
                        },
                        {
                            path:"oppo/:brand",
                            name:"oppo",
                            component:Oppo
                        },
                        {
                            path:"vivo/:brand",
                            name:"vivo",
                            component:Vivo
                        }

                    ]
                },
                {
                    path:"user",
                    name:"user",
                    component:User
                },
                {
                    path:"shopCar",
                    name:"shopCar",
                    component:ShopCar
                },
                {
                    path:"/home/search/:searchVal",
                    name:"search",
                    component:Search
                },
                {
                    path:"/home/shopDetail",
                    name:"shopDetail",
                    component:ShopDetail
                }
            ]
        }
    ]
})

// 路由守卫/路由拦截/导航守卫
router.beforeEach((to, from, next) => {
    // 验证token
    if(sessionStorage.getItem("token") || to.path === "/login" || to.path === "/register"){
        next()
    }else{
        next("/login")
    }
})
export default router