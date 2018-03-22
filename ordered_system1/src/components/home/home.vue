<template>
   <div class="home">
      <header>
        <h2>会议预约</h2>
      </header>
       <div class="header">
           <div class="header_t">
                <div class="icon"></div>
                <h1 class="text">温科团委会议室预约</h1>
           </div>
           <div class="header_b">
                <span>会议室总数：<b>{{this.RoomList.length}}</b></span>
                <span>使用次数：<b>{{CountALL}}次（累计）</b></span>
           </div>
       </div>
       <div class="order_list">
           <ul>
               <li class="item"  v-for="item in RoomList" :key="item.id">
                   <div class="item_icon">
                       <img  width="120" height="120" alt="logo" v-lazy="item.roomImg">
                   </div>
                   <div class="item_content">
                       <h2 class="name">会议室{{item.roomAddr}}</h2>
                       <p>预约过：{{item.roomCount}}</p>
                       <p>可容：{{item.roomPersoncount}}</p>
                       <p>审批：{{item.roomState}}</p>
                   </div>
                   <div class="item_btn" @click="selectItem(item)">
                        <span>预约</span>
                    </div> 
               </li>
           </ul>
           <div class="loading-container" v-show="!RoomList.length">
                <loading></loading>     
           </div>
       </div>
         <router-view></router-view>      
   </div>
</template>

<script>
import {getRoomList,getRoomCount} from "api/home.js"
import Tab from 'base/tab/tab.vue'
import Loading from 'base/loading/loading.vue' 
const ERR_OK=0;
export default {
    data(){
        return {
            RoomList: [],
            // OrderId:0,
            CountALL:0
        }
    },
    created(){
        this._getRoomList();
        this._getRoomCount();
    },
    methods:{
        //获取使用次数
        _getRoomCount(){
            getRoomCount().then((res)=>{
                if(res.code===ERR_OK){
                    this.CountALL=res.allRoomCount
                }
            })
        },
        // 列表
        _getRoomList(){
            getRoomList().then((res)=>{
                if(res.code===ERR_OK){
                    this.RoomList=res.data
                }
            })
        },
        selectItem(item){
            this.$router.push({
                path:`/home/${item.roomId}`
            })
            // this.OrderId=item.roomId;
        }

    },
    components:{
      Tab,
      Loading
    }

}
</script>
<style scoped lang="less">
  .home{
    header{
      height:100px;
      width:100%;
      background:black;
      text-align:center;
      position: relative;
      h2{
        display:inline-block;
        font-size:38px;
        color:#fff;
        line-height:100px;
        letter-spacing: 8px;
      }
    }
    color:rgba(0, 0, 0, 0.6);
    .header{
      height:160px;
      width: 100%;
      position: fixed;
      left: 0;
      top: 100px;
      z-index: 99;
      .header_t{
        position:relative;
        height:120px;
        text-align:center;
        padding-bottom:20px;
        border-bottom:1px solid rgb(160, 158, 158);
        font-size:0;
        .icon{
          display:inline-block;
          vertical-align: top;
          margin-top:12px;
          width:100px;
          height:104px;
          margin-right:20px;
          background-image:url("../../common/image/logo.png");
          background-size:100px 104px;
        }
        .text{
          display:inline-block;
          vertical-align: top;
          margin-top:5px;
          line-height:120px;
          letter-spacing:5px;
          font-size:45px;
        }
      }
      .header_b{
        margin-top:5px;
        text-align:center;
        font-size:28px;
        span{
          margin-right:50px;
        }
      }
    }
    .order_list{
        position: absolute;
        top: 300px;
        width: 100%;
        left: 0;
        bottom: 130px;
        overflow:auto;
        .loading-container{
            position: absolute;
            top:50%;
            left:50%;
            width:150px;
            height:150px;
            margin-left:-75px;
            margin-top:-75px;
            text-align: center;
        }
        .item{
            display:flex;
            position: relative;
            margin:20px;
            padding:20px;
            align-items: center;
            box-sizing:border-box;
            border-radius: 15px;
            border:2px solid #333;
            .item_icon{
                flex:0 0 120px;
                padding-right:35px;  
            }
            .item_btn{
                    position: absolute;
                    right:20px;
                    bottom:30px;
                    width:160px;
                    height:50px;
                    border-radius: 12px;
                    background:rgb(42, 189, 91);
                    text-align: center;
                    line-height:50px;
                    span{
                        color:#fff;
                        font-size:25px;
                    }

            }
        }
      }

  }
</style>
