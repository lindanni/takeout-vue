import Vue from 'vue'
import {
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPLIST,
  RECEIVE_SHOPINFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  RECEIVE_USERINFO,
  REST_USERINFO,
  GET_SHOPCART,
  RECEIVE_ORDERLIST,
  RECEIVE_SEARCH_ORDER,
  GET_ORDERDETAIL,
  GET_ORDERLIST_BYSHOPID,
  DEL_ORDER
} from "./mutation-type";

export default {
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPLIST] (state, {shoplist}) {
    state.shoplist = shoplist
  },
  [RECEIVE_SHOPINFO] (state, {shopinfo}) {
    state.info = shopinfo.info
    state.goods = shopinfo.goods
  },
  [INCREMENT_FOOD_COUNT] (state, {food, shopid}) {
    if (state.shopcarts[shopid]) {
      if (!food.count) {
        Vue.set(food, 'count', 1)
        state.shopcarts[shopid].push(food)
      }else{
        food.count ++
      }
    }else {
      if (!food.count) {
        Vue.set(food, 'count', 1)
        state.shopcarts[shopid] = []
        state.shopcarts[shopid].push(food)
      }else{
        food.count ++
      }
    }
    state.shopcart = state.shopcarts[shopid]
  },
  [DECREMENT_FOOD_COUNT] (state, {food, shopid}) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.shopcarts[shopid].splice(state.shopcarts[shopid].indexOf(food),1)
      }
    }
    state.shopcart = state.shopcarts[shopid]
  },
  [RECEIVE_USERINFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [REST_USERINFO] (state) {
    state.userInfo = {}
  },
  [GET_SHOPCART] (state, {shopid}) {
    state.shopcart = state.shopcarts[shopid]
  },
  [RECEIVE_ORDERLIST] (state, {orderlist}) {
    state.orderlist = orderlist
  },
  [RECEIVE_SEARCH_ORDER] (state, {orderlist}) {
    state.orderlist = orderlist
  },
  [GET_ORDERDETAIL] (state, {orderid}) {
    state.orderlist.forEach((order,index) => {
      if (order._id === orderid) {
        state.orderone = order
      }
    })
  },
  [GET_ORDERLIST_BYSHOPID] (state) {
    state.orderlist_shop = []
    state.orderlist.forEach((order) => {
      if (order.shopid === state.info._id) {
        state.orderlist_shop.push(order)
      }
    })
  },
  [DEL_ORDER] (state, {orderid}) {
    state.orderlist.forEach((order, index) => {
      if(order._id === orderid) {
        state.orderlist.splice(state.orderlist.indexOf(order), 1)
      }
    })
  }
}
