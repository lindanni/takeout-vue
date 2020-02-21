<template>
  <div class="shop_wrap">
    <ShopHeader></ShopHeader>
    <router-view></router-view>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  export default {
      computed: {
          ...mapState(['shoplist', 'info'])
      },
      components: {
          ShopHeader
      },
      mounted() {
          this.$store.dispatch('getShopCart', {shopid: this.info._id})
      },
      created() {
          this.$store.dispatch('getShopInfoByID',this.$route.query.id)
      }
  }
</script>
<style lang="less" rel="stylesheet"></style>
