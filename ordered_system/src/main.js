
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import VueLazyload from "vue-lazyload"
import 'lib-flexible/flexible'
import { Swiper } from 'vux'
import "common/less/index.less"
import lrz from 'lrz' 
import Cube from 'cube-ui'
// import './common/js/weixin.js'
import ConfirmPlugin  from "vux/src/plugins/confirm"
Vue.use(Cube)
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(Swiper)
Vue.use(ConfirmPlugin)
Vue.use(VueLazyload,{
  loading:require("common/image/loadImg.png")
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
sessionStorage.setItem("userid",1)