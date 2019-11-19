<script>
export default {
  onLaunch: function() {
    const iphoneMin = [
      'iPhone 4',
      'iPhone 5',
      'iPhone 6',
      'iPhone 7',
      'iPhone 8'
    ];
    // 刘海屏幕
    uni.getSystemInfo({
      success: (res) => {
        const modelStr = res.model.substr(0, 8);
        const system = res.system.substr(0, 3);
        this.$options.globalData.isIpx = system === 'iOS' && iphoneMin.indexOf(modelStr) < 0;
      }
    });
  },
  onShow: function() { },
  onHide: function() { },
  globalData: {
    isIpx: false
  }
};
</script>

<style lang="scss">
@import "./common/global.scss";
</style>
