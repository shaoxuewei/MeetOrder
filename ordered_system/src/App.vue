<template>
  <div id="app">
    <tab></tab>
    <router-view ></router-view>
  </div>
</template>

<script>
import Home from 'components/home/home.vue' 
import Tab from 'base/tab/tab.vue'
export default {
  name: 'app',
  components:{
    Home,
    Tab
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
  height:100%;
}
</style>
