<template>
  <div class="msite_wrap">
    <HeaderTop :title="'miste'">
      <router-link to="/search" slot="left" class="header_search">
        <i class="iconfont iconsousuo"></i>
      </router-link>
      <router-link to="/login" slot="right" class="header_login">
        <span class="right_title" v-if="!userInfo._id">登录|注册</span>
        <span v-else>
          <i class="iconfont iconiconfontgerenzhongxin"></i>
        </span>
      </router-link>
    </HeaderTop>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(pages,index) in CategoryArr" :key="index">
            <a class="icon_item" href="javascript:" v-for="(page,index) in pages" :key="index">
              <img :src="baseImgUrl+page.image_url" alt="">
              <span class="img_title">{{page.title}}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_wrap">
      <div class="shop_header">
        <span class="header_list">附近商家</span>
      </div>
      <ShopList :shoplist="shoplist"></ShopList>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.css'
  export default {
      name: 'Msite',
      data() {
          return {
            baseImgUrl : '/images'
          }
      },
      components: {
          HeaderTop,
          ShopList
      },
      computed: {
          ...mapState(['categorys', 'userInfo', 'shoplist']),
          CategoryArr () {
              const {categorys} = this
              let arr = []
              let minArr = []
              categorys.forEach((data) => {
                  if (minArr.length === 8) {
                      minArr = []
                  }
                  if(minArr.length === 0){
                      arr.push(minArr);
                  }
                  minArr.push(data)
              })
              return arr;
          }
      },
      watch:{
        categorys() {
            this.$nextTick(()=>{
                new Swiper('.swiper-container',{
                    autoplay: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                })
            })
        }
      },
      mounted() {
          this.$store.dispatch('getCategorys')
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .swiper-container{
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #00ff33;
  }
  .msite_wrap {
    .msite_nav {
      width: 100%;
      height: 200px;
      background-color: #fff;
      border-top: 1px solid #e4e4e4;
      padding-top: 45px;
      .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
          .icon_item {
            width: 25%;
            text-align: center;
            img{
              width: 50px;
              height: 50px;
            }
            span {
              display: block;
              color: #666;
              font-size: 13px;
            }
          }
        }
      }
    }
    .shop_wrap {
      .shop_header {
        padding:  5px 10px;
        .header_title {
          color: #333;
        }
      }
    }
  }
</style>
