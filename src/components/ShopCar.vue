<template>
    <div class="shopCar">
        <h1>购物车</h1>
        <hr style="width: 80%;"/>
        <h3>
            <span>#</span>
            <span>商品名称</span>
            <span>价格</span>
            <span>数量</span>
        </h3>
            <li v-for="(item,index) in $store.getters.getUser.shopCar" :key="item.id">
                <h3>
                    <span>{{index+1}}</span>
                    <span>{{item.phoneName}}</span>
                    <span style="color: red;">￥{{item.price*item.sum}}</span>
                    <span><el-input-number v-model="item.sum" @change="handleChange(index,item.id,item.sum)" :min="0" :max="10" label="描述文字"></el-input-number></span>
                </h3>
            </li>
    </div>
</template>

<script>
export default {
    name:"ShopCar",
    methods: {
    // 增减购物车商品数量
      handleChange(index,id,val) {
        if(val===undefined)
            val=0
        if(val === 0){
            // 先移除用户购物车数据
            this.$store.dispatch("deleteShop",id)
            // 再更新购物车状态
            this.$store.dispatch('updateStatus')
        }else{
            this.$store.dispatch('updateSum',index,val)
        }
      }
    }
}
</script>

<style scoped>
    .shopCar{
        text-align: center;
    }
    li{
        list-style-type: none;
    }
    span{
        display: inline-block;
        width: 200px;
        text-align: center;
    }
</style>