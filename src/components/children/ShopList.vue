<template>
    <div class="shopList">
        <!-- 循环整个手机数据，判断是否属于该标签的品牌 -->
        <li v-for="(item,index) of $store.getters.getPhones" :key="index" v-if="item.brand===$route.params.brand">
            <a @click="goDetail(item,index)">
                <img src="../../assets/Xioami MIX Dold3.png">
                <h3>{{item.phoneName}}</h3>
                <h4>价格：<span>￥{{item.price}}</span></h4>
            </a>
            <template>          
                <el-button  v-if="!$store.getters.getStatus[index]" @click="add(index)" type="danger">加入购物车</el-button>              
                <el-button v-else @click="del(index,item.id)" type="danger">移出购物车</el-button>              
            </template>
        </li>
    </div>
</template>

<script>

export default {
    name:"ShopList",
    methods:{
        // 加入购物车
        add(index){
            // 修改状态
            this.$store.commit("addStatus",index)
            // 向用户购物车添加数据
            let obj = {
                id:this.$store.getters.getPhones[index].id,
                phoneName:this.$store.getters.getPhones[index].phoneName,
                price:this.$store.getters.getPhones[index].price,
                sum:1
            }
            this.$store.dispatch("insertShop",obj)
        },

        // 移出购物车
        del(index,id){
            // 修改状态
            this.$store.commit("delStatus",index)
            // 移除用户购物车数据
            this.$store.dispatch("deleteShop",id)
        },
        
        // 进入详情页
        goDetail(phone,index){
            // 将phone作为路由参数
            this.$router.push({
                path:'/home/shopDetail',
                query:{
                    'phone':JSON.stringify(phone),
                    'index':index
                }
            })
        }
    }
}
</script>

<style scoped>
    .shopList{
        padding: 10px 60px;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill,300px);
        grid-gap: 5px;
    }
    .shopList li:hover{
        box-shadow: -5px -5px 20px #FFF, 5px 5px 20px #BABECC;
        transition: all 0.2s ease-in-out;
    }
    li{
        color: #61677C;
        box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
        cursor: pointer;
        font-weight: 600;
        text-align: center;
        width: 300px; 
        height:350px;
        margin-top: 20px;
        padding-bottom: 20px;
    }
    img{
        margin-top: 20px;
        width: 50%;
        height: 50%;
    }
    span{
        color: red;
    }
    a:hover{
        cursor: pointer;
    }
</style>