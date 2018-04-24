<template>
  <transition name="slide">
    <div class="order_detail">
      <div class="order_container">
        <!-- 标题 -->
        <header>
          <h2>{{orderList.roomName}}</h2>
        </header>
        <!-- 轮播 -->
        <div class="order_header">
          <swiper :show-desc-mask="false"  :show-dots="this.demo03_list.length>1":list="demo03_list" auto style="width:100%;margin:0 auto;" @on-index-change="demo03_onIndexChange" height="340px" dots-class="custom-bottom" dots-position="center" :index="demo03_index"></swiper>
        </div>
        <!-- 内容 -->
        <div class="order_content">
          <div class="order_Title">
            <div class="text_content">
              <span>预约过：{{orderList.roomCount}}次</span>
              <span>可容：{{orderList.roomPersonCount}}次</span>
              <span>审批:{{passed}}</span>
            </div>
            <div class="text_content1">
              <span>最近空闲日期:{{okdate}}</span>
            </div>
          </div>

          <div class="order_form">
            <div class="form_count">
              <span>预约人数</span><input type="text" v-model="currentValue">
              <router-link tag="a" class="mine" to="/check-table" v-if="currentValue>=100">
                打印审批表
              </router-link>
            </div>
            <!-- 日期选择 -->
            <div class="form_data">
              <group>
                <datetime v-model="date_message" @on-change="changeDate" :title="istime"></datetime>
              </group>
            </div>
          </div>
          <!-- 时间段 -->
          <div class="time_slot">
            <span class="time_txt">预约时间</span>
            <div class="time_all clearfix" @click="getClickIndex($event)">
              <div class="time_block" v-for="item in Time_area" :class="item.use? '' :'time_un' " :style="item.check?'':styleObject" @click="chooseTime(item)" :key="item.id">
                {{item.time}}</div>
            </div>
          </div>
          <!-- 上传图片 -->
          <div class="uploadImg clearfix" v-show="currentValue>=100">
            <div class="upImg">
              <ul class="imglist">
                <li class="list-li" v-for="(iu, index) in imgUrls">
                  <a class="list-link" @click='previewImage(iu)'>
                    <img :src="iu.imageBase64">
                  </a>
                  <span class="iconfont icon-icon-cross-empty" @click='delImage(index)'></span>
                </li>
                <li class="iconfont icon-shangchuantupian" @click.stop="addPic(index)" v-for="(item,index) in iconlist">
                  <input type="file" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                </li>
              </ul>
            </div>
          </div>
          <!-- 缩率图 -->
          <div v-transfer-dom>
            <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
              <div class="img-box">
                <img :src="previewImg" style="max-width:100%">
              </div>
              <div @click="showHideOnBlur=false">
                <span class="vux-close"></span>
              </div>
            </x-dialog>
          </div>
        </div>

        <!-- 申请人信息 -->
        <div class="applyMs" v-if="proposer">
          <h1 class="Ms_title">申请人信息</h1>
          <div class="Ms_content">
            <div>
              <span>姓名：</span><input type="text" v-model="name"></div>
            <div>
              <span>手机号码：</span><input type="text" v-model="phone"></div>
            <div>
              <span>所在学院：</span>
              <select @change="selected">
                <option v-for="test in tests" :value="test.value" :key="test.id">{{ test.text }}</option>
              </select>
            </div>
            <div>
              <span>所在部门：</span><input type="text" v-model="meetDepartment"></div>
            <div>
              <span>指导老师：</span><input type="text" v-model="meetTeacher"></div>
            <div>
              <span>老师电话：</span><input type="text" v-model="meetTeacherPhone"></div>
            <div>
              <span>用途说明：</span>
              <textarea style="resize:none" cols="24" rows="5" v-model="meetDescribe"></textarea>
            </div>
          </div>
          <div class="Ms_btn" @click="ensure">
            <span>确认</span>
          </div>
        </div>
      </div>
      <!-- tab -->
      <div class="order_tab">
        <div class="need_order" @click="On_command">马上预约</div>
      </div>
      <!-- 阴影 -->
      <div class="shade" v-if="applymsg" @click="hide"></div>
    </div>
  </transition>
