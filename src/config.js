const { defineConfig } = require("@vue/cli-service");

require("events").EventEmitter.defaultMaxListeners = 0; //  解除限制

//nuxt项目在 nuxt.config.js中加入（vue在vue.config.js中加入）
// require('events').EventEmitter.defaultMaxListeners = 0; // 解除监听器数量限制
或限定数值
// require('events').EventEmitter.defaultMaxListeners = 100; // 解除监听器数量限制100个


module.exports = defineConfig({
  // 关闭语法检查
  lintOnSave: false,
 
  //......其它配置
});