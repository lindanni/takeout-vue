<template>
  <div class="shopgoods_wrap">
    <div class="menu_list">
      <ul class="category_list">
        <li v-for="(good, index) in goods" :key="index" :class="{on: index === currentIndex}" @click="ClickMenuItem(index)">
          <span class="good_name">{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods_wrap">
      <div class="goods_list" ref="foodul">
        <div class="goods_item" v-for="(good, index) in goods" :key="index">
          <h4 class="goods_title">{{good.name}}</h4>
          <ul class="foods_list">
            <li  v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
              <div class="food_left">
                <img :src="BaseImgUrl+food.image" alt="">
              </div>
              <div class="food_right">
                <div class="food_name">{{food.name}}</div>
                <div class="detail">
                  <span class="sellCount">月销{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">￥{{food.price}}</div>
              </div>
              <CartControl :food="food" :shopid="info._id"></CartControl>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ShopCart></ShopCart>
    <Food :food="food" ref="food"></Food>
  </div>
</template>
<script>
  import ShopCart from '../../../components/ShopCart/ShopCart'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
      data() {
        return {
            BaseImgUrl: '/images',
            food: {},
            tops: [],
            ScrollY: 0,
        }
      },
      methods: {
          initScroll() {
              new BScroll('.menu_list',{
                  click: true
              })
              this.goods_wrap = new BScroll('.goods_wrap',{
                  click: false
              })
              this.goods_wrap.on('scroll', ({x, y}) => {
                  this.ScrollY = Math.abs(y)
              })
              this.goods_wrap.on('scrollEnd', ({x,y}) => {
                  this.ScrollY = Math.abs(y)
              })
          },
          showFood(food) {
              this.food = food
              this.$refs.food.toggleShow()
          },
          initTops() {
              const tops = []
              let top = 0
              tops.push(top)
              const good_items = this.$refs.foodul.children
              Array.prototype.slice.call(good_items).forEach(li => {
                  top += li.clientHeight
                  tops.push(top)
              })
              this.tops = tops
          },
          ClickMenuItem(index) {
              let scrollY = this.tops[index]
              this.ScrollY = scrollY
              this.goods_wrap.scrollTo(0, -scrollY, 300)
          }
      },
      computed: {
          ...mapState(['info', 'goods']),
          currentIndex() {
              const {ScrollY, tops} = this
              const index = tops.findIndex( (top, index) => {
                  return (ScrollY >= top && ScrollY < tops[index + 1])
              })
              return index
          }
      },
      watch: {
          shopinfo() {
              this.$nextTick(() => {
                  this.initScroll()
                  this.initTops()
              })
          }
      },
      mounted() {
          this.$nextTick(() => {
              this.initScroll()
              this.initTops()
          })
      },
      components: {
          ShopCart,
          CartControl,
          Food
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .shopgoods_wrap {
    position: absolute;
    top: 239px;
    width: 100%;
    bottom: 40px;
    overflow: hidden;
    display: flex;
    .menu_list {
      flex: 0 0 80px;
      width: 80px;
      .category_list {
        li {
          background-color: #f5f5f5;
          width: 80px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-bottom: 1px solid #ccc;
          font-size: 13px;
          &.on {
            background-color: #fff;
            color: #02a774;
          }
        }
      }
    }
    .goods_wrap {
      flex: 1;
      .goods_list {
        .goods_item {
          h4 {
            font-size: 13px;
            font-weight: normal;
            background-color: #f5f5f5;
            border-left:1px solid #ccc;
            height: 25px;
            line-height: 25px;
            text-indent: 2em;
            text-indent: 1em;
          }
          .foods_list {
            padding: 0px 15px;
            li {
              position: relative;
              padding: 10px 0px;
              height: 60px;
              border-bottom: 1px solid #ccc;
              width: 100%;
              display: flex;
              .food_left {
                flex: 0 0 80px;
                position: relative;
                img {
                  display: block;
                  position: absolute;
                  width: 50px;
                  height: 50px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .food_right {
                flex: 1;
                font-size: 12px;
                .food_name {
                  font-size:13px;
                  font-weight: 700;
                }
                .price {
                  color: #ff1100;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
