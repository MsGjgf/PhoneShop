<template>
  <div class="xiaomi">
    <ShopList/>
  </div>
</template>

<script>
import ShopList from './ShopList'
export default {
    name:"XiaoMi",
    components:{
        ShopList
    }
}
</script>

<style scoped>
    li{
        list-style-type: none;
    }
</style>