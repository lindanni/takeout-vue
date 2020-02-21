<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-if="$route.meta.showFooterGuide"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name: 'App',
    components: {
      FooterGuide
    },
    created () {
        //在页面加载时读取sessionStorage里的状态信息
        // if (sessionStorage.getItem("store") ) {
        //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        // }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        // window.addEventListener("beforeunload",()=>{
        //     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        // })
      },
      mounted() {
        this.$store.dispatch('getUserInfo')
        this.$store.dispatch('getShopList')
      }
  }
</script>

<style lang="less" rel="stylesheet/stylus">
  // 整个应用组件的样式
  html{
    height: 100%;
    width: 100%;
    body {
      height: 100%;
      width: 100%;
      #app {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
      }
    }
  }
  * {
    margin: 0px;
    padding: 0px;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
</style>
