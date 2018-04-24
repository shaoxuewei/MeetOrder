<template>
<transition name="slide">
  <div class="check_table">
      <header>
        <h2>审批表</h2>
      </header>
      <div class="pic">
        <img :src="Img" alt="审核表" />
      </div>
  </div>
  </transition>    
</template>
<script>
import { getImg } from 'api/order-detail'
// import Tab from 'base/tab/tab.vue'
export default {
  data(){
    return{
      Img:'http://118.178.94.113:92/webapi-0.0.1-SNAPSHOT/'
    }
  },
  methods: {
   _getImg(){
     getImg().then((res)=>{
       if(res.code===0){
         let ImgUrl=res.data[0].url;
         this.Img=this.Img+ImgUrl;
       }
     })
   }
  },
  created(){
    if(this.$route.query.meetimg){
      this.Img=this.$route.query.meetimg
    }else{
      this._getImg();
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
  position: absolute;;
  top:0px;
  left:0px;
  bottom:0px;
  right:0px;
  z-index:100;
  overflow: auto;
  background: #ffffff;
  text-align: center;
  .pic{
    margin-top:.666667rem;
  }
  header {
    height: 1.333333rem;
    width: 100%;
    background: rgb(244,244,244);
    text-align: center;
    position: relative;
    div {
      font-size: .533333rem;
      display: inline-block;
      color: #fff;
      position: absolute;
      left: .466667rem;
      top: .266667rem;
    }
    h2 {
      display: inline-block;
      font-size: .506667rem;
      color:#222222;
      line-height: .8rem;
      letter-spacing: .106667rem;
    }
  }
  h2 {
    font-size: .533333rem;
    margin: .266667rem 0;
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
  height: .666667rem;
  line-height: .666667rem;
}
</style>

