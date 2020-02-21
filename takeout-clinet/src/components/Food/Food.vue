<template>
  <div class="food_wrap" v-if="isShow">
    <div class="food_detail">
      <div class="food_top">
        <i class="iconfont iconleft" @click="isShow=false"></i>
        <img :src="BaseImgUrl+food.image" alt="">
        <div class="food_info">{{food.info}}</div>
      </div>
      <div class="food_bottom">
        <div class="bottom_name">{{food.name}}</div>
        <div class="bottom_detail">
          <span class="bottom_sellCount">月销{{food.sellCount}}份</span>
          <span class="goodrating">好评率{{food.rating}}%</span>
        </div>
        <div class="bottom_price">￥{{food.price}}</div>
        <CartControl :food="food"></CartControl>
      </div>
    </div>
    <div class="cover_food" @click="isShow=false"></div>
  </div>
</template>
<script>
  import CartControl from "../CartControl/CartControl";
  export default {
      data() {
        return {
            BaseImgUrl: '/images',
            isShow: false
        }
      },
      props: {
          food: Object
      },
      methods: {
          toggleShow() {
              this.isShow = true
          }
      },
      components: {
          CartControl
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .food_wrap {
    .food_detail {
      z-index: 100;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 65%;
      background-color: #fff;
      .food_top{
        height: 70%;
        position: relative;
        .iconfont {
          position: absolute;
          left: 10px;
          top: 5px;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }
        img {
          height: 100%;
        }
        .food_info {
          position: absolute;
          left: 5px;
          bottom: 5px;
          color: #fff;
          font-size: 13px;
        }
      }
      .food_bottom {
        position: relative;
        padding: 10px;
        .bottom_name {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .bottom_detail {
          font-size: 13px;
          margin-bottom: 10px;
        }
        .bottom_price {
          font-size: 13px;
          color: #ff1100;
        }
      }
    }
    .cover_food {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3)
    }
  }
</style>
