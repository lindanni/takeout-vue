import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import Login from '../pages/Login/Login'
import OrderRating from '../pages/OrderRating/OrderRating'
import DetailOrder from '../pages/DetailOrder/DetailOrder'
import BangPhone from '../pages/BangPhone/BangPhone'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite',
      meta: {
        showFooterGuide: true
      }
    },
    {
      name: 'msite',
      path: '/msite',
      component: Msite,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooterGuide: false
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path:'/shop',
      component: Shop,
      meta: {
        showFooterGuide: false
      },
      children: [{
        path: '/shop/goods',
        component: ShopGoods
      },{
        path: '/shop/ratings',
        component: ShopRatings
      },{
        path: '/shop/info',
        component: ShopInfo
      },{
        path: '',
        redirect: '/shop/goods'
      }]
    },
    {
      path: '/detailorder',
      component: DetailOrder,
      meta: {
        showFooterGuide: false
      }
    },
    {
      path: '/bangphone',
      component: BangPhone,
      meta: {
        showFooterGuide: false
      }
    },
    {
      path: '/orderrating',
      component: OrderRating
    }
  ]
})
