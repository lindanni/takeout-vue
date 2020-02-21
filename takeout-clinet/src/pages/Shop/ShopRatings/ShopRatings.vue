<template>
  <div class="shoprating_wrap">
    <div class="rating_top">
      <div class="score_left">
        <p class="totalscore">{{totalScore}}</p>
        <p class="totalscore_title">综合评分</p>
      </div>
      <div class="score_right">
        <div class="serverscore_wrap">
          <Star :score="parseFloat(totalServerScore) || 0" :size="36"></Star>
          <span class="title">服务态度</span>
          <span class="serverscore">{{totalServerScore || 0}}</span>
        </div>
        <div class="foodscore_wrap">
          <Star :score="parseFloat(totalFoodScore) || 0" :size="36"></Star>
          <span class="title">商品评分</span>
          <span class="foodscore">{{totalFoodScore || 0}}</span>
        </div>
        <div class="deliverytime_wrap">
          <span class="title">送达时间</span>
          <span class="deliverytime">{{info.deliveryTime}}分钟</span>
        </div>
    </div>
    </div>
    <div class="rating_bottom">
      <div class="rating_nav">
        <span class="item" :class="{on: isRatingNav === 1}" @click="isRatingNav=1">全部({{ratinglength}})</span>
        <span class="item" :class="{on: isRatingNav === 2}" @click="isRatingNav=2">满意({{goodrating}})</span>
        <span class="item" :class="{on: isRatingNav === 3}" @click="isRatingNav=3">不满意({{ratinglength - goodrating}})</span>
        <div class="rating_toggle">
          <i class="iconfont icondagouyouquan" :class="{on: isShowRating}" @click="isShowRating=!isShowRating"></i>
          <span class="toggle_title" :class="{on: isShowRating}">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating_content">
        <ul class="rating_list" v-if="rating && rating.length !== 0">
          <li v-for="(order, index) in rating" :key="index">
            <div class="left">
              <i class="iconfont iconyonghutouxiang"></i>
            </div>
            <div class="right">
              <div class="user_info">
                <span class="username">{{order.user[0].username}}</span>
                <span class="phone">{{order.user[0].phone}}</span>
              </div>
              <Star :score="parseFloat(((parseFloat(order.serverscore) + parseFloat(order.foodscore))/2).toFixed(1)) || 0" :size="24"></Star>
              <div class="rating_text">{{order.ratingtext}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import Star from "../../../components/Star/Star";
  export default {
      data() {
          return {
              isRatingNav: 1,
              isShowRating: false
          }
      },
      computed: {
          ...mapGetters(['totalServerScore', 'totalFoodScore', 'totalScore', 'ratingLength', 'goodRating']),
          ...mapState(['orderlist','info', 'orderlist_shop']),
          rating() {
              var ratings = []
              if( this.isRatingNav === 1) {
                  this.orderlist_shop.forEach((order) => {
                      if (order.serverscore) {
                          ratings.push(order)
                      }
                  })
              }else if(this.isRatingNav === 2) {
                  this.orderlist_shop.forEach((order) => {
                      if (order.serverscore === 5) {
                          ratings.push(order)
                      }
                  })
              }else if(this.isRatingNav === 3) {
                  this.orderlist_shop.forEach((order) => {
                      if(order.serverscore && order.serverscore !== 5) {
                          ratings.push(order)
                      }
                  })
              }
              if (this.isShowRating) {
                  ratings.forEach((order) => {
                      if (!order.ratingtext) {
                         ratings.splice(ratings.indexOf(order), 1)
                      }
                  })
              }
              return ratings
          },
          ratinglength() {
              var count = 0
              this.orderlist_shop.forEach((order) => {
                  if (order.serverscore) {
                     count ++
                  }
                  if (this.isShowRating) {
                      if (!order.ratingtext) {
                          count --
                      }
                  }
              })
              return count
          },
          goodrating() {
              var count = 0
              this.orderlist_shop.forEach((order) => {
                  if (order.serverscore === 5) {
                      count ++
                  }
                  if (this.isShowRating) {
                      if (!order.ratingtext) {
                          if (order.serverscore === 5) {
                              count --
                          }
                      }
                  }
              })
              return count
          }
      },
      created() {
          this.$store.dispatch('getOrderList',this.getOrderListByShopId)
      },
      components: {
          Star
      },
      methods: {
          getOrderListByShopId() {
              this.$store.dispatch('getOrderListByShopId')
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .shoprating_wrap {
    .rating_top {
      height: 60px;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      padding: 20px;
      .score_left {
        padding-right:20px;
        border-right: 1px solid #ccc;
        float: left;
        text-align: center;
        .totalscore {
          font-size: 25px;
          margin-bottom: 5px;
          color: #ff6c00;
        }
        .totalscore_title {
          font-size: 15px;
        }
      }
      .score_right {
        padding-left: 20px;
        overflow: hidden;
        .serverscore_wrap {
          margin-bottom: 5px;
          .star {
            float: left;
            margin-right: 15px;
          }
        }
        .foodscore_wrap {
          margin-bottom: 5px;
          .star {
            float: left;
            margin-right: 15px;
          }
        }
        .deliverytime_wrap {
          font-size: 13px;
        }
      }
    }
    .rating_bottom {
      margin-top: 15px;
      background-color: #fff;
      border-top: 1px solid #ccc;
      font-size: 13px;
      .rating_nav {
        border-bottom: 1px solid #ccc;
        padding: 15px;
        margin-bottom: 10px;
        .item {
          margin-right: 10px;
          font-size: 12px;
          cursor: pointer;
          padding: 3px 8px;
          background-color: #aaaaaa;
          color: #fff;
          border-radius: 2px;
          font-weight: 700;
          &.on {
            background-color: #02a774;
          }
        }
        .rating_toggle {
          margin-top: 15px;
          .iconfont {
            font-size: 19px;
            vertical-align: middle;
            margin-right: 5px;
            cursor: pointer;
            color: #aaaaaa;
            &.on {
              color: #02a774;
            }
          }
          .toggle_title {
            color: #aaa;
            &.on {
              color: #333;
            }
          }
        }
      }
      .rating_content {
        .rating_list {
          li {
            padding: 10px;
            padding-bottom: 10px;
            border: 1px solid #ccc;
            .left {
              float: left;
              margin-right: 5px;
              .iconfont {
                font-size: 30px;
              }
            }
            .right {
              overflow: hidden;
              .user_info {
                display: flex;
                justify-content: space-between;
                padding-right: 20px;
                margin-bottom: 5px;
              }
              .rating_text {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
