<template>
  <div>
    <swiper
      v-if="type===10"
      class="swiper"
      :indicator-dots="indicatorDots"
      autoplay
      :indicator-active-color="dotsColor"
      :style="`height:${width}rpx`"
      circular
    >
      <swiper-item
        v-for="(swiper, index) in swiperList"
        :key="index"
        @tap="$uni.navigateTo({ url: swiper.path });"
      >
        <image :src="swiper.img" />
      </swiper-item>
    </swiper>
    <block v-if="type===20">
      <image
        class="ads-img"
        v-for="(swiper, index) in swiperList"
        :style="`height:${width}rpx`"
        :key="index"
        :src="swiper.img"
        @tap="$uni.navigateTo({ url: swiper.path });"
      />
    </block>
  </div>
</template>

<script>
export default {
  name: 'swiper-module',
  props: {
    color: {
      type: String,
      default: '#7aa8c7'
    },
    dots: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 10
    },
    width: {
      type: String,
      default: '300'
    }
  },
  data() {
    return {
      swiperList: []
    };
  },
  created() {
    this.pageInit();
  },
  computed: {
    dotsColor() {
      return `${this.color}`;
    },
    indicatorDots() {
      return `${this.dots}`;
    }
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: '/adver/list',
        data: {
          type: this.type
        }
      }).then(result => {
        console.log(result);
        this.swiperList = result;
      });
    },
    swiperClick(item) {

    }
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 300rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.ads-img {
  width: calc(100% - 40rpx);
  margin: 10rpx 20rpx;
  height: 260rpx;
}
</style>
