<template>
  <div class="bangphone_wrap">
    <i class="iconfont iconleft" @click="$router.back()"></i>
    <div class="login_title">余香外卖</div>
    <div class="login_content">
      <div class="login_fill">
        <div class="fill_note">
          <div class="phone_wrap">
            <input type="text" maxlength="11" class="phone_cl" name="phone" placeholder="手机号" v-model="phone">
            <button :disabled="!rightPhone" class="get_phonecode" :class="{on: rightPhone}" @click="getCode">{{downtime > 0 ? `(${downtime}s)已发送` : '获取验证码'}}</button>
          </div>
          <input type="text" class="code_cl" name="code" placeholder="验证码" v-model="phoneCode">
        </div>
        <div class="login_text">温馨提示：未注册余香外卖账号的手机，登录时将自动注册，且代表已同意 <span>《用户服务协议》</span></div>
        <div class="login_btn">
          <button @click.prevent="bangphone">绑定</button>
        </div>
        <div class="about">关于我们</div>
      </div>
    </div>
    <ShowAlert :alertText="alertText" v-show="showalert" @closealert="closealert"></ShowAlert>
  </div>
</template>
<script>
    import {reqGetCode, reqBangPhone} from "../../api";
    import ShowAlert from '../../components/ShowAlert/ShowAlert'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                phone: '',
                phoneCode: '',
                rightphone: true,
                downtime: 0,
                showalert: false,
                alertText: ''
            }
        },
        methods: {
            async getCode() {
                if (!this.downtime) {
                    this.downtime = 10
                    this.time = setInterval(() => {
                        this.downtime --;
                        if (this.downtime <= 0) {
                            clearInterval(this.time)
                            this.time = undefined
                        }
                    },1000)
                    const result = await reqGetCode(this.phone)
                    if(result.code === 1) {
                        this.downtime = 0
                        clearInterval(this.time)
                        this.time = undefined
                        this.isShowAlert(result.msg)
                    }
                }
            },
            closealert() {
                this.showalert = false;
                this.alertText = ""
            },
            isShowAlert(alertText) {
                this.showalert = true
                this.alertText = alertText
            },
            async bangphone() {
                let result;
                if (!this.rightPhone) {
                    this.isShowAlert("手机号错误！")
                    return;
                }
                if (!/^\d{6}$/.test(this.phoneCode)) {
                    this.isShowAlert("手机验证码必须为6位数")
                    return;
                }
                result = await reqBangPhone({phone: this.phone, phoneCode: this.phoneCode, username:this.userInfo.username, password: this.userInfo.password})
                if (this.downtime) {
                    this.downtime = 0;
                    clearInterval(this.time)
                    this.time = undefined
                }
                if(result.code === 0) {
                    var user = result.data
                    this.$store.dispatch('recordUser', user)
                    this.$router.replace('/profile')
                }else{
                    this.isShowAlert(result.msg)
                }
            }
        },
        components: {
            ShowAlert
        },
        computed: {
            rightPhone() {
                return /^1\d{10}$/.test(this.phone)
            },
            ...mapState(['userInfo'])
        }
    }
</script>
<style lang="less" rel="stylesheet">
  .bangphone_wrap {
    background-color: #fff;
    padding:0 40px;
    position: relative;
    height: 100%;
    .iconfont {
      position: absolute;
      left: 10px;
      cursor: pointer;
      top: 10px;
      color: #ccc;
    }
    .login_title {
      font-size: 28px;
      text-align: center;
      padding-top: 55px;
      color: #02a774;
      font-weight: 700;
    }
    .login_content {
      margin-top: 20px;
      color: #333333;
      width: 100%;
      .login_fill {
        margin-top: 20px;
        .fill_note {
          input {
            width: 100%;
            display: block;
            height: 35px;
            border-radius: 4px;
            outline: none;
            border: 1px solid #ccc;
            margin-bottom: 15px;
            text-indent: 1em;
          }
          .phone_wrap {
            position: relative;
            .get_phonecode {
              position: absolute;
              right: 0;
              height: 100%;
              width: 100px;
              top: 0;
              border: none;
              background-color: transparent;
              color: #ccc;
              cursor: pointer;
              &.on {
                color: #333333;
              }
            }
          }
        }
        .fill_pass {
          input {
            display: block;
            width:100%;
            height: 35px;
            border-radius: 4px;
            outline: none;
            border: 1px solid #ccc;
            margin-bottom: 15px;
            text-indent: 1em;
          }
          .password_wrap {
            position: relative;
            .btn_toggle {
              font-size: 13px;
              height: 16px;
              width: 40px;
              border-radius: 8px;
              position: absolute;
              border: 1px solid #ccc;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              line-height: 16px;
              color: #fff;
              &.on {
                background-color: #02a774;
                color: #333;
              }
              .quan {
                position: absolute;
                top: 0;
                left: 0;
                background-color: #fff;
                border-radius: 8px;
                height: 16px;
                width: 16px;
                border: 1px solid #ccc;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
                transition: transform 0.3s;
                &.right {
                  transform: translateX(24px);
                }
              }
            }
          }
          .passwordCode_wrap {
            display: flex;
            .passwordCode_cl {
              flex: 1;
              margin-right: 10px;
            }
            .passwordCode_img {
              img {
                width: 100%;
                font-size: 0;
                height: 100%;
              }
              flex: 0 0 100px;
              border: 1px solid #ccc;
              height: 35px;
              border-radius: 4px;
            }
          }
        }
      }
      .login_text {
        font-size: 13px;
        line-height: 20px;
        span {
          color: #02a774;
        }
      }
      .login_btn {
        margin-top: 30px;
        button {
          cursor: pointer;
          height: 35px;
          width: 100%;
          border-radius: 4px;
          border: none;
          background-color: #00b43c;
          color: #fff;
        }
      }
      .about {
        font-size: 12px;
        width: 100%;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
</style>
