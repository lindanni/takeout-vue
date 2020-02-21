<template>
  <div class="orderrating_wrap">
    <HeaderTop title="订单评价"></HeaderTop>
    <i class="iconfont"></i>
    <div class="rating_wrap">
      <div class="shopname_wrap">
        <img :src="BaseImgUrl + orderone.shopinfo[0].avatar" alt="" class="shopimg">
        <span class="shopname">{{orderone.shopinfo[0].name}}</span>
      </div>
      <div class="rating_content">
        <div class="server_rating">
          <span class="rating_text">服务评价</span>
          <div class="star_wrap" @mouseleave="starleave('server')" @mouseenter="isClearServer=true">
            <i class="iconfont iconxingxing" :class="serverStar[0]" @mousemove="moveStar(1, 'server')" @click="clickStar(1, 'server')"></i>
            <i class="iconfont iconxingxing" :class="serverStar[1]" @mousemove="moveStar(2, 'server')" @click="clickStar(2, 'server')"></i>
            <i class="iconfont iconxingxing" :class="serverStar[2]" @mousemove="moveStar(3, 'server')" @click="clickStar(3, 'server')"></i>
            <i class="iconfont iconxingxing" :class="serverStar[3]" @mousemove="moveStar(4, 'server')" @click="clickStar(4, 'server')"></i>
            <i class="iconfont iconxingxing" :class="serverStar[4]" @mousemove="moveStar(5, 'server')" @click="clickStar(5, 'server')"></i>
          </div>
        </div>
        <div class="food_rating">
          <span class="rating_text">商品评价</span>
          <div class="star_wrap" @mouseleave="starleave('food')" @mouseenter="isClearFood=true">
            <i class="iconfont iconxingxing" :class="foodStar[0]" @mousemove="moveStar(1, 'food')" @click="clickStar(1, 'food')"></i>
            <i class="iconfont iconxingxing" :class="foodStar[1]" @mousemove="moveStar(2, 'food')" @click="clickStar(2, 'food')"></i>
            <i class="iconfont iconxingxing" :class="foodStar[2]" @mousemove="moveStar(3, 'food')" @click="clickStar(3, 'food')"></i>
            <i class="iconfont iconxingxing" :class="foodStar[3]" @mousemove="moveStar(4, 'food')" @click="clickStar(4, 'food')"></i>
            <i class="iconfont iconxingxing" :class="foodStar[4]" @mousemove="moveStar(5, 'food')" @click="clickStar(5, 'food')"></i>
          </div>
        </div>
        <textarea placeholder="请输入您想评价的内容" name="" id="" cols="30" rows="10" v-model="ratingText"></textarea>
      </div>
      <div class="btn_wrap">
        <button class="rating_btn" @click="saveRating">提交评价</button>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import {mapState} from 'vuex'
  import Star from '../../components/Star/Star'
  import {Toast} from 'mint-ui'
  import {reqSaveRating} from "../../api";

  export default {
      data() {
          return {
              BaseImgUrl: "/images",
              serverStar: ['off','off','off','off','off'],
              foodStar: ['off','off','off','off','off'],
              isClearServer: true,
              isClearFood: true,
              ratingText: ''
          }
      },
      components: {
          HeaderTop,
          Star
      },
      created() {
          this.$store.dispatch('getOrderDetail',{orderid: this.$route.query.id})
      },
      computed: {
          ...mapState(['orderone'])
      },
      methods: {
          moveStar(index, isstar) {
              var star
              if (isstar === 'server') {
                   star = this.serverStar
              }else{
                  star = this.foodStar
              }
              for(var i = 0; i < index; i++) {
                  this.$set(star, i, 'on')
              }
              for(var i = index; i < 5; i++) {
                  this.$set(star, i, 'off')
              }
          },
          clickStar(index, isstar){
              var star
              if (isstar === 'server') {
                  star = this.serverStar
                  this.isClearServer = false
              }else{
                  star = this.foodStar
                  this.isClearFood = false
              }
              for(var i = 0; i < index; i++) {
                  this.$set(star, i, 'on')
              }
              for(var i = index; i < 5; i++) {
                  this.$set(star, i, 'off')
              }
          },
          starleave(isstar){
              if (isstar === 'server') {
                  if (this.isClearServer) {
                      for(var i = 0; i < 5; i++) {
                          this.$set(this.serverStar, i, 'off')
                      }
                  }
              }else{
                  if (this.isClearFood) {
                      for(var i = 0; i < 5; i++) {
                          this.$set(this.foodStar, i, 'off')
                      }
                  }
              }
          },
          async saveRating() {
              var serverScore = 0
              var foodScore = 0
              for(var i = 0 ; i < 5; i++){
                  if(this.serverStar[i] === 'on') {
                      serverScore ++
                  }
              }
              for(var i = 0 ; i < 5; i++){
                  if(this.foodStar[i] === 'on') {
                      foodScore ++
                  }
              }
              if (serverScore === 0) {
                  Toast('请给服务打分！')
                  return;
              }
              if (foodScore === 0) {
                 Toast('请给商品打分！')
                 return;
              }
              var result = await reqSaveRating({serverscore: serverScore, foodscore: foodScore, ratingtext: this.ratingText, orderid: this.orderone._id})
              if (result.code === 0) {
                  Toast('评价成功')
              }
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .orderrating_wrap {
    .rating_wrap {
      padding: 45px 15px 0 15px;
      .shopname_wrap {
        margin-top: 20px;
        img {
          margin-right: 10px;
          width: 45px;
          height: 45px;
          font-size: 15px;
          vertical-align: middle;
          font-weight: 700;
        }
      }
      .rating_content {
        background-color: #fff;
        margin-top: 15px;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 20px;
        .server_rating {
          height: 30px;
          .rating_text {
             float: left;
             margin-right: 10px;
           }
          .star_wrap {
            .iconfont{
              padding-right: 5px;
              color: #ccc;
              &.off {
                color: #ccc;
              }
              &.on {
                color: #ff6c00;
              }
            }
          }
        }
        .food_rating {
          height: 30px;
          margin-bottom: 5px;
          .rating_text {
            float: left;
            margin-right: 10px;
          }
          .star_wrap {
            .iconfont{
              padding-right: 5px;
              color: #ccc;
              &.off {
                color: #ccc;
              }
              &.on {
                color: #ff6c00;
              }
            }
          }
        }
        textarea {
          background-color: #f5f5f5;;
          border: none;
          border-radius: 4px;
          width: 95%;
          padding: 10px;
        }
      }
      .btn_wrap {
        button {
          color: #fff;
          border: none;
          border-radius: 4px;
          background-color: #00aed6;
          width: 100%;
          height: 40px;
          font-size: 15px;
          cursor: pointer;
        }
      }
    }
  }
</style>
