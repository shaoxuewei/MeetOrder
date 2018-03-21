<template>
  <div class="checkpend">
        <header>
            <div class="icon-buoumaotubiao53" @click="back"></div>
            <h2>待审核</h2>
        </header>
       <div class="tab-card clearfix">
              <ul class="clearfix">
                <li class="clearfix">
                  <div class="card_left">
                    <div class="icon"><img src="../../common/image/loadImg.png" alt="" width="100" height="80"></div>
                    <p>人数:{{selectArry.meetPersoncount}}人</p>
                    <p>审核：<a>审核单</a></p>
                    <p class="cancle" @click="cancleOrder">取消预约</p>
                  </div>
                  <div class="card_right">
                    <div class="card_title">
                      <p>会议室AAA</p>
                      <span>待审核</span>
                    </div>
                    <div class="card_time">
                      预约时间：{{selectArry.meetDate}}
                      <p>预约时间:</p>
                      </div>
                    <div class="time_block clearfix">
                        <div v-for="item in Time_area" v-if="(item.tIndex==TimeA)" class="time_item" :key="item.id">
                          {{item.time}}
                        </div>
                    </div>
                    <div class="order_msg">
                      <p>预约人：xxxx</p>
                      <p>预约人手机号：{{selectArry.meetTeacherPhone}}</p>
                    </div>
                  </div>
                </li>
              </ul>
             <div class="personmsg">
                <h3>申请人信息</h3>
                <p>用途说明：</p>
                <p>姓名：</p>
                <p>手机号码：{{selectArry.meetTeacherPhone}}</p>
                <p>所在院校：</p>
                <p>所在部门：</p>
                <p>指导老师：</p>
                <p>老师电话：</p>
             </div> 
       </div>
       <cube-button @click="showBtn">Dialog - btxn</cube-button>
  </div>
</template>
<script>
import { getmeetstate, updatemeeting } from "api/meeting-controller.js";
import { Dialog } from 'cube-ui';
export default {
  data() {
    return {
      nowindex: 1,
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
  },
  methods: {
     showBtn() {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '我是标题',
        content: '我是内容',
        confirmBtn: {
          text: '确定按钮',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击确认按钮'
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击取消按钮'
          }).show()
        }
      }).show()
    },
    back() {
      this.$router.back();
    },
    cancleOrder() {
      let body = {
        meetId: this.meetId,
        meetUserId: 1
      };
      this._updatemeeting(body);
    },
    _updatemeeting(body) {
      updatemeeting(body).then(res => {
        if (res.code === 0) {
          this.$router.push({ path: "/user-center", query: { meetState: 3 } });
        }
      });
    }
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
  .tab-card {
    padding-bottom: 100px;
    ul {
      li {
        margin: 50px 30px 15px 30px;
        padding: 20px;
        border: 2px solid rgb(141, 140, 140);
        border-radius: 20px;
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
    .personmsg {
      padding: 40px;
      h3 {
        text-align: center;
        font-size: 40px;
      }
      p {
        margin-top: 40px;
        font-size: 30px;
      }
      p:nth-of-type(2) {
        margin-left: 60px;
      }
    }
  }
}
</style>

