<template>
    <div class="huawei">
      <ShopList/>
    </div>
  </template>
  
  <script>
  import ShopList from './ShopList'
  export default {
      name:"HuaWei",
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