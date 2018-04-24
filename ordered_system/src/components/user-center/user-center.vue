<template>
  <div class="user-center">
    <!-- 个人信息 -->
    <!-- content -->
    <div class="navigation">
      <div class="nag_select">
        <cube-select v-model="value" :options="options" @change="change">
        </cube-select>
      </div>
      <!-- 内容页 -->
      <div class="nag_card">
        <!-- 待审核页 -->
        <div class="tab-card clearfix" v-if="nowindex===0">
          <ul class="clearfix">
            <li v-for="(msg,index) in getmtArry" class="clearfix" v-if="msg.isTrue" @click="choose(msg)" :key="msg.id">
              <div class="card_header clearfix">
                <p>{{msg.room.roomName}}
                  <span>({{msg.meetPersonCount}}人)</span>
                </p>
                <span class="wait">待审核</span>
              </div>
              <div class="card_content clearfix">
                <div class="card_left">
                  <div class="icon"><img :src="'http://118.178.94.113:92/wwebapi/'+(msg.room.roomImg.split('|').length>1?msg.room.roomImg.split('|').slice(0,1).join():msg.room.roomImg)" alt="" width="100" height="80"></div>
                </div>
                <div class="card_right">
                  <div class="card_time">
                    预约时间
                    <span>{{msg.meetDate}}</span>
                  </div>
                  <!-- 选择时间块 -->
                  <div class="time_block clearfix" v-if="getmtArry.length>0">
                    <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                      {{item.time}}
                    </div>
                  </div>
                  <div class="order_msg">
                    <p>预约人：
                      <span>xxxx/手机号</span>
                    </p>
                  </div>
                  <div class="order_btn">
                    <p class="cancle" @click.stop.prevent="cancleOrder(msg,index)">取消预约</p>
                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <!-- 待使用页 -->
        <div class="tab-card clearfix" v-if="nowindex===1">
          <ul class="clearfix">
            <li v-for="(msg,index) in getmtArry" class="clearfix" v-if="msg.isTrue" :key="msg.id">
              <div class="card_header clearfix">
                <p>{{msg.room.roomName}}
                  <span>{{msg.meetPersonCount}}人</span>
                </p>
                <span class="wait">待使用</span>
              </div>
              <div class="card_content clearfix">
                <div class="card_left">
                  <div class="icon"><img :src="'http://118.178.94.113:92/wwebapi/'+(msg.room.roomImg.split('|').length>1?msg.room.roomImg.split('|').slice(0,1).join():msg.room.roomImg)" alt="" width="100" height="80"></div>
                </div>
                <div class="card_right">
                  <div class="card_time">
                    预约时间
                    <span>{{msg.meetDate}}</span>
                  </div>
                  <!-- 选择时间块 -->
                  <div class="time_block clearfix" v-if="getmtArry.length>0">
                    <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                      {{item.time}}
                    </div>
                  </div>
                  <div class="order_msg">
                    <p>预约人：
                      <span>xxxx/手机号</span>
                    </p>
                  </div>
                  <div class="order_btn">
                    <p class="order_txt" @click="check(index)">
                      <a>审核单</a>
                    </p>
                    <p class="cancle" @click.stop.prevent="cancleOrder(msg,index)">取消预约</p>
                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <!-- 已使用页 -->
        <div class="tab-card clearfix" v-if="nowindex===2">
          <ul class="clearfix">
            <li v-for="(msg,index) in getmtArry" class="clearfix" v-if="msg.isTrue" :key="msg.id">
              <div class="card_header clearfix">
                <p>{{msg.room.roomName}}
                  <span>{{msg.meetPersoncount}}人</span>
                </p>
                <span class="wait">已使用</span>
              </div>
              <div class="card_content clearfix">
                <div class="card_left">
                  <div class="icon"><img :src="'http://118.178.94.113:92/wwebapi/'+(msg.room.roomImg.split('|').length>1?msg.room.roomImg.split('|').slice(0,1).join():msg.room.roomImg)" alt="" width="100" height="80"></div>
                </div>
                <div class="card_right">
                  <div class="card_time">
                    预约时间
                    <span>{{msg.meetDate}}</span>
                  </div>
                  <!-- 选择时间块 -->
                  <div class="time_block clearfix" v-if="getmtArry.length>0">
                    <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                      {{item.time}}
                    </div>
                  </div>
                  <div class="order_msg">
                    <p>预约人：
                      <span>xxxx/手机号</span>
                    </p>
                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <!-- 已取消页 -->
        <div class="tab-card clearfix" v-if="nowindex===3">
          <ul class="clearfix">
            <li v-for="(msg,index) in getmtArry" class="clearfix" v-if="msg.isTrue" :key="msg.id">
              <div class="card_header clearfix">
                <p>{{msg.room.roomName}}
                  <span>{{msg.meetPersoncount}}人</span>
                </p>
                <span class="wait">已取消</span>
              </div>
              <div class="card_content clearfix">
                <div class="card_left">
                  <div class="icon"><img :src="'http://118.178.94.113:92/wwebapi/'+(msg.room.roomImg.split('|').length>1?msg.room.roomImg.split('|').slice(0,1).join():msg.room.roomImg)" alt="" width="100" height="80"></div>
                </div>
                <div class="card_right">
                  <div class="card_time">
                    预约时间
                    <span>{{msg.meetDate}}</span>
                  </div>
                  <!-- 选择时间块 -->
                  <div class="time_block clearfix" v-if="getmtArry.length>0">
                    <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                      {{item.time}}
                    </div>
                  </div>
                  <div class="order_msg">
                    <p>预约人：
                      <span>xxxx/手机号</span>
                    </p>
                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
        <!-- 审核不通过页 -->
        <div class="tab-card clearfix" v-if="nowindex===4">
          <ul class="clearfix">
            <li v-for="(msg,index) in getmtArry" class="clearfix" v-if="msg.isTrue" :key="msg.id">
              <div class="card_header clearfix">
                <p>{{msg.room.roomName}}
                  <span>{{msg.meetPersonCount}}人</span>
                </p>
                <span class="wait" style="color:red">审核不通过</span>
              </div>
              <div class="card_content clearfix">
                <div class="card_left">
                  <div class="icon"><img :src="'http://118.178.94.113:92/wwebapi/'+(msg.room.roomImg.split('|').length>1?msg.room.roomImg.split('|').slice(0,1).join():msg.room.roomImg)" alt="" width="100" height="80"></div>
                </div>
                <div class="card_right">
                  <div class="card_time">
                    预约时间
                    <span>{{msg.meetDate}}</span>
                  </div>
                  <!-- 选择时间块 -->
                  <div class="time_block clearfix" v-if="getmtArry.length>0">
                    <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                      {{item.time}}
                    </div>
                  </div>
                  <div class="order_msg">
                    <p>预约人：
                      <span>xxxx/手机号</span>
                    </p>
                  </div>
                  <div class="order_btn">
                    <p class="order_txt">
                      <a>审核单</a>
                    </p>
                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!-- 弹出框 -->
    <cube-button @click="showBtn"></cube-button>
    <div class="loading-container" v-show="isLoading">
      <loading></loading>
    </div>
     <p v-show="!getmtArry.length" class="messp">暂无数据</p>
  </div>
