<template>
  <header class="headerwrap">
    <slot name="left"></slot>
    <span class="header_title">{{title}}</span>
    <slot name="right"></slot>
  </header>
</template>
<script>
  export default {
      props: {
        title: String
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .headerwrap {
    border-bottom: 1px solid #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 46px;
    background-color: #02a774;
    color: #fff;
    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
    }
    .header_search {
      width: 10%;
      height: 50%;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      .iconfont{
        font-size: 25px;
        color: #fff;
      }
    }
    .header_login {
      width: 20%;
      text-align: right;
      height: 50%;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      span {
        color: #fff;
        font-size: 16px;
        .iconfont {
          font-size: 24px;
        }
      }
    }
  }
</style>
