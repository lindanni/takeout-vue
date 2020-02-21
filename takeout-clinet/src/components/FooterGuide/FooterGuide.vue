<template>
  <footer class="footerwrap">
    <div class="guide_item" @click="goto('/msite')" :class="{on: isCurrent('/msite')}">
      <span>首页</span>
      <i class="iconfont iconshouye"></i>
    </div>
    <div class="guide_item" @click="goto('/search')" :class="{on: isCurrent('/search')}">
      <span>搜索</span>
      <i class="iconfont iconsousuo"></i>
    </div>
    <div class="guide_item" @click="goto('/order')" :class="{on: isCurrent('/order')}">
      <span>订单</span>
      <i class="iconfont icondingdan"></i>
    </div>
    <div class="guide_item" @click="goto('/profile')" :class="{on: isCurrent('/profile')}">
      <span>个人</span>
      <i class="iconfont icongerenzhongxin"></i>
    </div>
  </footer>
</template>
<script>
  export default {
      methods: {
          goto(path) {
              this.$router.replace(path)
          },
          isCurrent(path) {
              return this.$route.path == path
          }
      }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .footerwrap {
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index:100;
    background-color: #fff;
    width: 100%;
    height:45px;
    border-top: 1px solid #ccc;
    display: flex;
    .guide_item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.on{
        color: #02a774;
      }
      span {
        font-size: 12px;
        margin-top:2px;
        margin-bottom: 2px;
      }
      .iconfont {
        font-size: 20px;
      }
    }
  }
</style>
