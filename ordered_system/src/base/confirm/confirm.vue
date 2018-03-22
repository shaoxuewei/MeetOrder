<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
      },
      confirm() {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped lang="less" >

  .confirm{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0,0,0,0.3);
    &.confirm-fade-enter-active{
      animation: confirm-fadein 0.3s;
      .confirm-content{
          animation: confirm-zoom 0.3s;
      }
    }
     
    .confirm-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      .confirm-content{
        width: 470px;
        border-radius: 13px;
        background: #fff;
        .text{
          padding: 19px 15px;
          height:80px;
          line-height: 80px;
          text-align: center;
          font-size: 15px;
          color: #000;
        }
        .operate{
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 15px;
          .operate-btn{
            flex: 1;
            height:40px;
            line-height: 40px;
            padding: 10px 0;
            border-top: 1px solid #000;
            color: #000;
            &.left{
              border-right: 1px solid #000;
                }
            }
          }
        }
}
//   @keyframes confirm-fadein{
//     0%
//       opacity: 0
//     100%
//       opacity: 1
//   }
//   @keyframes confirm-zoom{
//     0%
//       transform: scale(0)
//     50%
//       transform: scale(1.1)
//     100%
//       transform: scale(1)
//   }  

  }      
</style>