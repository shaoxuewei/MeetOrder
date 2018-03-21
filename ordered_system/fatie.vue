<template>
  <div class="page fatie">
    <!-- <div class="title">我要发帖</div> -->
    <group label-width="2.4rem" label-margin-right=".267rem" label-align="right">
      <div class="img-warpper vux-1px-t">
        <div class="left">
          拍照取证：
        </div>
        <div class="right">
          <!-- 上传图片 -->
          <div class="img-list">
            <img v-for="item in imgList" :src="item.src" alt="" @click="showSheet1=true;currentImgUrl=item">
            <i class="iconfont icon-shangchuantupian" v-if="imgList.length<6">
              <input type="file" class="image" accept="image/*" @change='handleInputChange'>
            </i>
          </div>
        </div>
      </div>
    </group>
    <actionsheet v-model="showSheet1" :menus="['预览图片','删除图片']" show-cancel @on-click-menu="Sheet1"></actionsheet>
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer" :options="options"></previewer>
    </div>
    <footer>
      <x-button type="primary" @click.native.prevent="Submit">提交</x-button>
    </footer>
    <toast v-model="showToast" type="text" :time="2000" width="7rem" is-show-mask :text="errorMessage" position="default"></toast>
    <loading :show="showLoading" :text="showText"></loading>
  </div>
