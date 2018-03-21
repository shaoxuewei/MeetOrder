<template>
  <div class="user-center">
    <header>
      <div class="icon-buoumaotubiao53" @click="back"></div>
      <h2>我的预约</h2>
    </header>
    <!-- 个人信息 -->
    <div class="head_icon">
      <img src="../../common/image/icon_mine.png" alt="" width="64" height="64">
      <div>
        <span>xxxxx</span>
      </div>
    </div>
    <!-- content -->
    <div class="navigation">
      <!-- tab选项卡 -->
      <ul class="nag_tab clearfix">
        <li v-for="(tab,index) in tabsName" :key="tab.id">
          <a class="tab-link" @click="tabSwitch(index)" v-bind:class="{active:index==nowindex}">{{tab.name}}
            <span>|</span>
          </a>
        </li>
      </ul>
      <!-- 内容页 -->
      <div class="nag_card">
        <!-- 待审核页 -->
        <div class="tab-card clearfix" v-if="nowindex===0">
          <ul class="clearfix">
            <li v-for="(msg,index) in getmtArry" class="clearfix" v-if="msg.isTrue" @click="choose(msg)" :key="msg.id">
              <div class="card_left">
                <div class="icon"><img src="../../common/image/loadImg.png" alt="" width="100" height="80"></div>
                <p>人数: {{msg.meetPersoncount}}人</p>
                <p>审核：
                  <a>审核单</a>
                </p>
                <p class="cancle" @click.stop.prevent="cancleOrder(index)">取消预约</p>
              </div>
              <div class="card_right">
                <div class="card_title">
                  <p>会议室AAA</p>
                  <span>待审核</span>
                </div>
                <div class="card_time">
                  预约时间：{{msg.meetDate}}
                  <p>预约时间:</p>
                </div>
                <!-- timeA[index].join().split()[index] -->

                <div class="time_block clearfix" v-if="getmtArry.length>0">
                  <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                    {{item.time}}
                  </div>
                </div>
                <div class="order_msg">
                  <p>预约人：xxxx</p>
                  <p>预约人手机号：{{msg.meetTeacherPhone}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 待使用页 -->
        <div class="tab-card" v-if="nowindex===1">
          <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in getmtArry" :key="item.id">
              <div class="card_left">
                <div class="icon"><img src="../../common/image/loadImg.png" alt="" width="100" height="80"></div>
                <p>人数: {{item.meetDepartment}}人</p>
                <p>审核：
                  <a>审核单</a>
                </p>
                <p class="cancle">待使用</p>
                <p class="cancle" @click.stop="cancleOrder(index)">取消预约</p>
              </div>
              <div class="card_right">
                <div class="card_title">
                  <p>会议室AAA</p>
                  <span>审核单</span>
                </div>
                <div class="card_time">
                  预约时间：{{item.meetDate}}
                  <p>预约时间:</p>
                </div>

                <div class="time_block clearfix">
                  <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                    {{item.time}}
                  </div>
                </div>
                <div class="order_msg">
                  <p>预约人：xxxx</p>
                  <p>预约人手机号：{{item.meetTeacherPhone}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 已使用页 -->
        <div class="tab-card" v-if="nowindex===2">
          <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in getmtArry" :key="item.id">
              <div class="card_left">
                <div class="icon"><img src="../../common/image/loadImg.png" alt="" width="100" height="80"></div>
                <p>人数: {{item.meetDepartment}}人</p>
                <p>审核：
                  <a>审核单</a>
                </p>
                <p class="cancle">已使用</p>
              </div>
              <div class="card_right">
                <div class="card_title">
                  <p>会议室AAA</p>
                  <span>已使用</span>
                </div>
                <div class="card_time">
                  预约时间：{{item.meetDate}}
                  <p>预约时间:</p>
                </div>

                <div class="time_block clearfix">
                  <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                    {{item.time}}
                  </div>
                </div>
                <div class="order_msg">
                  <p>预约人：xxxxxx</p>
                  <p>预约人手机号：{{item.meetTeacherPhone}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 已取消页 -->
        <div class="tab-card clearfix" v-if="nowindex===3">
          <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in getmtArry" :key="item.id">
              <div class="card_left">
                <div class="icon"><img src="../../common/image/loadImg.png" alt="" width="100" height="80"></div>
                <p>人数: {{item.meetDepartment}}人</p>
                <p>审核：
                  <a>审核单</a>
                </p>
                <p class="cancle">已取消</p>
              </div>
              <div class="card_right">
                <div class="card_title">
                  <p>会议室AAA</p>
                  <span>已取消</span>
                </div>
                <div class="card_time">
                  预约时间：{{item.meetDate}}
                  <p>预约时间:</p>
                </div>

                <div class="time_block clearfix">
                  <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                    {{item.time}}
                  </div>
                </div>
                <div class="order_msg">
                  <p>预约人：xxxx</p>
                  <p>预约人手机号：{{item.meetTeacherPhone}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 审核不通过页 -->
        <div class="tab-card" v-if="nowindex===4">
          <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in getmtArry" :key="item.id">
              <div class="card_left">
                <div class="icon"><img src="../../common/image/loadImg.png" alt="" width="100" height="80"></div>
                <p>人数: {{item.meetDepartment}}人</p>
                <p>审核：
                  <a>审核单</a>
                </p>
              </div>
              <div class="card_right">
                <div class="card_title">
                  <p>会议室AAA</p>
                  <span style="color:red;font-size:15px;margin-left:-20px;">审核不通过</span>
                </div>
                <div class="card_time">
                  预约时间：{{item.meetDate}}
                  <p>预约时间:</p>
                </div>

                <div class="time_block clearfix">
                  <div v-for="item in Timearea" v-if="timeA[index].split(',').indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                    {{item.time}}
                  </div>
                </div>
                <div class="order_msg">
                  <p>预约人：xxxx</p>
                  <p>预约人手机号：{{item.meetTeacherPhone}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!-- 弹出框 -->
    <confirm ref="confirm" @confirm="confirmClear" text="确定要取消预约"></confirm>
  </div>
</template>
<script>
import { getmeetstate, updatemeeting } from "api/meeting-controller.js";
import Confirm from "base/confirm/confirm";
export default {
  data() {
    return {
      readyArry: [],
      alreadyArry: [],
      checkArry: [],
      cancleArry: [],
      getmtArry: [],
      noPassArry: [],
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
      ]
    };
  },
  components: {
    Confirm
  },
  // 初始化
  created() {
    this.nowindex = this.$route.query.meetState
      ? this.$route.query.meetState
      : 0;
    this.tabSwitch(this.nowindex);
  },
  methods: {
    // 点击进详情
    choose(msg) {
      this.$router.push({
        path: `/user-center/${msg.meetId}`,
        query: {
          checkArry: JSON.stringify(msg),
          TimeA: msg.meetTimeArea
        }
      });
    },
    // tab切换，根据meetstate获取数据
    tabSwitch: function(tabIndex) {
      this.nowindex = tabIndex;
      let body = {
        meetUserId: sessionStorage.getItem("userid"),
        meetState: this.nowindex
      };
      this._getmeetstate(body);
    },

    // 获取id的内容
    _getmeetstate(body) {
      getmeetstate(body).then(res => {
        if (res.code === 0) {
          let arry = [];
          this.getmtArry = res.data;
          this.getmtArry.forEach(e => {
            e.isTrue = true;
            this.timeA.push(e.meetTimeArea);
            // console.log(this.timeA)
          });
        }
      });
    },
    back() {
      this.$router.back();
    },
    // 确定取消
    confirmClear() {
      this.getmtArry[this.cancleIndex].isTrue = false;
      let body = {
        meetId: this.getmtArry[this.cancleIndex].meetId,
        meetUserId: 1
      };
      this._updatemeeting(body);
      this.tabSwitch(3);
    },
    // 点击取消预约
    cancleOrder(index) {
      this.cancleIndex = index;
      this.$refs.confirm.show();
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
      line-height: 100px;
      letter-spacing: 8px;
    }
  }
  .head_icon {
    height: 250px;
    border-bottom: 1px solid rgb(138, 138, 138);
    text-align: center;
    img {
      margin-top: 30px;
    }
    div {
      margin: 10px;
    }
  }
  .navigation {
    padding: 10px;
    .nag_tab {
      margin: 0px 0px 15px 30px;
      li:last-child {
        span {
          display: none;
        }
      }
      li {
        list-style-type: none;
        float: left;
        .tab-link {
          float: left;
          font-size: 30px;
          span {
            padding: 0 15px;
          }
          &.active {
            color: green;
          }
        }
      }
    }
    .nag_card {
      .tab-card {
        padding-bottom: 100px;
        li {
          margin: 50px 30px 15px 30px;
          padding: 20px;
          border: 2px solid rgb(141, 140, 140);
          border-radius: 20px;
        }
        .card_left {
          float: left;
          width: 35%;
          p {
            margin-bottom: 30px;
            color: rgb(192, 192, 192);
            a {
              color: rgb(19, 130, 233);
              text-decoration: underline;
            }
          }
          .cancle {
            margin-left: 40px;
          }
        }
        .card_right {
          float: left;
          width: 65%;
          .card_title {
            font-size: 32px;
            p {
              display: inline-block;
              margin-right: 120px;
            }
          }
          .card_time {
            font-size: 28px;
            color: rgb(163, 163, 163);
          }
          .time_block {
            margin-top: 10px;
            text-align: center;
            .time_item {
              float: left;
              width: 45%;
              padding: 6px 0;
              margin: 0 10px 10px 0px;
              border: 2px solid rgb(163, 163, 163);
              border-radius: 8px;
            }
          }
          .order_msg {
            p {
              font-size: 28px;
            }
          }
        }
      }
    }
  }
}
</style>


