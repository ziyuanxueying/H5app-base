<template>
  <div class="v-body">
    <!-- <div class="v-2">
      <div class="sp-1">香港</div>
      <div class="sp-2">fun</div>
    </div>
    <div class="v-3">打造香港本土第一O2O服務平台</div>-->
    <div style="height:720rpx"></div>
    <div class="flex-row login-btn v-4" @click="wechatLogin">
      <span>
        <img src="../../static/img/login/wechat.png" alt />
      </span>
      <span style="margin-right: 10rpx;">|</span>
      <span>使用 WeChat 帳號登入</span>
    </div>
    <div class="flex-row login-btn v-4-2" @click="phoneLogin" data-cy="fblogin">
      <span>
        <img src="../../static/img/login/cellphone.png" alt />
      </span>
      <span style="margin-right: 10rpx;">|</span>
      <span>使用 手機號 登入</span>
    </div>
    <div
      class="flex-row login-btn v-5"
      @click="facebookLogin"
      data-cy="fblogin"
    >
      <span>
        <img src="../../static/img/login/group.png" alt />
      </span>
      <span style="margin-right: 10rpx;">|</span>
      <span>使用 Facebook 帳號登入</span>
    </div>
    <div data-cy="qrcode" class="v-6" @click="open">
      如遇登錄問題請聯繫微信服務號“互達積分”
    </div>
    <uni-popup ref="popup" type="center">
      <img src="../../static/img/login/login-code.jpg" alt class="img-qrcode" />
      <div style="text-align:center;">保存圖片，使用微信掃描</div>
    </uni-popup>
    <uni-popup ref="wxpopup" type="center" :custom="true">
      <div class="pop-wechart" id="wxlogin"></div>
    </uni-popup>
  </div>
</template>

