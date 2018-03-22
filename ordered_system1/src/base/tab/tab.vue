<template>
   <div class="tab">
       <router-link tag="div" class="tab-item tab-link" to="/home">
            <span class="icon-fangzi"></span>
            <span>{{index}}</span>
       </router-link>
       <router-link tag="div" class="tab-item tab-link" to="/user-center">
            <span class="icon-ren"></span>
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
        height: 100px;
        line-height:100px;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fff;
        font-size:35px;
        .tab-item{
          flex:1;
          text-align:center;
          margin-left:-20px;
          border-top:7px solid transparent;
        // &.tab-link{
        //     border-top:7px solid green;
        //     border-right:1px solid green;
        //     span{
        //         color:green;
        //     }
        // } 
        &.router-link-active{
            &.tab-link{
                border-top:7px solid green;
                border-right:1px solid green;
                border-left:1px solid green;
                span{
                    color:green;
                 }
            } 
        } 
        .icon-fangzi,.icon-ren{
            font-size:45px;
          }
        }
    }


</style>



