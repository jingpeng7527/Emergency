import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import BaiduMap from 'vue-baidu-map'
 
Vue.use(BaiduMap, {
  ak: 'NfH4n0hrjmWGSviuZLg3mUwQUzU47SSl'  //  在此输入你自己的百度地图ak
})



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