<script>
import uniPopup from '../../components/uni-popup/uni-popup';
// #ifdef H5
import hello from 'hellojs';
import { AXIOS_BASE, WECHART_ID, FACEBOOK_ID } from '../../extend/view-base.js';
// #endif
export default {
  components: { uniPopup },
  data: () => ({
    otherAuth: {}
  }),
  created() {
    // console.log(this.$store.getters['basic/user'].authorization);
    if (
      this.$store.getters['basic/user'] &&
      this.$store.getters['basic/user'].authorization
    ) {
      this.$uni.reLaunch({ url: '/pages/tabbar/tabbar-home' });
    } else {
      // #ifdef H5
      this.h5Init();
      // #endif
    }
  },
  onLoad(option) {
    // this.$store.dispatch('basic/activityType', option.activity);
    this.$store.dispatch(
      'basic/activityType',
      JSON.stringify({ activity: option.activity, source: option.source })
    );
    // this.$uni.showToast(option.activity);
    // uni.showModal({
    // content:option.activity
    // })
  },
  methods: {
    open() {
      this.$refs.popup.open();
    },
    h5Init() {
      // #ifdef H5
      hello.init({
        facebook: FACEBOOK_ID
        // facebook: (process.env.NODE_ENV === 'development' ? '2829031917125865' : '379367789393159')
      });
      // 生產環境的登錄代碼
      hello.on('auth.login', auth => {
        this.otherAuth = auth;
        hello(auth.network)
          .api('me')
          .then(result => {
            this.otherLogin(result);
          });
      });
      // #endif
    },
    otherLogin(otherUser) {
      this.$axios
        .post({
          url: '/app-user/facebook-login',
          data: {
            firstName: otherUser.first_name,
            lastName: otherUser.last_name,
            name: otherUser.name,
            id: otherUser.id,
            picture: otherUser.picture,
            thumbnail: otherUser.thumbnail
          }
        })
        .then(result => {
          this.$store.dispatch('basic/loginSuccess', result);
          this.$store.dispatch('basic/token', result.authorization);
          result.community &&
            this.$store.dispatch('basic/community', result.community);
          if (result.community) {
            this.$uni.reLaunch({ url: '/pages/tabbar/tabbar-home' });
          } else {
            this.$uni.navigateTo({ url: '/pages/login/check-house' });
          }
        });
    },
    facebookLogin() {
      // #ifdef H5
      hello('facebook').login();
      // #endif
    },
    facebookLogout() {
      // #ifdef H5
      hello('facebook')
        .logout()
        .then(
          () => {
            alert('Signed out');
          },
          e => {
            alert('Signed out error: ' + e.error.message);
          }
        );
      // #endif
    },
    async wechatLogin() {
      await this.$refs.wxpopup.open();
      // #region 测试用代码，保留-吴占超
      // // 配置授權域名
      // const redirect = encodeURIComponent('http://pezurd.natappfree.cc/web/');
      // // const url = `https://open.weixin.qq.com/connect/qrconnect?appid=wx24a39646d072b719&redirect_uri=${redirect}&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect`;
      // const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24a39646d072b719&redirect_uri=${redirect}&response_type=code&scope=snsapi_login&state=123#wechat_redirect`;
      // // this.$uni.redirectTo(url);
      // window.open(url);
      // #endregion 测试用代码，保留-吴占超

      // 微信登录配置：生产环境
      // const redirectUri = encodeURIComponent('https://localfun.advokate-bj.com/web/pages/login/login-wx');
      // const appid = process.env.NODE_ENV === 'development' ? 'wx2887e87ce77ca8b2' : 'wx2887e87ce77ca8b2';

      // 微信登录
      const redirectUri = encodeURIComponent(AXIOS_BASE);
      const appid = WECHART_ID;

      // eslint-disable-next-line no-undef
      const obj = new WxLogin({
        id: 'wxlogin',
        appid,
        scope: 'snsapi_login',
        redirect_uri: redirectUri,
        state: 'wxlogin'
      });
      console.log(obj);
    },
    // 手機號登錄
    phoneLogin() {
      this.$uni.navigateTo({ url: `/pages/login/login-phone` });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-body {
  background-image: url('~@/static/img/login/login-bg.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .v-1 {
    font-size: 36rpx;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    margin-top: 47rpx;
  }
  .v-2 {
    margin-top: 138rpx;
    display: flex;
    .sp-1 {
      width: 84rpx;
      height: 132rpx;
      font-family: ZhenyanGB-Regular;
      font-size: 44rpx;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 64rpx;
    }
    .sp-2 {
      height: 132rpx;
      line-height: 132rpx;
      font-family: ZhenyanGB-Regular;
      font-size: 126px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
    }
  }
  .v-3 {
    margin-top: 36rpx;
    font-family: SourceHanSansCN-Normal;
    font-size: 32rpx;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
  }
  // 登錄按鈕樣式
  .login-btn {
    width: 80%;
    height: 72rpx;
    border-radius: 36rpx;
    background: #355899;
    justify-content: center;
    font-size: 34rpx;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    // 按鈕左側圖標
    span:nth-of-type(1) {
      width: 60rpx;
      height: 40rpx;
      img {
        height: 34rpx;
        margin-right: 10rpx;
      }
    }
    // 按鈕右側文本
    span:nth-of-type(3) {
      width: 400rpx;
      text-align: left;
    }
  }
  // 微信號登錄按鈕
  .v-4 {
    margin-top: 40rpx;
    background: #2cb34a;
  }
  // 手機號登錄按鈕
  .v-4-2 {
    margin-top: 40rpx;
    background: #cfbb8a;
  }
  // facebook登錄按鈕
  .v-5 {
    margin-top: 40rpx;
    background: #355899;
  }
  // 聯繫微信服務號-互達積分
  .v-6 {
    margin-top: 164rpx;
    font-size: 22rpx;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 34rpx;
    border-bottom: 0.5rpx solid white;
  }
  .img-qrcode {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 60%;
  }
  .pop-wechart {
    padding: 20rpx 10rpx;
    background-color: #ffffff;
  }
}
@media not screen and (max-width: 750px) {
  .v-body {
    .v-1 {
      font-size: 20px;
      color: #ffffff;
      margin-top: 50px;
    }
    .v-4 {
      font-size: 18px;
      height: 50px;
      border-radius: 10px;
      img {
        width: 18px;
        height: 34px;
        margin-right: 10rpx;
      }
    }
    .v-5 {
      font-size: 18px;
      height: 50px;
      border-radius: 10px;
      img {
        width: 36px;
        height: 34px;
        margin-right: 10px;
      }
    }
    .v-6 {
      margin-top: 80px;
      font-size: 12px;
      line-height: 30px;
      border-bottom: 0.5rpx solid white;
    }
  }
}
</style>
