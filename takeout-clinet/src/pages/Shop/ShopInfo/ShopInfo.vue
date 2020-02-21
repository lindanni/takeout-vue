<template>
  <div class="shopinfo_wrap">
    <div class="delivery_info">
      <div class="delivery_title">配送信息</div>
      <div class="delivery_content">
        <span class="desc">{{info.description}}</span>
        <span class="time">&nbsp;&nbsp;由商家提供配送，约{{info.deliveryTime}}分钟到达，距离{{info.distance}}</span>
      </div>
      <div class="delivery_price">配送费￥{{info.deliveryPrice}}</div>
    </div>
    <div class="info_activity_wrap">
      <div class="activity_title">活动与服务</div>
      <ul class="info_activity_content">
        <li v-for="(support, index) in info.supports" :key="index">
          <span class="support_name" :class="supportClasses[support.type]">{{support.name}}</span>
          <span class="support_content">{{support.content}}</span>
        </li>
      </ul>
    </div>
    <div class="shop_image_wrap" v-if="info.pics.length">
      <div class="shop_image_title">商家实景</div>
      <div class="image_wrap">
        <ul class="shop_image">
          <li v-for="(pic, index) in info.pics" :key="index">
            <img :src="BaseImgUrl+pic" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="info_wrap">
      <div class="shop_info_title">商家信息</div>
      <ul class="info">
        <li>
          <span class="info_title">品类</span>
          <span class="info_content">{{info.category}}</span>
        </li>
        <li>
          <span class="info_title">商家电话</span>
          <span class="info_content">{{info.phone}}</span>
        </li>
        <li>
          <span class="info_title">地址</span>
          <span class="info_content">{{info.address}}</span>
        </li>
        <li>
          <span class="info_title">营业时间</span>
          <span class-info_content>{{info.workTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
      data() {
        return {
            BaseImgUrl: '/images',
            supportClasses: ['activity-green', 'activity-red', 'activity-orange']
        }
      },
      computed: {
          ...mapState(['info'])
      },
      mounted() {
          new BScroll('.image_wrap', {
              scrollX: true
          })
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .shopinfo_wrap {
    .delivery_info {
      background-color: #fff;
      border-bottom:1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      .delivery_title {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .delivery_content {
        margin-bottom: 10px;
        .desc {
          display: inline-block;
          padding: 2px 3px;
          background-color: #00aed6;
          font-size: 12px;
          color: #fff;
          border-radius: 2px;
        }
        .time {
          font-size: 12px;
        }
      }
      .delivery_price {
        font-size: 13px;
      }
    }
    .info_activity_wrap {
      margin-bottom: 15px;
      padding: 10px;
      background-color: #fff;
      font-size: 13px;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      .activity_title {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .info_activity_content {
        li {
          margin-bottom: 5px;
          .support_name {
            display: inline-block;
            padding: 2px 3px;
            color: #fff;
            border-radius: 2px;
            font-weight: 700;
            font-size: 12px;
            &.activity-green {
              background-color: rgb(112, 188, 70);
            }

            &.activity-red {
              background-color: rgb(240, 115, 115);
            }

            &.activity-orange {
              background-color: rgb(241, 136, 79);
            }
          }
        }
      }
    }
    .shop_image_wrap {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 15px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .shop_image_title{
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .image_wrap {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        .shop_image {
          font-size: 0px;
          display: inline-block;
          li {
            display: inline-block;
            margin-right: 5px;
            img {
              width: 110px;
              height: 80px;
            }
          }
        }
      }
    }
    .info_wrap {
      background-color: #fff;
      padding: 10px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .shop_info_title {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .info {
        font-size: 13px;
        li {
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          .info_title {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
