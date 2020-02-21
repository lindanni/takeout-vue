<template>
  <div class="shoplist_wrap">
    <ul class="shoplist">
      <li v-for="(shop, index) in shoplist" :key="index" @click="goto_shop(shop._id)">
        <div class="list_left">
          <img :src="BaseImgUrl+shop.avatar" alt="">
        </div>
        <div class="list_right">
          <div class="name">
            <span>{{shop.name}}</span>
          </div>
          <div class="score_sellcount">
            <span>评分 {{shop.score}} 月售{{shop.sellCount}}单</span>
          </div>
          <div class="send">
            <span>￥{{shop.minPrice}}起送 | 配送￥{{shop.deliveryPrice}}</span>
            <span>{{shop.distance}} | {{shop.rankRate}}分钟</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
      props: {
          shoplist: Array
      },
      data (){
          return {
              BaseImgUrl: '/images'
          }
      },
      computed: {
          ...mapState(['userInfo'])
      },
      methods: {
          goto_shop(shopid) {
              if (this.userInfo._id) {
                  this.$router.push(`/shop?id=${shopid}`)
              }else {
                  Toast("请登录！")
              }
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .shoplist_wrap {
    .shoplist {
      border-top: 1px solid #ccc;
      background-color:#fff;
      li {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        &::after{
          content: '';
          display: block;
          clear: both;
        }
        .list_left {
          padding-left: 10px;
          img{
            width: 60px;
            height: 60px;
            float: left;
          }
        }
        .list_right {
          margin-left: 90px;
          orverflow: hidden;
          padding-top: 3px;
          margin-right: 5px;
          .name {
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 5px;
            color: #222;
          }
          .score_sellcount {
            font-size: 12px;
            margin-bottom: 5px;
            color: #333;
          }
          .send {
            display:flex;
            font-size: 12px;
            color: #333;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>
