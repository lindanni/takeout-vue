<template>
  <div class="profile_wrap">
    <HeaderTop title="我的"></HeaderTop>
    <section class="profile_number">
      <router-link  :to="userInfo._id ? '/profile': '/login'">
        <div class="number_left">
          <div class="login_logo">
            <i class="iconfont iconiconfontgerenzhongxin"></i>
          </div>
        </div>
        <div class="number_right">
          <div class="login_title" v-if="(userInfo.username || !userInfo.phone)">{{userInfo.username || '登录|注册'}}</div>
          <div class="phone">
            <i class="iconfont iconshouji"></i>
            <span class="phone_content">{{userInfo.phone || '暂无绑定手机号'}}</span>
          </div>
          <i class="iconfont iconxiayiyeqianjinchakangengduo you"></i>
        </div>
      </router-link>
    </section>
    <section class="info_data">
      <ul>
        <li>
          <p class="info_data_top" style="color: #ff6c00">0.00<span>元</span></p>
          <p class="info_data_bottom">我的余额</p>
        </li>
        <li>
          <p class="info_data_top" style="color: #f00">0<span>个</span></p>
          <p class="info_data_bottom">我的优惠</p>
        </li>
        <li>
          <p class="info_data_top" style="color: #04a62d">0<span>分</span></p>
          <p class="info_data_bottom">我的积分</p>
        </li>
      </ul>
    </section>
    <section class="server_list">
      <ul>
        <li>
          <i class="iconfont icondingdan"></i>
          <span>我的订单</span>
          <i class="iconfont iconxiayiyeqianjinchakangengduo you"></i>
        </li>
        <li>
          <i class="iconfont iconyly_jifenshangcheng"></i>
          <span>积分商城</span>
          <i class="iconfont iconxiayiyeqianjinchakangengduo you"></i>
        </li>
        <li>
          <i class="iconfont iconhuiyuan"></i>
          <span>会员卡</span>
          <i class="iconfont iconxiayiyeqianjinchakangengduo you"></i>
        </li>
      </ul>
    </section>
    <div class="login_out_wrap" v-if="userInfo._id">
      <button class="login_out" @click="loginOut">退出登录</button>
    </div>
  </div>
</template>
<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import {mapState} from 'vuex'
  import {MessageBox, Toast} from 'mint-ui'
  export default {
      components: {
          HeaderTop
      },
      computed: {
          ...mapState(['userInfo'])
      },
      methods: {
          loginOut() {
              MessageBox.confirm('确认退出登录吗？').then(
                  action => {
                     this.$store.dispatch('loginOut')
                     Toast("退出成功！")
                  },
                  action => {
                      console.log("取消退出")
                  }
              )
          }
      }
  }
</script>
<style lang="less" rel="stylesheet">
  .profile_wrap {
    height: 100%;
    background-color: #fff;
    .profile_number {
      padding: 20px;
      padding-top: 60px;
      background-color: #02a774;
      .number_left {
        float: left;
        padding-right: 10px;
        .login_logo {
          width: 56px;
          height: 56px;
          border-radius: 28px;
          background-color: #aaa;
          .iconfont {
            color: #ccc;
            font-size: 54px;
            text-align: center;
            line-height: 56px;
          }
        }
      }
      .number_right {
        overflow: hidden;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        height: 56px;
        line-height: 28px;
        position: relative;
        .you {
          font-size: 18px;
          position: absolute;
          top: 50%;
          right: 0px;
          cursor: pointer;
          transform: translateY(-50%);
        }
      }
    }
    .info_data {
      ul {
        display: flex;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        li {
          border-right: 1px solid #ccc;
          flex: 1;
          padding: 10px;
          text-align: center;
          .info_data_top {
            font-size: 20px;
            margin-bottom: 5px;
            span {
              font-size: 13px;
              color: #333333;
            }
          }
          .info_data_bottom {
            font-size: 13px;
          }
        }
      }
    }
    .server_list {
      ul {
        background-color: #fff;
        padding: 10px 0 10px 30px;
        li {
          position: relative;
          padding: 5px 10px;
          border-bottom: 1px solid #ccc;
          .iconfont {
            font-size: 22px;
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
          }
          span {
            font-size: 14px;
          }
          .you {
            font-size: 13px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            text-align: right;
            cursor: pointer;
          }
        }
      }
    }
    .login_out_wrap {
      margin-top: 20px;
      .login_out {
        cursor: pointer;
        background-color: #ff1100;
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        width: 100%;
        height: 35px;
        line-height: 35px;
        border-radius: 4px;
        border: none;
      }
    }
  }
</style>
