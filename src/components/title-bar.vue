<template>
  <view>
    <view class="status_bar"></view>
    <div class="flex-between title">
      <div class="uni-page-head-btn" @tap.stop="leftFunc">
        <div class="uni-btn-icon title-back" style></div>
      </div>
      <div class="title-tv">{{titleText}}</div>
      <div class="title-right" @tap.stop="rightFunc">
        <min-badge :count="this.$store.getters['basic/cartNum']" v-if="rightCart">
          <image class="right-img" src="../../static/img/tabbar-cart.png" mode />
        </min-badge>
      </div>
    </div>
  </view>
</template>

<script>
import minBadge from './min-badge.vue';
export default {
  // name: 'title',
  components: {
    minBadge
  },
  props: {
    // 標題顯示文本
    text: {
      type: String,
      default: '分多多'
    },
    // 跳轉類型，默認redirectTo
    type: {
      type: String,
      default: 'redirectTo'
    },
    // 自定義回退地址
    url: {
      type: String,
      default: undefined
    },
    // 右側購物車按鈕
    rightCart: {
      type: Boolean,
      default: false
    },
    // 自定義的左側點擊事件
    leftClick: {
      type: Function,
      default: undefined
    },
    // 自定義的右側點擊事件
    rightClick: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    titleText() {
      return `${this.text}`;
    }
  },
  methods: {
    // 左側點擊執行
    leftFunc() {
      // 自定義左側路徑跳轉
      if (this.url) {
        this.$uni[this.type]({ url: this.url });
        return;
      }
      // 自定義左側點擊方法
      if (this.leftClick) {
        this.leftClick();
        return;
      }
      // 默認執行回退方法
      this.$uni.navigateBack();
    },
    // 右側點擊執行
    rightFunc() {
      // 自定義右側點擊方法
      if (this.rightClick) {
        this.rightClick();
        return;
      }
      // 右側跳轉購物車
      this.rightCart &&
        this.$uni.switchTab({ url: '/pages/tabbar/tabbar-cart' });
    }
  }
};
</script>

<style lang="scss">
.title {
  width: calc(100% - 12rpx);
  left: 0;
  height: 60rpx;
  padding: 14rpx 6rpx;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 999;

  .title-back {
    color: rgb(0, 0, 0);
    font-size: 27px;
  }

  .title-tv {
    flex: 1;
    width: 500rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 700;
  }

  .title-right {
    width: 54rpx;
    height: 100%;
    padding-top: 10rpx;
  }
  .right-img {
    width: 40rpx;
    height: 40rpx;
    margin-top: 4rpx;
  }
}
</style>
