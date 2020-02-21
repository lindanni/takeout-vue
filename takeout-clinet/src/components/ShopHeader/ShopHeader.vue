<template>
  <div class="shopheader_wrap">
    <div class="header_top" :style="{'backgroundImage': `url('${BaseImgUrl}${info.bgImg}')`}">
      <i class="iconfont iconleft"  @click="$router.back()"></i>
      <img :src="BaseImgUrl+info.avatar" alt="" class="shop_avatar">
    </div>
    <div class="header_content">
      <div class="shop_name">
        <span class="name_title">{{info.name}}</span>
        <i class="iconfont iconsanjiaoright" @click="showdetail=true"></i>
      </div>
      <div class="detail">
        <span class="score">{{info.score}}&nbsp;&nbsp;</span>
        <span>月售{{info.sellCount}}单&nbsp;&nbsp;</span>
        <span class="description">{{info.description}}&nbsp;&nbsp;</span>
        <span class="rankrate">约{{info.rankRate}}分钟&nbsp;&nbsp;</span>
        <span class="distance">距离{{info.distance}}</span>
      </div>
      <div class="supports_wrap">
        <ul class="supports">
          <li v-if="info.supports">
            <span class="support_name" :class="supportClasses[info.supports[0].type]">{{info.supports[0].name}}</span>
            <span class="support_content">{{info.supports[0].content}}</span>
            <span>{{info.supports.length}}个优惠 </span>
            <i class="iconfont iconico_arrows_unfold" @click="showactivity=true"></i>
          </li>
        </ul>
      </div>
      <div class="nav_list">
        <router-link to="/shop/goods" replace>点餐</router-link>
        <router-link to="/shop/ratings" replace>评价</router-link>
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <div class="detail_wrap " v-if="showdetail">
      <div class="float_name">{{info.name}}</div>
      <div class="float_detail">
        <div class="float_score">
          <p class="top">{{info.score}}</p>
          <p class="title">评分</p>
        </div>
        <div class="sellcount">
          <p class="top">{{info.sellCount}}单</p>
          <p class="title">月售</p>
        </div>
        <div class="float_description">
          <p class="top">{{info.description}}</p>
          <p class="title">约{{info.deliveryTime}}分钟</p>
        </div>
        <div class="float_deliveryprice">
          <p class="top">{{info.deliveryPrice}}元</p>
          <p class="title">配送费</p>
        </div>
        <div class="float_distance">
          <p class="top">{{info.distance}}</p>
          <p class="title">距离</p>
        </div>
      </div>
      <div class="notice_wrap">
        <div class="notice_title">公告</div>
        <div class="notice_content">{{info.bulletin}}</div>
      </div>
      <div class="close" @click="showdetail=false">
        <span>X</span>
      </div>
    </div>
    <div class="activity_wrap" v-if="showactivity">
      <div class="activity_title">优惠活动</div>
      <div class="close_activity" @click="showactivity=false">X</div>
      <ul class="activity_supports">
        <li v-for="(support, index) in info.supports" :key="index">
          <span class="activity_name" :class="supportClasses[support.type]">{{support.name}}</span>
          <span class="activity_content">{{support.content}}</span>
        </li>
      </ul>
    </div>
    <div class="cover" v-if="showdetail" @click="showdetail=false"></div>
    <div class="cover_activity" v-if="showactivity" @click="showactivity=false"></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
      data() {
        return {
            BaseImgUrl: '/images',
            supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
            showdetail: false,
            showactivity: false
        }
      },
      computed: {
          ...mapState(['info'])
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .shopheader_wrap {
    background-color: #fff;
    .header_top {
      width: 100%;
      height: 100px;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      .iconfont {
        font-size: 23px;
        color: #fff;
        cursor: pointer;
      }
      img {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .header_content {
      padding-top: 20px;
      text-align: center;
      .shop_name {
        font-size: 15px;
        font-weight: 700;
        .iconfont {
          font-size: 13px;
          cursor: pointer;
        }
      }
      .detail {
        font-size: 13px;
        margin-top: 10px;
      }
      .supports_wrap {
        font-size: 13px;
        margin-top: 10px;
        .supports{
          li {
            .iconfont {
              font-size: 12px;
              cursor: pointer;
            }
            .support_name {
              display: inline-block;
              padding:2px 5px;
              border-radius: 2px;
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
      .nav_list {
        display: flex;
        height: 40px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        a {
          flex: 1;
          color: #333;
        }
      }
    }
    .cover {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 100;
    }
    .detail_wrap {
      width: 75%;
      padding: 20px;
      border-radius: 5px;
      background-color: #fff;
      position: fixed;
      z-index: 200;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 14px;
      .float_name {
        font-size: 18px;
        font-weight: 700;
      }
      .float_detail {
        margin-top: 10px;
        display: flex;
        div {
          flex: 1;
          .top {
            font-weight: 700;
          }
          .title {
            font-size: 12px;
          }
        }
      }
      .notice_wrap {
        .notice_title {
          margin: 10px 0;
        }
        .notice_content {
          text-align: left;
          text-indent: 2em;
          line-height: 20px;
        }
      }
      .close {
        position: absolute;
        bottom: -30px;
        height: 26px;
        width: 26px;
        border-radius: 13px;
        border: 1px solid #fff;
        color: #fff;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        text-align: center;
        line-height: 24px;
      }
    }
    .activity_wrap {
      position: fixed;
      bottom: 0px;
      left: 0px;
      z-index: 200;
      background-color: #fff;
      width: 100%;
      padding: 10px 0;
      .activity_title {
        font-size: 17px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 10px;
      }
      .activity_supports {
        padding: 10px;
        li {
          font-size: 14px;
          margin-bottom: 5px;
          .activity_name {
            display: inline-block;
            padding: 2px 4px;
            border-radius: 2px;
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
          .activity_content {
          }
        }
      }
      .close_activity {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 18px;
        cursor: pointer
      }
    }
    .cover_activity {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 100;
    }
  }
</style>
