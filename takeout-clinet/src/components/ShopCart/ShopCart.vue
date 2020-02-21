<template>
  <div class="shopcart_wrap">
    <div class="cart_content">
      <div class="cart_logo" @click="toggleShowCart">
        <div class="logo" :class="{highlight: totalCount}">
          <span class="quan" v-if="totalPrice">{{totalCount}}</span>
          <i class="iconfont iconshopping"  :class="{highlight: totalCount}"></i>
        </div>
      </div>
      <div class="detail">
        <p class="price">￥{{totalPrice}}</p>
        <p class="deliveryPrice">另需配送费￥{{info.deliveryPrice}}元</p>
      </div>
      <button class="minPrice" :class="payClass" :disabled="payClass !== 'enough'" @click="$router.push('/detailorder')">{{payText}}</button>
    </div>
    <transition name="move">
      <div class="shopcart_list" v-show="isShowCart">
        <div class="list_top">
          <span>购物车</span>
          <span class="clear">清空</span>
        </div>
        <ul>
          <li v-for="(food, index) in shopcart" :key="index">
            <span class="food_name">{{food.name}}</span>
            <span class="totalprice">{{food.count * food.price}}</span>
            <CartControl :food="food"></CartControl>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import CartControl from "../CartControl/CartControl";
  export default {
      data () {
        return {
            isShowCart: false
        }
      },
      computed: {
          ...mapState(['info', 'shopcart']),
          ...mapGetters(['totalCount', 'totalPrice']),
          payClass() {
             const {minPrice} = this.info
             const {totalPrice} = this
             return minPrice <= totalPrice ? 'enough' : 'no-enough'
          },
          payText() {
             const {minPrice} = this.info
             const {totalPrice} = this
             if (totalPrice === 0) {
                 return `￥${minPrice}起送`
             }else if(minPrice > totalPrice) {
                 return `还差￥${minPrice - totalPrice}起送`
             }else if(totalPrice >= minPrice) {
                 return `去结算`
             }
          }
      },
      components: {
          CartControl
      },
      methods: {
          toggleShowCart () {
              const {totalCount} = this
              if (totalCount) {
                  this.isShowCart = !this.isShowCart
              }
          }
      },
      watch: {
          totalCount() {
              if (this.totalCount === 0) {
                  this.isShowCart = false
              }
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .shopcart_wrap {
    z-index: 50;
    position: fixed;
    bottom:0;
    left: 0;
    height: 40px;
    width: 100%;
    color: #fff;
    .cart_content {
      width: 100%;
      height: 100%;
      background-color: #141d27;
      .cart_logo {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background-color: #222222;
        top: -10px;
        left: 10px;
        position: absolute;
        .logo{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 18px;
          background-color: #333333;
          line-height: 36px;
          text-align: center;
          &.highlight {
            background-color: #02a774;
          }
          .quan {
            position: absolute;
            height: 18px;
            width: 18px;
            border-radius: 9px;
            background-color: #ff1100;
            color: #fff;
            font-size: 12px;
            text-align: center;
            line-height: 16px;
            display: block;
            right: -3px;
            top: -7px;
          }
          .iconfont {
            font-size: 22px;
            color: #666666;
            &.highlight {
              color: #fff;
            }
          }
        }
      }
      .detail {
        padding-top: 3px;
        margin-left: 60px;
        .price{
          font-size: 14px;
          font-weight: 700;
        }
        .deliveryPrice {
          font-size: 12px;
          color: #cccccc;
        }
      }
      .minPrice{
        border: none;
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 0px;
        width: 100px;
        height: 100%;
        background-color: #333333;
        font-size: 13px;
        text-align: center;
        line-height: 40px;
        &.not-enough{
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
    .shopcart_list {
      position: absolute;
      z-index: -1;
      top: 0px;
      left: 0px;
      color: #222222;
      background-color: #fff;
      width: 100%;
      transform: translateY(-100%);
      &.move-enter-active, &.move-leave-active {
        transition: transform .3s;
      }
      &.move-enter, &.move-leave-to {
        transform: translateY(0)
      }
      .list_top {
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #ccc;
        border-bottom:1px solid #ccc;
        font-size: 14px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .clear {
          cursor: pointer;
        }
      }
      ul {
        padding: 10px;
        li {
          font-size: 13px;
          margin-bottom: 5px;
          position: relative;
        }
      }
    }
  }
</style>
