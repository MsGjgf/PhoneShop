<template>
    <div class="index">
        <br/>
        <!-- 轮播图 -->
        <template>
            <el-carousel :interval="4000" type="card">
              <el-carousel-item v-for="item in 6" :key="item">
                <img :src="require(`../assets/banner/${item}.png`)" style="width: 100%; height: 100%;"/>
              </el-carousel-item>
            </el-carousel>
        </template>
        <!-- 热门推荐 -->
        <h2>热门推荐</h2>
        <hr style="width: 87%;"/>
        <div class="hot">
          <li v-for="(p,index) in $store.getters.getPhones" :key="index">
            <a @click="goDetail(p,index)">
                <img src="../assets/Xioami MIX Dold3.png" style="width: 60%; height: 60%; margin-top: 20px;"/>
                <h3>品牌：{{p.brand}}</h3>
                <h3>商品名称：{{p.phoneName}}</h3>
            </a>
          </li>
        </div>
        <!-- footer  -->
        <footer>
          <li v-for="(item,index) of ['选购指南','服务中心','线下门店','关于我们','选购指南','服务中心','线下门店','关于我们','选购指南','服务中心','线下门店','关于我们']" :key="index">
            {{item}}
          </li>
        </footer>
    </div>
</template>

<script>

export default {
    name:"Index",
    methods:{
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
  .hot{
        padding: 20px 100px 50px;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill,300px);
        grid-gap: 5px;
    }
    h2{
        margin: 10px 100px;
    }
    .hot li:hover{
      box-shadow: -5px -5px 20px #FFF, 5px 5px 20px #BABECC;
      transition: all 0.2s ease-in-out;
    }
    .hot li{
        color: #61677C;
        box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
        cursor: pointer;
        font-weight: 600;
        text-align: center;
        width: 300px; 
        height:350px;
        margin-top: 20px;
        list-style-type: none;
    }
    a:hover{
      cursor: pointer;
    }
    footer{
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill,250px);
        background-color: #545C64;
        padding: 0px 200px;
    }
    footer li{
        color: white;
        list-style-type: none;
        line-height: 50px;
        width: 250px; 
        height:50px;
        margin-top: 20px;
    }
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>