</template>
<script>
import Group from "vux/src/components/group";
import Loading from "vux/src/components/loading";
import Countdown from "vux/src/components/countdown";
import Actionsheet from "vux/src/components/actionsheet";
import XButton from "vux/src/components/x-button";
import XSwitch from "vux/src/components/x-switch";
import XInput from "vux/src/components/x-input";
import XTextarea from "vux/src/components/x-textarea";
import Selector from "vux/src/components/selector";
import Cell from "vux/src/components/cell";
import Toast from "vux/src/components/toast";
import Previewer from "vux/src/components/previewer";
import TransferDom from "vux/src/directives/transfer-dom";
import {
  GetAddApi,
  GetDepartmentsApi,
  SendSMSCaptchaApi,
  UploadBase64Api
} from "@/api/fatie";
import CryptoJS from "@/utils/aes";
import { setTimeout } from "timers";
import { Base64 } from "js-base64";
const AES_IV = "13aab4c8f32cd257";
const AES_Key = "7501ef13b5a6bc5535848ff08650ab07";
export default {
  data() {
    return {
      inputClick: false,
      businessName: "",
      showSheet1: false,
      showSheet2: false,
      form: {
        type: "请选择",
        department: "",
        name: "",
        mobile: "",
        mobileCode: "",
        content: "",
        IsAnonymous:false
      },
      isSendCode: false,
      objectList: [
        {
          Id: -1,
          Name: "请选择"
        },
        {
          Id: -1,
          Name: "发给当前商户"
        }
      ],
      imgList: [],
      imgList2: [],
      currentImgUrl: "",
      showToast: false,
      errorMessage: "",
      showLoading: false,
      showText: "",
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
        }
      }
    };
  },
  created() {
    document.title = "我要发帖";
    this.form.name = sessionStorage.getItem("user-name");
    this.form.mobile = sessionStorage.getItem("user-mobile");
    this.form.businessId = this.$route.query.businessId;
    this.businessName = this.$route.query.businessName;
    this.showLoading = true;
    this.showText = "加载中";
    GetDepartmentsApi().then(res => {
      this.form.department = this.objectList[0].Name;
      this.objectList = this.objectList.concat(res.Data);
      this.showLoading = false;
    });
  },
  methods: {
    Submit() {
      var _this = this;
      if (this.form.name == "") {
        this.showToast = true;
        this.errorMessage = "姓名不能为空";
        return;
      }
      if (this.form.type == "请选择") {
        this.showToast = true;
        this.errorMessage = "请选择帖子类别";
        return;
      }
      if (this.form.department == "请选择") {
        this.showToast = true;
        this.errorMessage = "请选择发帖对象";
        return;
      }

      if (this.form.mobile.trim() == "") {
        this.showToast = true;
        this.errorMessage = "手机号码不能为空";
        return;
      }
      if (this.form.mobileCode == "") {
        this.showToast = true;
        this.errorMessage = "手机验证码不能为空";
        return;
      }
      var temp = this.form.content.trim();
      if (temp.length < 10) {
        this.showToast = true;
        this.errorMessage = "详细内容不能少于10个字";
        return;
      }
      this.showLoading = true;
      this.showText = "提交中";
      GetAddApi({
        Name: this.form.name,
        Mobile: this.form.mobile.trim(),
        MobileCode: this.form.mobileCode,
        Content: this.form.content.trim(),
        BusinessId: parseInt(this.form.businessId),
        Type: this.form.type,
        Images: this.imgList2.join("|"),
        IsAnonymous: this.form.IsAnonymous,
        Department:
          this.form.department == "发给当前商户" ? "" : this.form.department
      }).then(res => {
        this.showLoading = false;
        if (res.IsSuccess) {
          this.showToast = true;
          this.errorMessage = "发帖成功";
          setTimeout(function() {
            _this.$router.go(-1);
          }, 1900);
        } else {
          this.showToast = true;
          this.errorMessage = res.Message;
        }
      });
    },
    Sheet1(key, item) {
      if (key == 1) {
        for (var i = 0; i < this.imgList.length; i++) {
          if (this.imgList[i] == this.currentImgUrl) {
            this.imgList.splice(i, 1);
            this.imgList2.splice(i, 1);
          }
        }
      } else {
        for (var i = 0; i < this.imgList.length; i++) {
          if (this.imgList[i] == this.currentImgUrl) {
            this.$refs.previewer.show(i);
          }
        }
      }
    },
    Sheet2(key, item) {
      if (key == 1) {
        return document.getElementsByClassName("image")[1].click();
      } else {
        return document.getElementsByClassName("image")[0].click();
      }
    },
    handleInputChange(event) {
      // 获取当前选中的文件
      const file = event.target.files[0];
      document.getElementsByClassName("image")[0].value = "";
      const imgMasSize = 1024 * 1024 * 2; // 10MB

      // 检查文件类型
      if (["jpeg", "png", "gif", "jpg"].indexOf(file.type.split("/")[1]) < 0) {
        this.showToast = true;
        this.errorMessage = "文件类型仅支持 jpeg/png/gif/jpg！";
        // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
        return;
      }

      // 文件大小限制
      if (file.size > imgMasSize) {
        this.showToast = true;
        this.errorMessage = "文件大小不能超过2MB！";
        return;
      }
      // 判断是否是ios
      if (!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        // iOS
        this.transformFileToFormData(file);
        return;
      }

      // 图片压缩之旅
      this.transformFileToDataUrl(file);
    },
    // 将File append进 FormData
    transformFileToFormData(file) {
      var _this = this;
      const formData = {
        type: file.type || "image/jpeg",
        size: file.size,
        name: file.name,
        lastModifiedDate: file.lastModifiedDate
      };
      const reader = new FileReader();
      reader.onload = function(e) {
        var strs = file.name.split(".");
        _this.uploadImg("." + strs[strs.length - 1], e.target.result);
      };

      reader.readAsDataURL(file);
    },
    // 将file转成dataUrl
    transformFileToDataUrl(file) {
      var _this = this;
      const imgCompassMaxSize = 800 * 1024; // 超过 400k 就压缩

      // 存储文件相关信息
      imgFile.type = file.type || "image/jpeg"; // 部分安卓出现获取不到type的情况
      imgFile.size = file.size;
      imgFile.name = file.name;
      imgFile.lastModifiedDate = file.lastModifiedDate;

      // 封装好的函数
      const reader = new FileReader();

      // file转dataUrl是个异步函数，要将代码写在回调里
      reader.onload = function(e) {
        const result = e.target.result;
        var strs = file.name.split(".");
        var ext = "." + strs[strs.length - 1];
        if (result.length < imgCompassMaxSize) {
          _this.compress(result, ext, _this, false); // 图片不压缩
        } else {
          _this.compress(result, ext, _this); // 图片压缩
        }
      };

      reader.readAsDataURL(file);
    },
    // 使用canvas绘制图片并压缩
    compress(dataURL, ext, _this, shouldCompress = true) {
      const img = new window.Image();

      img.src = dataURL;

      img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let compressedDataUrl;

        if (shouldCompress) {
          compressedDataUrl = canvas.toDataURL(imgFile.type, 0.2);
        } else {
          compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
        }
        _this.uploadImg(ext, compressedDataUrl);
      };
    },
    // 上传图片
    uploadImg(ext, base64) {
      this.showLoading = true;
      this.showText = "上传图片中";
      UploadBase64Api({
        FileData: base64,
        FileExt: ext
      }).then(res => {
        this.imgList.push({
          src: "http://118.31.35.189" + res
        });
        this.imgList2.push(res);
        this.showLoading = false;
      });
    }
  },
  directives: {
    TransferDom,
    click: {
      update: function(el, { value }) {
        if (value) {
          el.click();
        }
      }
    }
  },
  components: {
    Selector,
    Group,
    XInput,
    XTextarea,
    XSwitch,
    XButton,
    Cell,
    Actionsheet,
    Countdown,
    Toast,
    Loading,
    Previewer,
    TransferDom
  }
};
</script>
<style lang="less" scoped>
.fatie {
  padding-bottom: 1.333rem;
  .title {
    text-align: center;
    height: 1.067rem;
    line-height: 1.067rem;
    font-size: 0.533rem;
  }
  .img-warpper {
    padding: 10px 0;
    margin: 0 15px;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .left {
      width: 2.4rem;
      text-align: right;
      margin-right: 0.267rem;
    }
    .right {
      .img-list {
        display: inline-block;
        img {
          height: 1.6rem;
          width: 1.6rem;
          margin-left: 0.4rem;
          &:first-child,
          &:nth-child(4) {
            margin: 0;
          }
        }
      }
      .iconfont {
        position: relative;
        font-size: 1.333rem;
        vertical-align: super;
        .image {
          position: absolute;
          overflow: hidden;
          top: -.187rem;
          left: 0;
          opacity: 0;
          width: 1.333rem;
          height: 1.333rem;
          transform: translateY(50%);
        }
      }
    }
  }
}
</style>
