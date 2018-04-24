<template>
  <div class="checkpend">
    <header>
      <h2>{{selectArry.room.roomName}}</h2>
    </header>
    <div class="checkpend_head">
      <swiper :show-desc-mask="false"  :show-dots="this.demo03_list.length>1" :list="demo03_list" auto style="width:100%;margin:0 auto;" height="340px" dots-class="custom-bottom" dots-position="center"></swiper>
    </div>
    <div class="tab-card clearfix">
      <ul class="clearfix">
        <li class="clearfix">
          <div class="card_header clearfix">
            <p>预约人数
              <span>{{selectArry.meetPersonCount}}人</span>
            </p>
            <span>待审核</span>
          </div>
          <div class="card_right">
            <div class="card_time">
              预约时间
              <span>{{selectArry.meetDate}}</span>
            </div>
            <!-- 选择时间块 -->
            <div class="time_block clearfix">
              <div v-for="item in Time_area" v-if="TimeA.indexOf(item.tIndex)>-1" class="time_item" :key="item.id">
                {{item.time}}
              </div>
            </div>
            <div class="order_msg">
              <p>预约人：
                <span>xxxx/手机号</span>
              </p>
            </div>
            <div class="cancleMsg">
              <p class="cancle" @click.stop.prevent="cancleOrder()">取消预约</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="personmsg">
        <h3>申请人信息</h3>
        <p>用途：{{selectArry.meetDescribe}}</p>
        <p>姓名：</p>
        <p>手机：</p>
        <p>所在学院：{{selectArry.meetCollegeId}}</p>
        <p>所在部门：{{selectArry.meetDepartment}}</p>
        <p>指导老师：{{selectArry.meetTeacher}}</p>
        <p>老师电话：{{selectArry.meetTeacherPhone}}</p>
      </div>
    </div>
    <!-- 弹出框 -->
    <cube-button @click="showBtn"></cube-button>
  </div>
</template>
<script>
import { getmeetstate, updatemeeting } from "api/meeting-controller.js";
import { Swiper } from "vux";
export default {
  data() {
    return {
      demo03_list: [],
      nowindex: 1,
      demo3:[],
      TimeA: 0,
      meetId: [],
      selectArry: [],
      cancleArry: [],
      Time_area: [
        { time: "08:00-09:00", tIndex: 1 },
        { time: "09:00-10:00", tIndex: 2 },
        { time: "10:00-11:00", tIndex: 3 },
        { time: "11:00-12:00", tIndex: 4 },
        { time: "12:00-13:00", tIndex: 5 },
        { time: "13:00-14:00", tIndex: 6 },
        { time: "14:00-15:00", tIndex: 7 },
        { time: "15:00-16:00", tIndex: 8 },
        { time: "16:00-17:00", tIndex: 9 }
      ]
    };
  },
  created() {
    this.meetId = this.$route.params.id;
    this.selectArry = JSON.parse(this.$route.query.checkArry);
    this.TimeA = this.$route.query.TimeA;
    this.demo3=this.$route.query.roomImg;
    if(this.demo3.split('|').length>1){
            this.demo3=this.demo3.split('|')
          }else{
       this.demo3=this.demo3.split();
    }
    this.demo03_list= this.demo3.map(v=>({img:v}))
    // console.log(this.demo03_list)
  },
  methods: {
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
            meetId: this.meetId,
            meetUserId: 1
          };
          this._updatemeeting(body);
        },
        onCancel: () => {}
      }).show();
    },
    back() {
      this.$router.back();
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
    cancleOrder() {
      let msgTime = this.selectArry.meetDate;
      if (!msgTime) {
        return false;
      }
      var clickTime = new Date(msgTime.replace("-", "/"));
      var nowTime = new Date(this.getNowFormatDate().replace("-", "/"));
      if (clickTime < nowTime) {
        return false;
      }
      this.showBtn();
    },
    _updatemeeting(body) {
      updatemeeting(body).then(res => {
        if (res.code === 0) {
          this.$router.push({ path: "/user-center", query: { meetState: 3 } });
        }
      });
    }
  },
  components: {
    Swiper
  }
};
</script>

<style lang="less" scoped>
.checkpend {
  background: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  overflow: auto;
  header {
    height: 1.333333rem;
    width: 100%;
    background: rgb(244, 244, 244);
    text-align: center;
    position: relative;
    h2 {
      display: inline-block;
      font-size: .506667rem;
      color: rgb(34, 34, 34);
      line-height: 1.333333rem;
      letter-spacing: .106667rem;
    }
  }
  .tab-card {
    overflow: auto;
    ul {
      li {
        padding: .186667rem .373333rem .413333rem .413333rem;
        border-bottom: .213333rem solid rgb(244, 244, 244);
        .card_header {
          margin-bottom: .333333rem;
          p {
            float: left;
            font-size: .346667rem;
            color: rgb(154, 153, 153);
            span {
              margin-left: .266667rem;
            }
          }
          span {
            float: right;
            color: rgb(154, 153, 153);
          }
        }
        .card_right {
          position: relative;
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
            margin-bottom: .333333rem;
            text-align: center;
            .time_item {
              float: left;
              margin: 0 .133333rem .133333rem 0px;
              padding: 0 .066667rem;
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
          .cancleMsg {
            width: 2.186667rem;
            height: .8rem;
            border-radius: .106667rem;
            background-color: rgb(251, 251, 251);
            text-align: center;
            line-height: .8rem;
            color: rgb(153, 153, 153);
            position: absolute;
            right: .066667rem;
            bottom: 0px;
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
              line-height: .8rem;
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
    .personmsg {
      padding: .533333rem;
      border-bottom: .666667rem solid rgb(244, 244, 244);
      h3 {
        padding-bottom: .266667rem;
        text-align: center;
        font-size: .533333rem;
        border-bottom: 1px solid rgb(244, 244, 244);
      }
      p {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: .4rem;
        border-bottom: 1px solid rgb(244, 244, 244);
      }
      // p:nth-of-type(2) {
      //   margin-left: 60px;
      // }
    }
  }
}
</style>

