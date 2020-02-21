<template>
  <div class="detailorder_wrap">
    <div class="back_btn">
      <i class="iconfont iconleft" @click="$router.back()"></i>
    </div>
    <div class="detailorder_content">
      <div class="shopname">{{info.name}}</div>
      <div class="order">
        <ul>
          <li v-for="(food, index) in shopcart" :key="index">
            <div class="li_left">
              <img :src="BaseImgUrl+food.image" alt="" class="food_img">
            </div>
            <div class="li_right">
              <div class="left">
                <span class="food_name">{{food.name}}</span>
              </div>
              <div class="right">
                <span class="food_sum">x{{food.count}}</span>
                <span class="food_price">￥{{Math.ceil(food.price * food.count)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="detail_info">
        <ul>
          <li>
            <span class="info_left">配送费</span>
            <span class="info_right">${{info.deliveryPrice}}</span>
          </li>
          <li>
            <span class="info_left">配送时间</span>
            <span class="info_right">{{info.deliveryTime}}</span>
          </li>
          <li>
            <span class="info_left">配送方式</span>
            <span class="info_right">{{info.description}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="pay_wrap">
      <div class="pay_left">
        <span class="totalprice">￥{{totalPrice}}</span>
      </div>
      <div class="pay_right">
        <button class="pay_btn" @click="clickPay">确定支付</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState ,mapGetters} from 'vuex'
  import {MessageBox, Toast} from 'mint-ui'
  import {reqSaveOrder, reqUpdateSellCount} from "../../api";

  export default {
      data() {
        return {
            BaseImgUrl: '/images'
        }
      },
      computed: {
          ...mapState(['info', 'shopcart']),
          ...mapGetters(['totalPrice'])
      },
      methods: {
        clickPay() {
          MessageBox.confirm("确定支付吗？").then(
              async action => {
                  Toast("支付成功！")
                  var orderdetail = []
                  this.shopcart.forEach((data) => {
                      var detail = {}
                      detail.foodid = data._id;
                      detail.count = data.count;
                      orderdetail.push(detail)
                  })
                  var result = await reqSaveOrder({orderdetail, totalprice: this.totalPrice, shopid: this.info._id})
                  await reqUpdateSellCount({shopid: this.info._id, orderdetail})
                  this.$router.replace('/shop/goods')
              }
          )
      }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .detailorder_wrap {
    background: linear-gradient(to bottom, #02a774 0%, #fff 60%);
    background: -moz-linear-gradient(top, #02a774 0%, #fff 60%);
    background: -o-linear-gradient(top, #02a774 0%, #fff 60%);
    background: -ms-linear-gradient(top, #02a774 0%, #fff 60%);
    height: 100%;
    padding: 0px 10px;
    .back_btn {
      padding-top: 10px;
      .iconfont {
        cursor: pointer;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .detailorder_content {
      background-color: #fff;
      margin-top: 20px;
      padding: 20px;
      padding-right: 25px;
      .shopname {
        font-size: 20px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #e4e4e4;
      }
      .order {
        ul {
          li {
            height: 50px;
            margin-bottom: 10px;
            .li_left {
              float:left;
              padding-right: 10px;
              img {
                width: 45px;
                height: 45px;
              }
            }
            .li_right {
              overflow: hidden;
              height: 50px;
              line-height: 50px;
              display: flex;
              justify-content: space-between;
              .left {
                font-size: 14px;
                font-weight: 700;
              }
              .right {
                span {
                  padding-left: 20px;
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
      .detail_info {
        margin-top: 10px;
        ul {
          li {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            .info_left {
              padding: 2px 3px;
              border: 1px solid #ccc;
              font-size: 13px;
              border-radius: 4px;
              background-color: rgba(211, 252, 255, 0.55);
            }
            .info_right {
              font-size: 13px;
            }
          }
        }
      }
    }
    .pay_wrap {
      position: fixed;
      bottom: 0px;
      left: 0px;
      height: 45px;
      width: 100%;
      background-color: rgba(27, 31, 20, 0.8);
      z-index: 100;
      color: #fff;
      display:flex;
      justify-content: space-between;
      justify-content: space-between;
      font-size: 18px;
      line-height: 45px;
      .pay_left {
        margin-left: 10px;
      }
      .pay_right {
        button {
          border: none;
          background-color: #02a774;
          padding: 0 20px;
          cursor: pointer;
          height: 45px;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        }
      }
    }
  }
</style>
