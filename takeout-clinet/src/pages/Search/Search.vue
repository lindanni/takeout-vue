<template>
  <div class="search_wrap">
    <div class="search">
      <i class="iconfont iconsousuo"></i>
      <input type="text" class="keyword_cl" placeholder="请输入关键字" v-model="keyword">
      <button class="search_btn" @click="searchShop">搜索</button>
    </div>
    <ShopList :shoplist="shoplist"></ShopList>
  </div>
</template>
<script>
  import ShopList from '../../components/ShopList/ShopList'
  import {reqSearchShop} from "../../api";
  export default {
     data() {
         return {
             shoplist: [],
             keyword: ""
         }
     },
    methods: {
        async searchShop() {
           var result = await reqSearchShop(this.keyword)
           if(result.code === 0) {
               this.shoplist = result.data
               console.log(result.data)
           }
        }
    },
    components: {
         ShopList
    }
  }
</script>
<style lang="less" rel="stylesheet">
  .search_wrap {
    height: 100%;
    background-color: #fff;
    .search {
      background-color: #02a774;
      height: 30px;
      padding: 20px;
      display: flex;
      position: relative;
      .iconfont {
        position: absolute;
        top: 50%;
        left: 25px;
        transform: translateY(-50%);
      }
      .keyword_cl {
        outline: none;
        hegiht: 20px;
        border: none;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        flex: 1;
        padding-left: 25px;
      }
      .search_btn {
        cursor: pointer;
        flex: 0 0 80px;
        hegiht: 20px;
        border: none;
        background-color: #aaaaaa;
        color: #fff;
        font-size: 13px;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        font-weight: 700;
      }
    }
  }
</style>
