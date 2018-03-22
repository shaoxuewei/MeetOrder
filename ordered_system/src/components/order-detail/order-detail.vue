<template>
        <transition name="slide">
            <div class="order_detail">
                <div class="order_container">
                  <!-- 标题 -->
                    <header>
                      <div class="icon-buoumaotubiao53" @click="back"></div>
                      <h2>{{orderList.roomName}}</h2>
                    </header>
                    <!-- 轮播 -->
                    <div class="order_header">
                      <swiper :list="demo03_list" auto style="width:100%;margin:0 auto;" height="340px" dots-class="custom-bottom" dots-position="center"></swiper>
                    </div>
                    <!-- 内容 -->
                    <div class="order_content">
                        <div class="order_Title">
                            <h2 class="text">{{orderList.roomName}}</h2>
                            <div class="text_content">
                                <span>预约过：{{orderList.roomCount}}次</span>
                                <span>最近空闲日期:{{okdate}}</span>
                            </div>
                            <div class="text_content">
                                <span>可容：{{orderList.roomPersoncount}}次</span>
                                <span>审批:{{passed}}</span>
                            </div>
                        </div>

                        <div class="order_form">
                          <!-- 日期选择 -->
                            <div class="form_data">
                                 <group>
                                  <datetime
                                    v-model="date_message"
                                    @on-change="changeDate"
                                    :title="istime"
                                   ></datetime>
                                </group>
                            </div>
                            <div class="form_count">
                                人数<input type="text" v-model="currentValue">
                                  <router-link tag="a" class="mine" to="/check-table" v-if="currentValue>=100">
                                        打开审批表
                                  </router-link>
                            </div>
                        </div>
                        <!-- 时间段 -->
                        <div class="time_slot">
                            <h3 class="time_txt">使用时间</h3>
                            <div class="time_all clearfix" @click="getClickIndex($event)">
                                <div class="time_block" v-for="item in Time_area"  :class="item.use? '' :'time_un' " :style="item.check?'':styleObject"  @click="chooseTime(item)" :key="item.id" >
                                  {{item.time}}</div>
                            </div>
                        </div>
                          <!-- 上传图片 -->
                        <div class="uploadImg clearfix" v-show="currentValue>=100">
                            <!-- <ul>
                              <li v-for="(item,index) in images">
                                  <span></span>
                                  <span></span>
                              </li>
                            </ul> -->
                            
                        </div>
                    </div>
                      <!-- 人数提示 -->
                    <div class="NumPrompt" v-show="show">
                        <div class="P_title">
                            <h1>提示</h1>
                        </div>
                        <div class="p_content">
                            <p>您预约的人数超过100</p>
                            <p>需要提交审批资料才能申请</p>
                        </div>
                        <div class="p_btn" @click="show=!show">
                            <span>确定</span>
                        </div>
                    </div>
                    <!-- 申请人信息 -->
                    <div class="applyMs" v-if="applymsg">
                        <h1 class="Ms_title">申请人信息</h1>
                        <div class="Ms_content">
                             <div><span>姓名：</span><input type="text" v-model="name"></div>
                             <div><span>手机号码：</span><input type="text"></div>
                             <div><span>所在学院：</span>
                                   <select @change="selected">
                                     <option v-for="test in tests" :value="test.value" :key="test.id">{{ test.text }}</option>
                                  </select>
                            </div>
                             <div><span>所在部门：</span><input type="text" v-model="meetDepartment"></div>
                             <div><span>指导老师：</span><input type="text" v-model="meetTeacher"></div>
                             <div><span>老师电话：</span><input type="text" v-model="meetTeacherPhone"></div>
                             <div><span>用途说明：</span><textarea style="resize:none" cols="23" rows="5" v-model="meetDescribe"></textarea></div>
                        </div>
                        <div class="Ms_btn" @click="ensure"><span>确认</span></div>
                    </div>
                </div>
                <!-- tab -->
                <div class="order_tab">
                    <div class="rt_index" @click="Rhome">返回首页</div>
                    <div class="need_order" @click="On_command" >我要预约</div>
                </div>
                <!-- 阴影 -->
                <div class="shade" v-if="applymsg" @click="applymsg=false"></div>
            </div>
        </transition>
