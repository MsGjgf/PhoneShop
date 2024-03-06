// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由，自动会寻找index.js
import router from './router'
// 引入element-ui组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios依赖
import axios from 'axios'
// 引入store
import store from './store'

Vue.prototype.$axios = axios    //加载到原型上
Vue.use(ElementUI)
// 关闭生产模式下给出的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,         //注入框架中。此处是简写，key和value一致，等价于router:router
  store,
  components: { App },
  template: '<App/>'
})
