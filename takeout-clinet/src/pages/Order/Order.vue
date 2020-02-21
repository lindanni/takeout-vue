<template>
  <div class="order_wrap">
    <HeaderTop title="我的订单"></HeaderTop>
    <div class="search_wrap">
      <div class="search_left">
        <span class="search_title">我的订单</span>
      </div>
      <div class="search_right">
        <input type="text" class="keyword" v-model="keyword">
        <i class="iconfont iconsousuo" @click="searchOrder"></i>
      </div>
    </div>
    <div class="scroll_order">
      <ul class="order_list">
        <li v-for="(order, index) in orderlist" :key="index">
          <div class="image_wrap">
            <img :src="BaseImgUrl +order.shopinfo[0].avatar" alt="">
          </div>
          <div class="order_detail">
            <div class="order_top">
              <div class="top_top">
                <div class="shop_name">{{order.shopinfo[0].name}}<i class="iconfont iconxiayiyeqianjinchakangengduo"></i></div>
                <div class="send">已送达</div>
              </div>
              <div class="time">{{order.time}}</div>
            </div>
            <div class="order_bottom">
              <div class="food_name">
                {{order.food[0].name}} 等{{order.food.length}}件
              </div>
              <div class="totalprice">￥{{order.totalprice}}</div>
            </div>
            <div class="rating_wrap" v-if="!order.serverscore">
              <button class="rating_btn" @click="$router.push(`/orderrating?id=${order._id}`)">请 评 价</button>
            </div>
            <div class="del_wrap" v-else>
              <button class="del_btn" @click="deleteOrder(order._id)">删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import {reqDeleteOrder} from "../../api";

  export default {
      data() {
          return {
              BaseImgUrl: "/images",
              keyword: ''
          }
      },
      components: {
          HeaderTop
      },
      created() {
          this.$store.dispatch('getOrderList')
      },
      computed: {
        ...mapState(['orderlist'])
      },
      methods: {
          searchOrder() {
              this.$store.dispatch('getSearchOrder', {keyword: this.keyword})
          },
          deleteOrder(orderid) {
            reqDeleteOrder(orderid)
            this.$store.dispatch('delOrder',{orderid})
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .order_wrap {
    font-size: 13px;
    padding-top: 45px;
    padding-bottom: 45px;
      .search_wrap {
        background-color: transparent;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        .search_left {
          .search_title {
            font-size: 16px;
          }
        }
        .search_right {
          .keyword {
            margin-right: 10px;
            border-radius: 2px;
            padding-left: 10px;
            height: 25px;
            outline: none;
            border: none;
          }
          .iconfont {
            font-size: 20px;
            cursor: pointer;
          }
        }

      }
    .order_list {
      padding: 0 10px;
      li {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #fff;
        border-radius: 4px;
        .image_wrap {
          float: left;
          margin-right: 10px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .order_detail {
          overflow: hidden;
          .order_top {
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 5px;
            .top_top {
              margin-bottom: 5px;
              display: flex;
              justify-content: space-between;
              .shop_name {
                font-size: 14px;
                .iconfont {
                  vertical-align: middle;
                  cursor: pointer;
                }
              }
              .send {}
            }
            .time {
              font-size: 12px;
            }
          }
          .order_bottom {
            display: flex;
            justify-content: space-between;
            padding-top: 4px;
            .food_name {}
            .totalprice {}
          }
          .rating_wrap {
            margin-top: 7px;
            text-align: right;
            .rating_btn {
              background-color: #fff;
              border: 1px solid #00aed6;
              color: #00aed6;
              padding: 4px 10px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
            }
          }
          .del_wrap {
            margin-top: 7px;
            text-align: right;
            .del_btn {
              background-color: #fff;
              border: 1px solid #00aed6;
              color: #00aed6;
              padding: 4px 10px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
