<template>
    <div class="home">
        <div class="header">
            <div class="header_t">
                <div class="icon"></div>
                <h1 class="text">温科团委会议室预约</h1>
            </div>
            <div class="header_b">
                <span>会议室总数：
                    <b>{{this.RoomList.length}}</b>
                </span>
                <span>使用次数：
                    <b>{{CountALL}}次（累计）</b>
                </span>
            </div>
        </div>
        <div class="order_list">
            <ul>
                <li class="item" v-for="item in RoomList" :key="item.id">
                    <div class="item_icon">
                        <img width="120" height="120" alt="" v-bind:src="'http://hys.wzvcst.edu.cn:8080/webapi/getroom/'+(item.roomImg.split('|').length>1?item.roomImg.split('|').slice(0,1).join():item.roomImg)">
                    </div>
                    <div class="item_content">
                        <h2 class="name">{{item.roomName}}</h2>
                        <p>预约过：{{item.roomCount}}</p>
                        <p>可容：{{item.roomPersonCount}}</p>
                        <p>审批：{{item.roomState?'通过':'不通过'}}</p>
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
import { getRoomList, getRoomCount } from "api/home.js";
import Tab from "base/tab/tab.vue";
import Loading from "base/loading/loading.vue";
const ERR_OK = 0;
export default {
  data() {
    return {
      RoomList: [],
      CountALL: 0,
      RoomImage:[]
    };
  },
  created() {
    this._getRoomList();
    this._getRoomCount();
  },
  methods: {
    showDialog() {
      this.$createDialog({
        type: "alert",
        title: "Alert",
        content: "dialog content"
      }).show();
    },

    //获取使用次数
    _getRoomCount() {
      getRoomCount().then(res => {
        if (res.code === ERR_OK) {
          this.CountALL = res.allRoomCount;
        }
      });
    },
    // 列表
    _getRoomList() {
      getRoomList().then(res => {
        if (res.code === ERR_OK) {
          this.RoomList = res.data;
        }
      });
    },
    
    selectItem(item) {
      this.$router.push({
        path: `/home/${item.roomId}`
      });
    }
  },
  components: {
    Tab,
    Loading
  }
};
</script>
<style scoped lang="less">
.home {
  color: rgba(0, 0, 0, 0.6);
  .header {
    height: 2.133333rem;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    .header_t {
      position: relative;
      height: 1.6rem;
      text-align: center;
      padding-bottom: .266667rem;
      border-bottom: 1px solid  #eee;
      font-size: 0;
      .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: .16rem;
        width: 1.066667rem;
        height: 1.186667rem;
        margin-right: .266667rem;
        background-image: url("../../common/image/logo.png");
        background-size: 1.066667rem 1.186667rem;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        margin-top: .066667rem;
        line-height: 1.6rem;
        letter-spacing: 5px;
        font-size: .6rem;
         padding:10px 0;
      }
    }
    .header_b {
      margin: .16rem 0px;
      text-align: center;
      font-size: .373333rem;
      span {
        margin-right: .666667rem;
      }
    }
  }
  .order_list {
    position: absolute;
    top: 2.666667rem;
    width: 100%;
    left: 0;
    bottom: 1.733333rem;
    overflow: auto;
    .loading-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2rem;
      height: 2rem;
      margin-left: -75px;
      margin-top: -75px;
      text-align: center;
    }
    .item {
      display: flex;
      position: relative;
      margin: .266667rem;
      padding: .266667rem;
      align-items: center;
      box-sizing: border-box;
      border-radius: .2rem;
      border: 2px solid #ddd;
      h2{
          font-size:.533333rem;
          margin:6px;
          color:#333;
      }
      p{
          font-size:.373333rem;
          margin-top:3px;
          line-height:1.5;
          color:#999;
      }
      .item_icon {
        flex: 0 0 1.6rem;
        padding-right: .466667rem;
      }
      .item_btn {
        position: absolute;
        right: .266667rem;
        bottom: .4rem;
        width: 2.133333rem;
        height: .666667rem;
        border-radius: .16rem;
        background: rgb(0,176,215);;
        text-align: center;
        line-height: .666667rem;
        span {
          color: #fff;
          font-size: .333333rem;
        }
      }
    }
  }
}
</style>
