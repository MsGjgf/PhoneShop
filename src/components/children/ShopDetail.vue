<template>
    <div class="shopDetail">
        <br/>
        <el-page-header @back="goBack" content="商品详情"></el-page-header>
        <div class="detail">
            <img src="../../assets/Xioami MIX Dold3.png"/>
            <div>
                <h2>品牌：{{phone.brand}}</h2>
                <h3>商品名：{{phone.phoneName}}</h3>
                <h4>商品描述：{{phone.description}}</h4>
                <h4>价格：<span>￥{{phone.price}}</span></h4>
                <template>          
                    <el-button v-if="!$store.getters.getStatus[index]" @click="add(index)" type="danger">加入购物车</el-button>              
                    <el-button v-else @click="del(index,phone.id)" type="danger">移出购物车</el-button>              
            </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"ShopDetail",
    data(){
        return{
            phone:"",
            index:""
        }
    },
    methods:{

        // 路由回退上一级
        goBack(){
            this.$router.go(-1)
        },

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
    },
    // 挂载完毕将路由数据放到当前页面
    mounted(){
        this.phone = JSON.parse(this.$route.query.phone)
        this.index = this.$route.query.index
    }
}
</script>

<style scoped>
img{
    padding: 50px;
    width: 30%;
    height: 40%;
}
.detail div{
    width: 50%;
    float: right;
    margin-right: 10%;
    margin-top: 5%;
}
span{
    color: red;
}
</style>