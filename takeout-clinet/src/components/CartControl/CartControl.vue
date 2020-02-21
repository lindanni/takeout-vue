<template>
  <div class="cartcontrol_wrap">
    <div class="remove_btn" v-show="food.count" @click.stop="updateFoodCount(false)">-</div>
    <div class="count" v-if="food.count">{{food.count}}</div>
    <div class="add_btn" @click.stop="updateFoodCount(true)">+</div>
  </div>
</template>
<script>
  export default {
      props: {
          food: Object,
          shopid: String
      },
      methods: {
          updateFoodCount(isAdd) {
            this.$store.dispatch('updateFoodCount',{isAdd, food: this.food, shopid: this.shopid})
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .cartcontrol_wrap {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 60px;
    .remove_btn {
      height: 18px;
      width: 18px;
      border-radius: 9px;
      background-color: #02a774;
      text-align: center;
      line-height: 15px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
      float: left;
    }
    .count {
      float: left;
      font-size: 13px;
      color: #333;
      padding: 0 7px;
    }
    .add_btn {
      cursor: pointer;
      height: 18px;
      width: 18px;
      border-radius: 9px;
      background-color: #02a774;
      text-align: center;
      line-height: 15px;
      font-size: 15px;
      color: #fff;
      float: right;
    }
  }
</style>