</template>
<script>
import { getmeetstate, updatemeeting } from "api/meeting-controller.js";
import Loading from "base/loading/loading.vue";
export default {
  data() {
    return {
      isLoading:true,
      alreadyArry: [],
      checkArry: [],
      cancleArry: [],
      getmtArry: [],
      nowindex: 0,
      cancleIndex: 0,
      tabsName: [
        {
          name: "待审核",
          isActive: true
        },
        {
          name: "待使用",
          isActive: false
        },
        {
          name: "已使用",
          isActive: false
        },
        {
          name: "已取消",
          isActive: false
        },
        {
          name: "审核不通过",
          isActive: false
        }
      ],
      timeA: [],
      CancleArry: [],
      Timearea: [
        { time: "08:00-09:00", tIndex: "1" },
        { time: "09:00-10:00", tIndex: "2" },
        { time: "10:00-11:00", tIndex: "3" },
        { time: "11:00-12:00", tIndex: "4" },
        { time: "12:00-13:00", tIndex: "5" },
        { time: "13:00-14:00", tIndex: "6" },
        { time: "14:00-15:00", tIndex: "7" },
        { time: "15:00-16:00", tIndex: "8" },
        { time: "16:00-17:00", tIndex: "9" }
      ],
      options: ["待审核页", "待使用页", "已使用页", "已取消页", "审核不通过页"],
      value: "待审核页"
    };
  },
  components: {
    Loading
  },
  // 初始化
  created() {
    this.nowindex = this.$route.query.meetState
      ? this.$route.query.meetState
      : 0;
    let body = {
      meetUserId: sessionStorage.getItem("userid"),
      meetState: this.nowindex
    };
    this._getmeetstate(body);
    this.value = this.options[this.nowindex];
  },
  methods: {
    change(value, index) {
      this.nowindex = index;
      let body = {
        meetUserId: sessionStorage.getItem("userid"),
        meetState: this.nowindex
      };
      this._getmeetstate(body);
      this.value = this.options[this.nowindex];
    },
    showBtn() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "确定要取消预约吗",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          let body = {
            meetId: this.getmtArry[this.cancleIndex].meetId,
            meetUserId: 1
          };
          this._updatemeeting(body);
          this.change("已取消页面", 3);
        },
        onCancel: () => {}
      }).show();
    },
    // 点击进详情
    choose(msg) {
      console.log(msg.room.roomImg);
      this.$router.push({
        path: `/user-center/${msg.meetId}`,
        query: {
          checkArry: JSON.stringify(msg),
          TimeA: msg.meetTimeArea,
          roomImg:msg.room.roomImg
        }
      });
    },
    check(index) {
      console.log(this.getmtArry[index].meetImg);
      this.$router.push({
        path: "/check-table",
        query: { meetimg: this.getmtArry[index].meetImg }
      });
    },
    // 获取id的内容
    _getmeetstate(body) {
      getmeetstate(body).then(res => {
        if (res.code === 0) {
          let arry = [];
          this.getmtArry = res.data;
          this.isLoading=false;
          console.log(this.getmtArry);
          this.getmtArry.forEach(e => {
            e.isTrue = true;
            this.timeA.push(e.meetTimeArea);
          });
        }
      });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 点击取消预约
    cancleOrder(msg, index) {
      let msgTime = msg.meetDate;
      if (!msgTime) {
        return false;
      }
      var clickTime = new Date(msgTime.replace("-", "/"));
      var nowTime = new Date(this.getNowFormatDate().replace("-", "/"));
      if (clickTime < nowTime) {
        return false;
      }
      this.cancleIndex = index;
      this.showBtn();
    },
    // 取消预约接口
    _updatemeeting(body) {
      updatemeeting(body).then(res => {
        if (res === 0) {
          this.$router.push({ path: "/user-center", query: { meetState: 3 } });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-center {
  background: #fff;
  .messp{
    text-align:center;
    font-size:.4rem;
  }
  header {
    height: 1.333333rem;
    width: 100%;
    background: black;
    text-align: center;
    position: relative;
    div {
      font-size:.533333rem;
      display: inline-block;
      color: #fff;
      position: absolute;
      left: .466667rem;
      top: .266667rem;
    }
    h2 {
      display: inline-block;
      font-size: .506667rem;
      color: #fff;
      line-height: 1.333333rem;
      letter-spacing: .106667rem;
    }
  }
  .cube-btn {
    background: Red;
  }
  .head_icon {
    height: 3.333333rem;
    border-bottom: 1px solid rgb(138, 138, 138);
    text-align: center;
    img {
      margin-top: .4rem;
    }
    div {
      margin: .133333rem;
    }
  }
  .navigation {
    .nag_select {
      width: 100%;
      height: 2.026667rem;
      background: rgb(244, 244, 244);
    }
    .loading-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2rem;
      height: 2rem;
      margin-left: -1rem;
      margin-top: -1rem;
      text-align: center;
    }
    .nag_card {
      .tab-card {
        padding-bottom: 1.333333rem;
        li {
          .card_header {
            margin: .213333rem 0px .373333rem .4rem;
            padding-bottom: .32rem;
            border-bottom: 1px solid rgb(223, 223, 223);
            p {
              float: left;
              font-size: .4rem;
              span {
                color: rgb(153, 153, 153);
              }
            }
            .wait {
              float: right;
              margin-right: .266667rem;
              color: rgb(153, 153, 153);
            }
          }
          .card_content {
            border-bottom: .266667rem solid rgb(244, 244, 244);
            padding: 0px 0px .453333rem .4rem;
            display: flex;
            .card_left {
              flex: 0 1 30%;
              float: left;
              margin-right: .266667rem;
              p {
                margin-bottom: .4rem;
                color: rgb(192, 192, 192);
                a {
                  color: rgb(19, 130, 233);
                  text-decoration: underline;
                }
              }
              .cancle {
                margin-left: .533333rem;
              }
            }
            .card_right {
              flex: 0 1 70%;
              float: left;
              .card_time {
                font-size: .373333rem;
                color: rgb(153, 153, 153);
                span {
                  margin-left: .266667rem;
                  color: #000;
                }
              }
              .time_block {
                margin-top: .133333rem;
                margin-left: 1.8rem;
                text-align: center;
                // display:flex;
                .time_item {
                  // flex:0 1 30%;
                  
                  float: left;
                  padding: 0px 5px;
                  margin: 0 .133333rem .133333rem 0px;
                  border: 1px solid rgb(163, 163, 163);
                }
              }
              .order_msg {
                p {
                  color: rgb(153, 153, 153);
                  font-size: .373333rem;
                  span {
                    color: #000;
                  }
                }
              }
              .order_btn {
                margin-top: .506667rem;
                margin-left: 1.6rem;
                p {
                  display: inline-block;
                  float: left;
                }
                .order_txt {
                  width: 1.933333rem;
                  height: .8rem;
                  border-radius: .106667rem;
                  line-height: .7rem;
                  text-align: center;
                  margin-right: .333333rem;
                  background: rgb(0, 176, 215);
                  a {
                    color: #fff;
                  }
                }
                .cancle {
                  width: 2.146667rem;
                  height: .813333rem;
                  background: rgb(251, 251, 251);
                  line-height: .813333rem;
                  text-align: center;
                  color: rgb(153, 153, 153);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


