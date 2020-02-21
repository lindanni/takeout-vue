<template>
  <div class="showalert_wrap">
    <div class="showalert">
      <div class="alert_img">
        <i class="iconfont icongantanhao"></i>
      </div>
      <div class="alert_text">{{alertText}}</div>
      <button class="alert_btn" @click="closealert">确定</button>
    </div>
    <div class="alert_cover" @click="closealert"></div>
  </div>
</template>
<script>
  export default {
      methods: {
          closealert() {
              this.$emit('closealert')
          }
      },
      props: {
          alertText: String
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .showalert_wrap {
    .showalert {
      padding-top: 10px;
      width: 60%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 4px;
      z-index: 100;
      text-align: center;
      .alert_img {
        .icongantanhao {
          font-size: 80px;
          color: #ff1100b3;
          position: static;
        }
      }
      .alert_btn {
        cursor: pointer;
        width: 100%;
        height: 40px;
        background-color: #00b43c;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius:  4px;
        border: none;
        color: #fff;
        font-weight: 700;
      }
      .alert_text {
        margin-top: 10px;
        margin-bottom: 10px;
        color: #333;
        font-size: 13px;
      }
    }
    .alert_cover{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3)
    }
  }
</style>
