import {
  reqCategorys,
  reqShopList,
  reqUserInfo,
  reqLoginOut,
  reqOrderList,
  reqSearchOrder,
  reqShopInfo
} from '../api/index'
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
} from "./mutation-type"

export default {
  async getCategorys ({commit}) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShopList ({commit}) {
    const result = await reqShopList()
    if (result.code === 0) {
      const shoplist = result.data
      commit(RECEIVE_SHOPLIST, {shoplist})
    }
  },
  async getShopInfoByID ({commit}, id) {
    var result = await reqShopInfo(id)
    if (result.code === 0) {
      var shopinfo = result.data
      commit(RECEIVE_SHOPINFO,{shopinfo})
    }
  },
  updateFoodCount({commit},{isAdd, food, shopid}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT,{food,shopid})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food,shopid})
    }
  },
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  async getUserInfo ({commit}) {
    var result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },
  async loginOut ({commit}) {
    var result = await reqLoginOut()
    if (result.code === 0) {
      commit(REST_USERINFO)
    }
  },
  getShopCart({commit}, {shopid}) {
    commit(GET_SHOPCART, {shopid})
  },
  async getOrderList({commit}, callback) {
    var result = await reqOrderList()
    if (result.code === 0) {
      var orderlist = result.data
      commit(RECEIVE_ORDERLIST, {orderlist})
      callback && callback()
    }
  },
  async getSearchOrder({commit}, {keyword}) {
    var result = await reqSearchOrder(keyword)
    if (result.code ===0) {
      var orderlist = result.data
      commit(RECEIVE_SEARCH_ORDER, {orderlist})
    }
  },
  getOrderDetail ({commit}, {orderid}) {
    commit(GET_ORDERDETAIL, {orderid})
  },
  getOrderListByShopId ({commit}) {
    commit(GET_ORDERLIST_BYSHOPID)
  },
  delOrder({commit}, {orderid}) {
    commit(DEL_ORDER, {orderid})
  }
}
