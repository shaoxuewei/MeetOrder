<template>
<transition name="slide">
  <div class="check_table">
      <header>
        <div class="icon-buoumaotubiao53" @click="back"></div>
        <h2>审批表</h2>
      </header>
      <h2>审核表格</h2>
      <table>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
     
    </table>
  </div>
  <!-- <tab></tab> -->
  </transition>    
</template>
<script>
// import Tab from 'base/tab/tab.vue'
export default {
  methods: {
    back() {
      this.$router.back();
    }
  },
  components: {
    // Tab
  }
};
</script>
<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
.check_table {
  background: #fff;
  text-align: center;
  header {
    height: 100px;
    width: 100%;
    background: black;
    text-align: center;
    position: relative;
    div {
      font-size: 40px;
      display: inline-block;
      color: #fff;
      position: absolute;
      left: 35px;
      top: 20px;
    }
    h2 {
      display: inline-block;
      font-size: 38px;
      color: #fff;
      line-height: 60px;
      letter-spacing: 8px;
    }
  }
  h2 {
    font-size: 40px;
    margin: 20px 0;
  }
}
table {
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto;
}

td,
th {
  border: 1px solid black;
  width: 20%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>

