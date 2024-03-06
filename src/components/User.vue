<template>
    <div class="user">
        <h1>个人中心</h1>
        <ul>
            <li v-for="(value,key,index) in $store.getters.getUser" :key="index">
                <!-- key为id时不显示编辑按钮 -->
                <template v-if="key==='id'">
                    <span>{{key}}：{{value}}</span>
                    <br/>
                    <hr/>
                </template>
                <!-- key为shopCar时不显示 -->
                <template v-else-if="key==='shopCar'"></template>
                <template v-else>
                    <span v-show="isShow[index]">{{key}}：{{value}}</span>
                    <span v-show="!isShow[index]">{{key}}：<input @blur="blur(index,key,$event)" :id="index" type="text" :value="value" style="height: 34px;"/></span>
                    <el-button v-show="isShow[index]" @click="change(index)" type="info" plain>编辑</el-button>
                    <br/>
                    <hr/>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    name:"User",
    data(){
        return{
            isShow:[true,true,true,true,true,true], //编辑按钮是否被按下
        }
    },
    methods:{

        // 点击编辑后
        change(index){
            // 先修改按钮状态
            this.$set(this.isShow,index,!this.isShow[index])    // 相当于this.isShow.splice(index,1,this.!isShow[index])
            /*  
            *   Vue获取焦点(因为vue必须执行完change函数才会去重新渲染页面)
            *   1.定时器
            *   2.nextTick：所指定的回调会在DOM节点更新完毕之后执行
            */
            this.$nextTick(()=>{
                document.getElementById(index).focus()
            })
        },
        
        // 失去焦点后
        blur(index,key,event){
            // 先修改按钮状态
            this.$set(this.isShow,index,!this.isShow[index])
            // 修改用户数据
            let isKong
            if(!(isKong = event.target.value.trim())){
                return alert("数据不可为空！！！")
            }
            switch(key){
                case 'userName':
                    // 如果为原值则不做修改
                    if(this.$store.getters.getUser.userName === isKong){ return }
                    // 判断用户名是否已存在
                    axios.get(`http://localhost:3000/users`).then((res)=>{
                        for(let i = 0; i < res.data.length; i++){
                            if(res.data[i].userName === isKong){
                                return alert("用户名已存在！")
                            }
                        }
                        this.$store.dispatch('motifyUser',[key,isKong])
                    })
                    break
                case 'passWord':
                    // 正则判断
                    let flag = 0;
                    if(/[A-Z]+/.test(isKong)){
                        flag++
                    }
                    if(/[a-z]+/.test(isKong)){
                        flag++
                    }
                    if(/[0-9]+/.test(isKong)){
                        flag++
                    }
                    if(/[\W_]+/.test(isKong)){
                        flag++
                    }
                    if(!(flag>=3)){
                        alert("密码由4种字符组成!")
                        return
                    }
                    // 如果为原值则不做修改
                    if(this.$store.getters.getUser.passWord === isKong){ return }
                    this.$store.dispatch('motifyUser',[key,isKong])
                    break
                case 'telePhone':
                    // 如果为原值则不做修改
                    if(this.$store.getters.getUser.telePhone === isKong){ return }
                    this.$store.dispatch('motifyUser',[key,isKong])
                    break
                case 'address':
                    if(this.$store.getters.getUser.address === isKong){ return }
                    this.$store.dispatch('motifyUser',[key,isKong])
                    break
            }
        }
    }
}
</script>

<style scoped>
    h1{
        text-align: center;
    }
    ul{
        list-style-type: none;
    }
    span{
        display: inline-block;
        width: 400px;
        margin-left: 400px;
        font-weight: 600;
    }
</style>