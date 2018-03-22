
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

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(Cube)                    
Vue.use(Swiper)
Vue.use(Button)
Vue.use(VueLazyload,{
  loading:require("common/image/loadImg.png")
})
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button
} from 'cube-ui'
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
sessionStorage.setItem("userid",1)