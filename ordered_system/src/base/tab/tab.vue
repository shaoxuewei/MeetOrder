<template>
   <div class="tab">
       <router-link tag="div" class="tab-item tab-link" to="/home">
            <span class="icon-fangz"></span>
            <span>{{index}}</span>
       </router-link>
       <router-link tag="div" class="tab-item tab-link" to="/user-center">
            <span class="icon-re"></span>
            <span>{{UserCenter}}</span>
       </router-link>
   </div>
</template>
<script>
export default {
    props:{
        index:{
            type:String,
            default:"首页"
        },
        UserCenter:{
            type:String,
            default:"我的预约"
        }
    }
}
</script>
<style lang="less" scoped>
    .tab{
        display:flex;
        width: 100%;
        height: 1.333333rem;
        line-height:1.333333rem;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fff;
        font-size:.466667rem;
        .tab-item{
          flex:1;
          text-align:center;
          margin-left:-.266667rem;
          border-top:1px solid transparent;
          span{
            vertical-align: middle;
          }
          .icon-fangz,.icon-re{
            display:inline-block;
            width:.6rem;
            height:.6rem;
            background-image: url("../../common/image/home1.png");
            background-size:.6rem .6rem;
          }
          .icon-fangz{
            background-image: url("../../common/image/home1.png");
          }
          .icon-re{
            background-image: url("../../common/image/order.png");
          }
        &.router-link-active{
            &.tab-link{
                border-top:1px solid rgb(244,244,244);
                .icon-fangz{
                  background-image: url("../../common/image/home.png");
                }
                .icon-re{
                  background-image: url("../../common/image/order1.png");
                }
                span{
                    color:rgb(0,176,215)
                 }
            }
          }
        }
    }


</style>



