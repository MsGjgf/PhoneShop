import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

//挂载Vuex
Vue.use(Vuex)

const state = {
    user:{shopCar:[]},      //个人用户数据
    phones:[],              //所有手机数据
    status:[],              //购物车状态
}

const actions = {
    // 更新个人用户数据
    updateUser(context,payload){
        context.commit("updateUser",payload)
    },
    // 更新所有手机数据
    updatePhones(context,payload){
        context.commit("updatePhones",payload)
    },
    // 更新购物车状态
    updateStatus(context){
        context.commit("updateStatus")
    },
    // 向用户购物车插入商品
    insertShop(context,payload){
        let obj = context.state.user
        obj.shopCar.push(payload)
        axios.put(`http://localhost:3000/users/${context.state.user.id}`,obj).then((res)=>{
            context.commit("motifyUser",obj)
        })
    },
    // 删除用户购物车商品
    deleteShop(context,id){
        let obj = context.state.user
        for(let i = 0; i < obj.shopCar.length; i++){
            if(obj.shopCar[i].id === id){
                obj.shopCar.splice(i,1)
                break
            }
        }
        axios.put(`http://localhost:3000/users/${context.state.user.id}`,obj).then((res)=>{
            context.commit("motifyUser",obj)
        })
    },
    // 修改个人中心数据
    motifyUser(context,data){
        let obj = context.state.user
        switch(data[0]){
            case 'userName':
                obj.userName = data[1]
                break
            case 'passWord':
                obj.passWord = data[1]
                break
            case 'telePhone':
                obj.telePhone = data[1]
                break
            case 'address':
                obj.address = data[1]
                break
        }
        axios.patch(`http://localhost:3000/users/${context.getters.getUser.id}`,obj).then((res)=>{
            context.commit("motifyUser",obj)
        })
    },
    // 修改购物车数量
    updateSum(context,index,val){
        let obj = context.state.user
        obj.shopCar[index].sun = val
        axios.patch(`http://localhost:3000/users/${context.state.user.id}`,obj).then((res)=>{
            context.commit("motifyUser",obj)
        })
    }
}

const mutations = {
    // 更新个人用户数据
    updateUser(state,payload){
        state.user = payload
    },
    // 更新所有手机数据
    updatePhones(state,payload){
        state.phones = payload
    },
    // 更新购物车状态
    updateStatus(state){
        for(let i = 0; i < state.phones.length; i++){
            // 先将状态置为0
            state.status[i] = 0
            state.user.shopCar.forEach(el =>{
                // 如果用户购物车有该商品，则置为1
                if(state.phones[i].id===el.id){
                    state.status[i] = 1
                }
            })
        }
    },
    // 加入购物车
    addStatus(state,index){
        state.status.splice(index,1,1)
    },
    // 移出购物车
    delStatus(state,index){
        state.status.splice(index,1,0)
    },
    // 修改用户数据(包括购物车数据)
    motifyUser(state,data){
        state.user = data
    }
}

const getters = {
    // 获取个人用户数据
    getUser(state){
        return state.user
    },
    // 获取所有手机数据
    getPhones(state){
        return state.phones
    },
    // 获取购物车状态数据
    getStatus(state){
        return state.status
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})