</template>
<script>
import Tab from "base/tab/tab";
import { Datetime, Group, XButton } from "vux";
import {
  getOrderDetail,
  getstatebyMEET,
  getUserCont,
  getinsertmeeting,
  StateController
} from "api/order-detail.js";
import { Swiper } from "vux";
const ERR_OK = 0;
const MAX = 100;
//Vux轮播配置
const imgList = [
  "../../common/image/u142.",
  "http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff",
  "http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff"
];
const demoList = imgList.map((one, index) => ({
  url: "javascript:",
  img: one
}));

export default {
  data() {
    return {
      usetime: false,
      styleObject: {
        color: "white",
        background: "green"
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
      istime: "日期",
      meetDepartment: "",
      meetTeacher: "",
      meetDescribe: "",
      meetTeacherPhone: "",
      date_message: "",
      orderList: [],
      TimeList: [],
      date_message: "",
      demo03_list: demoList,
      currentValue: null,
      show: false,
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
      // select: false,
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
      show: false,
      imgUrls: [],
      urlArr: [],
      isPhoto: true,
      btnTitle: "",
      isModify: false,
      previewImg: "",
      isPreview: false
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
        this.show = true;
      }
    }
  },
  methods: {
    getClickIndex(e) {
      // let ClickArry=[];
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

    //根据id获取会议室
    _getOrderDetail(OrderId) {
      getOrderDetail(OrderId).then(res => {
        if (res.code === ERR_OK) {
          this.orderList = res.data;
          console.log(this.orderList, "根据id获取会议室信息");
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
          console.log(this.TimeList);
          // 是否空闲
          this._StateController(
            this.TimeList.length === 0 ? -1 : this.TimeList[0].stateRoomId
          );
          this.Time_area.forEach((item, index) => {
            item.use = true;
            item.check = true;
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
    },
    ensure() {
      this.applymsg = false;
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
      this._getinsertmeeting(this.MSG);
    },
    Rhome() {
      this.$router.push("/home");
    },
    On_command() {
      this.applymsg = true;
    }
  },
  components: {
    Swiper,
    Tab,
    Datetime,
    Group,
    XButton
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
    bottom: 100px;
    overflow: auto;
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
    .NumPrompt {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -300px;
      transform: translateY(-50%);
      width: 600px;
      height: 450px;
      border: 1px solid rgb(141, 139, 139);
      text-align: center;
      background: #fff;
      .P_title {
        height: 140px;
        line-height: 100px;
        border-bottom: 2px solid rgb(153, 152, 152);
        h1 {
          font-size: 45px;
          font-weight: 100;
        }
      }
      .p_content {
        margin: 40px 0;
        font-size: 35px;
        p {
          font-size: 28px;
          margin: 20px 0px;
        }
      }
      .p_btn {
        margin: 0 auto;
        width: 90%;
        height: 65px;
        line-height: 65px;
        color: #fff;
        border-radius: 10px;
        background: rgb(42, 189, 91);
      }
    }
    .applyMs {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 600px;
      height: 1000px;
      margin-left: -300px;
      margin-top: -500px;
      background: #fff;
      border: 1px solid rgb(141, 139, 139);
      z-index: 100;
      .Ms_title {
        text-align: center;
        height: 150px;
        line-height: 150px;
        border-bottom: 1px solid rgb(192, 191, 191);
      }
      .Ms_content {
        padding: 20px 15px 20px 25px;
        div {
          display: flex;
          margin-top: 30px;
          span {
            margin-top: 10px;
            flex: 0 1 30%;
            text-align: right;
          }
          textarea {
            padding: 5px;
          }
          input {
            box-sizing: border-box;
            padding: 5px;
            width: 352px;
            height: 50px;
          }
          select {
            width: 352px;
            height: 50px;
          }
        }
      }
      .Ms_btn {
        width: 90%;
        text-align: center;
        margin: 10px auto;
        height: 70px;
        line-height: 70px;
        border-radius: 15px;
        color: #fff;
        background: rgb(42, 189, 91);
      }
    }
    .order_content {
      margin: 10px 20px 250px 30px;
    }
    .order_Title {
      margin-bottom: 30px;
      .text {
        font-size: 40px;
        padding-bottom: 20px;
      }
      .text_content {
        display: flex;
        span {
          display: inline-block;
          flex: 0 1 50%;
          font-size: 28px;
        }
      }
    }
    .order_form {
      font-size: 30px;
      .weui-cell {
        font-size: 30px;
      }
      input {
        width: 60%;
        height: 50px;
      }
    }
    .form_count {
      border-bottom: 1px solid #d9d9d9;
      padding-left: 11px;
      color: #000;
      a {
        color: rgb(34, 170, 233);
        text-decoration: underline;
      }
      input {
        box-sizing: border-box;
        padding-left: 40px;
        border: none;
        outline: none;
        background: none;
      }
    }
    .uploadImg {
      // background:blue;
      height: 200px;
      width: 94%;
      margin: 50px auto;
      // .list-ul {
      //   list-style: none;
      //   /* 去掉ul前面的符号 */
      //   margin: 0px;
      //   /* 与外界元素的距离为0 */
      //   padding: 0px;
      //   /* 与内部元素的距离为0 */
      //   width: auto;
      //   /* 宽度根据元素内容调整 */
      //    .list-li {
      //     float: left;
      //     /* 向左漂移，将竖排变为横排 */
      //     padding: 8px;
      //     /* 与内部元素的距离为0 */
      //     display: inline-block;
      //     position: relative;
      //     text-align: center;
      //       /* 所有class为menu的div中的ul中的li样式 */
      //     .list-link{
      //       img{
      //         width: 100px;
      //         height: 100px;
      //       }
      //       a{
      //         &:active{
      //             background-color: #465c71;
      //             border: 1px #4e667d solid;
      //             /* 边框 */
      //             color: #dde4ec;
      //             /* 文字颜色 */
      //             display: flex;
      //             /* 此元素将显示为块级元素，此元素前后会带有换行符 */
      //             line-height: 1.35em;
      //             /* 行高 */
      //             padding: 4px 20px;
      //             /* 内部填充的距离 */
      //             text-decoration: none;
      //             /* 不显示超链接下划线 */
      //             white-space: nowrap;
      //             /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
      //             overflow: hidden;
      //         }
      //         &:hover{
      //           background-color: #bfcbd6;
      //           /* 背景色 */
      //           color: #465c71;
      //           /* 文字颜色 */
      //           text-decoration: none;
      //           /* 不显示超链接下划线 */
      //         }
      //         &:active{
      //             background-color: #bfcbd6;
      //             /* 背景色 */
      //             color: #465c71;
      //             /* 文字颜色 */
      //             text-decoration: none;
      //             /* 不显示超链接下划线 */
      //         }
      //       }
      //       .list-img-close {
      //     // background: #ffffff url(../../assets/del.jpg) no-repeat right top;
      //         border-color: #ff4a00;
      //         background-position: center;
      //         background-size: 35px 35px;
      //         display: block;
      //         float: left;
      //         width: 10px;
      //         height: 10px;
      //         position: absolute;
      //         top: 5%;
      //         left: 71%;
      //         margin-top: 0px;
      //         margin-left: 0px;
      //         padding: 8px;
      //         z-index: 10;
      //         border-radius: 5px;
      //         text-align: center;
      //       }
      //       .add-img {
      //         display: block;
      //         // background-image: url('../../assets/addpic.png');
      //         background-repeat: no-repeat;
      //         width: 100px;
      //         height: 100px;
      //         background-position: center;
      //         background-size: 100px 100px;
      //       }
      //     }
      //    }
      // }

      // li {
      //   width: 20%;
      //   height: 130px;
      //   margin-left: 50px;
      //   margin-bottom: 50px;
      //   list-style: none;
      //   border: 3px dashed rgb(153, 153, 153);
      //   float: left;
      //   position: relative;
      //   span:nth-child(1) {
      //     position: absolute;
      //     left: 50%;
      //     top: 50%;
      //     margin-left: -30px;
      //     margin-top: -5px;
      //     width: 60px;
      //     height: 10px;
      //     background: rgb(107, 107, 107);
      //   }
      //   span:nth-child(2) {
      //     position: absolute;
      //     left: 50%;
      //     top: 50%;
      //     margin-left: -5px;
      //     margin-top: -30px;
      //     width: 10px;
      //     height: 60px;
      //     background: rgb(107, 107, 107);
      //   }
      // }
    }
    .time_slot {
      margin: 10px;
      .time_all {
        margin: 20px 10px 10px 20px;
        margin-right: -15px;
      }
      .time_block {
        margin-top: 15px;
        float: left;
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 10px;
        margin-right: 20px;
        border: 2px solid black;
        &.time_selected {
          border: 2px solid transparent;
          background: #2abd5b;
          color: #fff;
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
    display: flex;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    bottom: 0px;
    left: 0px;
    .rt_index {
      flex: 0 1 250px;
      background: #fff;
      border-top: 4px solid rgb(189, 189, 189);
    }
    .need_order {
      color: #fff;
      flex: 1;
      background: rgb(42, 189, 91);
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

