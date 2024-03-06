<template>
    <div class="tab">
      <!-- 标签栏 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="小米" name="xiaomi"/>
        <el-tab-pane label="红米" name="redmi"/>
        <el-tab-pane label="华为" name="huawei"/>
        <el-tab-pane label="三星" name="sanxing"/>
        <el-tab-pane label="Apple" name="apple"/>
        <el-tab-pane label="Oppo" name="oppo"/>
        <el-tab-pane label="Vivo" name="vivo"/>
      </el-tabs>
      <hr/>
      <!-- 路由占位符 -->
      <keep-alive :include="['XiaoMi','Redmi','HuaWei','Apple','SanXing','Oppo','Vivo']">
        <router-view></router-view>
      </keep-alive>
      </div>
</template>

<script>

export default {
    name:"Tab",
    data() {
      return {
        activeName:sessionStorage.getItem("activeName")
      }
    },
    methods:{
      handleClick(tab){
        sessionStorage.setItem("activeName",tab.label)
        this.$router.push(`/home/tab/${tab.name}/${tab.label}`)
      }
    }
}
</script>

<style scoped>
    *{
      list-style-type: none;
      text-decoration: none;
    }
    .tab{
      padding: 20px 50px;
    }
</style>