</template>
<script>
import Tab from "base/tab/tab";
import Confirm from "vux/src/components/confirm";
import Datetime from 'vux/src/components/datetime';
import Group from 'vux/src/components/group';
// import XButton from 'vux/src/components/x-button';
import {
  XDialog,
  XButton,
  XSwitch,
  TransferDomDirective as TransferDom
} from "vux";
import {
  getOrderDetail,
  getstatebyMEET,
  getUserCont,
  getinsertmeeting,
  StateController,
  UploadImg
} from "api/order-detail.js";
import { Swiper } from "vux";
const ERR_OK = 0;
const MAX = 100;
export default {
   directives: {
    TransferDom
  },
  data() {
    return {
      dots:false,
      arrtime: [],
      showHideOnBlur: false,
      Ind: "",
      demo03_list: [],
      proposer: false,
      usetime: false,
      iconlist: [1, 2, 3, 4],
      styleObject: {
        color: "white",
        background: "rgb(0,176,215)",
        border: "1px solid rgb(127,215,235)"
      },
      tests: [
        { value: 1, text: "信息学院" },
        { value: 2, text: "人文学院" },
        { value: 3, text: "艺术学院" },
        { value: 4, text: "建筑学院" },
        { value: 5, text: "二级学院" }
      ],
      clickIndex: [],
      okdate: "",
      insertvalue: [],
      selectedValue: 1,
      istime: "预约日期",
      meetDepartment: "",
      meetTeacher: "",
      meetDescribe: "",
      meetTeacherPhone: "",
      date_message: "",
      orderList: [],
      TimeList: [],
      currentValue: null,
      MSG: {},
      applymsg: false,
      timeA: [],
      name: "",
      phone: "",
      school: "",
      section: "",
      teach: "",
      teachPhone: "",
      desc: "",
      OrderId: 0,
      Time_area: [
        { time: "08:00-09:00", use: true, check: true },
        { time: "09:00-10:00", use: true, check: true },
        { time: "10:00-11:00", use: true, check: true },
        { time: "11:00-12:00", use: true, check: true },
        { time: "12:00-13:00", use: true, check: true },
        { time: "13:00-14:00", use: true, check: true },
        { time: "14:00-15:00", use: true, check: true },
        { time: "15:00-16:00", use: true, check: true },
        { time: "16:00-17:00", use: true, check: true }
      ],
      checked: [],
      imgUrls: [],
      urlArr: [],
      btnTitle: "",
      previewImg: "",
      demo03_index: 0
    };
  },
  computed: {
    passed() {
      return this.orderList.roomState === 1 ? "需要" : "不通过";
    }
  },
  created() {
    this.OrderId = this.$route.params.id;
    this._getOrderDetail(this.OrderId);
  },
  watch: {
    currentValue: function(val) {
      if (val >= MAX) {
        this.$createDialog({
          type: "alert",
          title: "人数超标",
          content: "您预约的人数超过100,需要提交审批资料才能申请",
          icon: "cubeic-alert"
        }).show();
      }
    }
    // imgUrls: "toggleAddPic"
  },
  methods: {
    demo03_onIndexChange(index) {
      this.demo03_index = index;
    },
    // toggleAddPic: function() {
    //   let vm = this;
    //   if (vm.imgUrls.length >= 1) {
    //     this.applymsg = false;
    //   }
    // },
   addPic: function(index) {
      this.Ind = index;
    },
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files, e);
    },
    createImage: function(file, e) {
      let vm = this;
      lrz(file[0], { width: 480 })
        .then(function(rst) {
          vm.saveImage(rst);
          return rst;
        })
        .always(function() {
          e.target.value = null;
        });
    },
   delImage: function(index) {
           this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '是否删除图片',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
             this.imgUrls.splice(index, 1);
          this.iconlist.splice(index, 0, 1);
        },
        onCancel: () => {
        }
      }).show()
    },
     previewImage: function(url) {
      this.showHideOnBlur = true;
      this.previewImg = url.imageBase64;
    },
    saveImage: function(file) {
      console.log(file);
      let vm = this;
      let names = file.origin.name.split(".");
      let ext = names[names.length - 1];
      let baSe = file.base64;
      var MSG = {
        imgBase64: baSe
      };
      //数据传输操作
      UploadImg(MSG, ext).then(res => {
        this.imgUrls.push("http://hys.wzvcst.edu.cn/meet/wxapi/" + res);
        this.hide();
        this.iconlist.splice(this.Ind, 1);
      });

    },
    getClickIndex(e) {
      let node = e.target;
      let nodeCollection = node.parentNode.children;
      let nodeArr = Array.from(nodeCollection);
      let Index = nodeArr.indexOf(node) + 1;
      this.clickIndex.push(Index);
      return new Set(this.clickIndex);
    },
    selected(ele) {
      this.selectedValue = ele.target.value;
    },
    change(value) {
      console.log("change", value);
    },
    hide() {
      this.applymsg = false;
      this.proposer = false;
    },
    //根据id获取会议室
    _getOrderDetail(OrderId) {
      getOrderDetail(OrderId).then(res => {
        if (res.code === ERR_OK) {
          this.orderList = res.data;
          console.log(this.orderList);
          if (this.orderList.roomImg.split("|").length > 1) {
            this.orderList.roomImg = this.orderList.roomImg.split("|");
          } else {
            this.orderList.roomImg = this.orderList.roomImg.split();
          }
          // 剛開始不能輸入的時間段
          this.arrtime = this.orderList.roomTimeArea.split(",");
          // console.log(this.arrtime)
          for (var i in this.arrtime) {
            this.Time_area[this.arrtime[i]].use = false;
          }
          this._StateController(this.orderList.roomId);
          this.demo03_list = this.orderList.roomImg.map(v => ({ img: v }));
        }
      });
    },
    //最近空闲日期
    _StateController(roomId) {
      if (roomId === -1) {
        this.okdate = "没有空闲";
      } else {
        StateController(roomId).then(res => {
          if (res.code === ERR_OK) {
            this.okdate = res.okdate;
          }
        });
      }
    },
    chooseTime(item) {
      if (!item.use) {
        return;
      }
      item.check = !item.check;
    },

    // 获取已用时间段
    _getstatebyMEET(obj) {
      getstatebyMEET(obj).then(res => {
        if (res.code === ERR_OK) {
          this.TimeList = res.data;
          console.log(this.TimeList)
          this.Time_area.forEach((item, index) => {
            item.use = true;
            item.check = true;
            if (!this.TimeList.length) {
              item.use = true;
            }
            for (var i in this.arrtime) {
              this.Time_area[this.arrtime[i]].use = false;
            }
            for (var i = 0; i < this.TimeList.length; i++) {
              if (
                item.time.slice(0, 2) ===
                this.TimeList[i].time.timeArea.slice(0, 2)
              ) {
                item.use = false;
              }
            }
          });
        }
      });
    },

    //插入预约信息
    _getinsertmeeting(MSG) {
      getinsertmeeting(MSG).then(res => {
        if (res.code === ERR_OK) {
          this.insertvalue = res.data;
          this.$router.push({
            path: "/user-center",
            query: {
              meetUserId: this.MSG.meetUserId
            }
          });
        }
      });
    },

    back() {
      this.$router.back();
    },
    // 改变时间的时候获取已用时间段
    changeDate(e) {
      let obj = {
        stateDate: this.date_message,
        stateRoomId: this.orderList.roomId,
        stateState: 0
      };
      this._getstatebyMEET(obj);
      console.log(obj);
    },
    ensure() {
      this.MSG = {
        // 学院
        meetCollegeId: this.selectedValue,
        // 时间
        meetDate: this.date_message,
        //部门
        meetDepartment: this.meetDepartment,
        //描述
        meetDescribe: this.meetDescribe,
        // 人数
        meetPersoncount: this.currentValue,
        // room的id
        meetRoomId: this.$route.params.id,
        meetImg: this.imgUrls.join(),
        // 老师
        meetTeacher: this.meetTeacher,
        // 老师电话
        meetTeacherPhone: this.meetTeacherPhone,
        meetState: 0,
        //微信用户登录的id
        meetUserId: 1,
        // 时间段
        meetTimeArea: this.clickIndex.join()
      };
      // console.log(this.MSG.meetImg)
      this._getinsertmeeting(this.MSG);
      this.applymsg = false;
      this.proposer = false;
    },
    Rhome() {
      this.$router.push("/home");
    },
    On_command() {
      if (
        this.currentValue > 100 &&
        !this.imgUrls.length &&
        !this.clickIndex.length
      ) {
        this.$createDialog({
          type: "alert",
          content: "请您上传打印表",
          icon: "cubeic-alert"
        }).show();
      } else if (!this.date_message) {
        this.$createDialog({
          type: "alert",
          content: "请您填写预约日期",
          icon: "cubeic-alert"
        }).show();
      } else if (!this.clickIndex.length) {
        this.$createDialog({
          type: "alert",
          content: "请您选择预约时间",
          icon: "cubeic-alert"
        }).show();
      } else {
        this.applymsg = true;
        this.proposer = true;
      }
    }
  },
  components: {
    Swiper,
    Tab,
    Datetime,
    Group,
    XButton,
    Confirm,
    XDialog
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
.order_detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  .order_container {
    position: absolute;
    top: 0px;
    width: 100%;
    left: 0;
    bottom: 1.333333rem;
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
    .NumPrompt {
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -4rem;
      transform: translateY(-50%);
      width: 8rem;
      height:6rem;
      // border: 1px solid rgb(141, 139, 139);
      text-align: center;
      // background: #fff;
      .P_title {
        height: 1.866667rem;
        line-height: 1.333333rem;
        border-bottom: 2px solid rgb(153, 152, 152);
        h1 {
          font-size: .6rem;
          font-weight: 100;
        }
      }
      .p_content {
        margin: .533333rem 0;
        font-size: .466667rem;
        p {
          font-size: .373333rem;
          margin: .266667rem 0px;
        }
      }
      .p_btn {
        margin: 0 auto;
        width: 90%;
        height: .866667rem;
        line-height: .866667rem;
        color: #fff;
        border-radius: .133333rem;
        background: rgb(0, 176, 215);
      }
    }
    .applyMs {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 8rem;
      height: 13.333333rem;
      margin-left: -4rem;
      margin-top: -6.666667rem;
      background: #fff;
      border: 1px solid rgb(141, 139, 139);
      z-index: 100;
      .Ms_title {
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid rgb(192, 191, 191);
        font-size: .56rem;
        color: #000;
      }
      .Ms_content {
        padding: .266667rem .2rem .266667rem .333333rem;
        input {
          border: 1px solid rgb(169, 169, 169);
        }
        div {
          display: flex;
          margin-top: .4rem;
          span {
            margin-top: .133333rem;
            flex: 0 1 30%;
            text-align: right;
          }
          textarea {
            padding: .066667rem;
          }
          input {
            box-sizing: border-box;
            padding: .066667rem;
            width: 4.693333rem;
            height: .666667rem;
          }
          select {
            width: 4.693333rem;
            height: .666667rem;
          }
        }
      }
      .Ms_btn {
        width: 90%;
        text-align: center;
        margin: .133333rem auto;
        height: .933333rem;
        line-height: .933333rem;
        border-radius: .2rem;
        color: #fff;
        background: rgb(0, 176, 215);
      }
    }
    .order_content {
      margin: .133333rem 0px 250px 0px;
    }
    .order_Title {
      padding-bottom: .4rem;
      text-align: center;
      border-bottom: .306667rem solid rgb(244, 244, 244);
      .text {
        font-size: .4rem;
        padding-bottom: .266667rem;
      }
      .text_content {
        display: flex;
        margin: .4rem 0 .266667rem 0;
        span {
          display: inline-block;
          flex: 0 1 33%;
          font-size: .373333rem;
        }
      }
      .text_content1 {
        font-size: .453333rem;
        color: rgb(0, 176, 215);
      }
    }
    .order_form {
      font-size: .4rem;
      padding: .32rem 1.226667rem 0 .426667rem;
      .weui-cell {
        font-size: .4rem;
      }
      input {
        width: 58%;
        height: .666667rem;
      }
    }
    .form_count {
      height: 1.026667rem;
      line-height: 1.146667rem;
      padding-left: .146667rem;
      color: #000;
      font-family: "Courier New", Courier, monospace;
      span {
        font-size: .4rem;
        color: #000;
        font-family: "Microsoft YaHei";
      }
      a {
        border-radius: .066667rem;
        font-size: .266667rem;
        color: rgb(34, 170, 233);
        text-decoration: underline;
      }
      input {
        box-sizing: border-box;
        padding-left: .533333rem;
        border: none;
        outline: none;
        background: none;
        color: rgb(178, 178, 178);
      }
    }
    .uploadImg {
      // background:blue;
      height: 2.666667rem;
      width: 94%;
      margin: .666667rem auto;
      .upImg {
        padding: 0 0 0.41rem 0.38rem;
        height: 3.625rem;
        box-sizing: border-box;
        .imglist {
          margin-right: -0.375rem;
          li {
            position: relative;
            display: inline-block;
            margin-right: 0.375rem;
            vertical-align: middle;
            .icon-icon-cross-empty {
              position: absolute;
              top: -3px;
              right: -5px;
            }
            img {
              position: relative;
              top: .093333rem;
              width: 1.75rem;
              height: 1.75rem;
            }
            &.icon-shangchuantupian {
              position: relative;
              vertical-align: -webkit-baseline-middle;
              font-size: 1.75rem;
              overflow: hidden;
              margin-top:-3px;
              input {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
    .time_slot {
      margin-top: .28rem;
      margin-left: .333333rem;
      position: relative;
      left: 0px;
      top: 0px;
      .time_txt {
        display: inline-block;
        font-size: .4rem;
        color: #000;
        margin-left: .333333rem;
      }
      .time_all {
        margin: .266667rem .133333rem .133333rem .266667rem;
        // margin-right: -15px;
      }
      .time_block {
        margin-top: .2rem;
        float: left;
        width: 2.666667rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        border-radius: .133333rem;
        margin-right: .266667rem;
        box-sizing:border-box;
        border: 2px solid rgb(169, 169, 169);
        &.time_selected {
          border: 2px solid transparent;
          background: rgb(0, 176, 215);
          color: #fff;
          border: 2px solid rgb(127, 215, 235);
        }
        &.time_un {
          border: 2px solid transparent;
          background: #afb3b0;
          color: #fff;
        }
      }
    }
  }
  .order_tab {
    position: fixed;
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    bottom: 0px;
    left: 0px;
    background: rgb(244, 244, 244);
    .need_order {
      margin: 0 auto;
      margin-top: .453333rem;
      width: 8.533333rem;
      height: 1.253333rem;
      line-height: 1.253333rem;
      border-radius: .133333rem;
      color: #fff;
      font-size: .426667rem;
      background: rgb(0, 176, 215);
    }
  }
}
.shade {
  position: relative;
  top: 0px;
  left: 0px;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}
</style>

