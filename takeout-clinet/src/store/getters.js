export default {
  totalCount (state) {
    if (state.shopcart && state.shopcart.length !== 0) {
      return Math.ceil(state.shopcart.reduce((preTotal, food) => preTotal + food.count, 0))
    }else{
      return 0
    }
  },

  totalPrice (state) {
    if (state.shopcart && state.shopcart.length !== 0) {
      return Math.ceil(state.shopcart.reduce((preTotal, food) => preTotal + food.count * food.price, 0))
    }else{
     return 0
    }
  },
  totalServerScore (state) {
    if (state.orderlist_shop && state.orderlist_shop.length !== 0) {
      var count = 0
      var serverscore_s = 0
      state.orderlist_shop.forEach( (order, index) => {
        if (order.serverscore) {
          count ++
          serverscore_s += order.serverscore
        }
      })
      if (count === 1) {
        return serverscore_s
      }
      if(count === 0){
        return 0
      }
      return (serverscore_s / count).toFixed(1)
    }else{
      return 0
    }
  },
  totalFoodScore (state) {
    if (state.orderlist_shop && state.orderlist_shop.length !== 0) {
      var count = 0
      var foodscore_s = 0
      state.orderlist_shop.forEach( (order, index) => {
        if (order.foodscore) {
          count ++
          foodscore_s += order.foodscore
        }
      })
      if (count === 1) {
        return foodscore_s
      }
      if(count === 0){
        return 0
      }
      return (foodscore_s / count).toFixed(1)
    }else{
      return 0;
    }
  },
  totalScore (state, getters) {
    console.log(getters.totalServerScore + getters.totalFoodScore)
    return ((parseFloat(getters.totalServerScore) + parseFloat(getters.totalFoodScore))/ 2).toFixed(1)
  },
  ratingLength(state) {
    var count = 0;
    state.orderlist_shop.forEach((order) => {
      if (order.serverscore) {
        count ++;
      }
    })
    return count;
  },
  goodRating(state) {
    var count = 0;
    state.orderlist_shop.forEach((order) => {
      if (order.serverscore === 5) {
        count ++;
      }
    })
    return count;
  }
}
